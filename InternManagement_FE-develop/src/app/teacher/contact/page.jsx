'use client'
import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./page.module.scss";

import { 
    faCircle,
    faMagnifyingGlass, 
    faMessage, 
    faPaperPlane, 
    faPaperclip 
} from "@fortawesome/free-solid-svg-icons";
import Header from "@/components/Header";
import { Spin, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { label } from "@/constant/label";
import { Col, Row } from "react-bootstrap";
import { MessageService } from "@/services/message.service";

const cx = classNames.bind(styles);

export default function TeacherContact() {
    const myId = 3;

    const [searchInput, setSearchInput] = useState('');
    const [chatInput, setChatInput] = useState('');
    const [usersInMessage, setUsersInMessage] = useState([]);
    const [selectedChannelID, setSelectedChannelID] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isLoadedMessage, setIsLoadedMessage] = useState(true);

    function getUsersInMessage() {
        MessageService
            .getUsersInMessage()
            .then((users) => setUsersInMessage(users))
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        getUsersInMessage();
    }, []);


    useEffect(() => {
        if (usersInMessage.length > 0) {
            setSelectedChannelID(usersInMessage[0].chat_id);
        }
    }, [usersInMessage]);

    function getAllMessagesWithUserByID() {
        MessageService
            .getAllMessagesWithUserById(selectedChannelID)
            .then((_messages) => {
                setMessages(_messages);
                setIsLoadedMessage(true);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        if (selectedChannelID) {
            setIsLoadedMessage(false);
            getAllMessagesWithUserByID();
        }
    }, [selectedChannelID]);

    function onSearch(value) {

    }

    function onClear() {
      
    }

    const personalInfo = () => {
        const userInChannel = usersInMessage.filter((chat) => chat.chat_id === selectedChannelID)[0];

        return {
            full_name: userInChannel?.full_name || "",
            avatar_path: userInChannel?.avatar_path || ""
        }
    }

    return (
        <div className={cx('wrapper')}>
            <Header title={'Trao đổi'} icon={faMessage}/>
            <Row>
                <Col xs={0} md={4} lg={3} xl={3}>
                    <div className={cx('contact-container')}>
                        <h4 className={cx('category-heading')}>{label.contact["contact-heading"]}</h4>
                        
                        <div className={cx("search-container")}>
                            <input 
                                type="text" 
                                className={cx("search-input")} 
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                placeholder="Tìm kiếm"
                            />
                            <div className={cx("search-icon__container", "search")}>
                                <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
                            </div>
                        </div>
                        <div className={cx("user-container")}>
                            {
                                usersInMessage.length > 0 && usersInMessage.map((user, index) => (
                                    <div 
                                        key={index} 
                                        className={cx("user-item", "user", {
                                            active: user.chat_id === selectedChannelID
                                        })}
                                        onClick={() => setSelectedChannelID(user.chat_id)}
                                    >
                                        <img src={user.avatar_path} alt="" className={cx("user-avatar")}/>
                                        <div className={cx("general-info")}>
                                            <h5>{user.full_name}</h5>
                                            <p>{user.last_message}</p>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </Col>
                <Col xs={12} md={8} lg={9} xl={9}>
                    <div className={cx('contact-container')}>
                        {
                            isLoadedMessage ? (
                                <React.Fragment>
                                    <div className={cx("user-item")}>
                                        <img src={personalInfo().avatar_path} alt="" className={cx("user-avatar")}/>
                                        <div className={cx("general-info")}>
                                            <h5>{personalInfo().full_name}</h5>
                                            <p className={cx("d-flex align-items-center")}>
                                                <FontAwesomeIcon 
                                                    icon={faCircle} 
                                                    size="xs" 
                                                    color="var(--active-color)"
                                                    style={{ marginRight: 4 }}
                                                />
                                                {"Đang hoạt động"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={cx("chat-content")}>
                                        {
                                            messages.length > 0 ? messages.map((message, index) => (
                                                <p className={cx("chat-item", {
                                                    "me": message.sent_by === myId
                                                })} key={index}>{message.message_content}</p>
                                            )) : <span 
                                                    className={cx("h-100 d-flex align-items-center justify-content-center")}
                                                >Chưa có dữ liệu</span>
                                        }
                                    </div>
                                    <div className={cx("chat-options")}>
                                        <div className={cx("search-container", "chat")}>
                                            <input 
                                                type="text" 
                                                className={cx("search-input", "chat")} 
                                                value={chatInput}
                                                onChange={(e) => setChatInput(e.target.value)}
                                                placeholder="Nhập nội dung tin nhắn"
                                            />
                                            <Tooltip title="Đính kèm file" color='var(--primary-active-color)'>
                                                <div className={cx("search-icon__container", "chat", "attach-btn")}>
                                                    <FontAwesomeIcon className={cx('search-icon')} icon={faPaperclip} size="xs"/>
                                                </div>
                                            </Tooltip>
                                            <Tooltip title="Gửi tin nhắn" color='var(--purple-color)'>
                                                <div className={cx("search-icon__container", "chat", "sent-btn")}>
                                                    <FontAwesomeIcon className={cx('search-icon')} icon={faPaperPlane} size="xs"/>
                                                </div>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </React.Fragment>
                            ) : (
                                <div className={cx("loading-wrapper")}>
                                    <Spin size="large" />
                                </div>
                            )
                        }
                    </div>
                </Col>
            </Row>
        </div>
    )
}