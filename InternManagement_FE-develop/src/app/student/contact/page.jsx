'use client'
import React, { useEffect, useRef, useState } from "react";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faMagnifyingGlass, faMessage, faPaperPlane, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";
import { Empty, Spin, Tooltip, notification } from "antd";
import io from 'socket.io-client';

import Header from "@/components/Header";
import { label } from "@/constant/label";
import { MessageService } from "@/services/message.service";

import { environment } from "@/environment";
import { GeneralService } from "@/services/general.service";
import { NOTIFICATION_TYPE } from "@/constant/notification-type";
import { formattedDate, formattedHours } from "@/helpers/format";

// const SOCKET_SERVER_URL = "http://localhost:8080";
const SOCKET_SERVER_URL = environment.chathost;

const cx = classNames.bind(styles);

const useSocket = (messageHandler) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(SOCKET_SERVER_URL);
        setSocket(newSocket);
        if (messageHandler && typeof messageHandler === 'function') {
            newSocket.on('sendDataServer', messageHandler);
        }
        return () => {
            newSocket.disconnect();
        };
    }, []);

    return socket;
};

export default function StudentContact() {
    const handleMessageFromServer = (message) => {
        setMessages((prev) => [...prev, message.data]);
    };

    const socket = useSocket(handleMessageFromServer);

    const [searchInput, setSearchInput] = useState('');
    const [profile, setProfile] = useState('');
    const [usersInMessage, setUsersInMessage] = useState([]);
    const [selectedChannelID, setSelectedChannelID] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isLoadedMessage, setIsLoadedMessage] = useState(true);
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, message, description) => {
        return api[type]({
            message,
            description,
        });
    };

    const [message, setMessage] = useState('');

    function getProfile() {
        GeneralService
            .getProfile()
            .then((res) => setProfile(res.data))
    }

    function getConversations() {
        const NO_USER_IN_CHAT_LIST = 0;
        MessageService
            .getConversationsInStudent()
            .then((res) => {
                setUsersInMessage(res.data);
                if (res.data.length === NO_USER_IN_CHAT_LIST) {
                    setIsLoadedMessage(false);
                }
            })
    }

    useEffect(() => {
        getProfile();
        getConversations();
    }, [])

    useEffect(() => {
        if (usersInMessage.length > 0) {
            setSelectedChannelID(usersInMessage[0].id);
        }

    }, [usersInMessage]);

    function getAllMessagesWithUserByChannelID() {
        setIsLoadedMessage(true);
        MessageService
            .getConversationDetailInStudent(selectedChannelID)
            .then((res) => {
                setMessages(res.data.detailConversation);
                setIsLoadedMessage(false);
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        if (selectedChannelID) {
            getAllMessagesWithUserByChannelID();
        }
    }, [selectedChannelID]);

    const personalInfo = () => {
        const userInChannel = usersInMessage.filter((chat) => chat.id === selectedChannelID)[0];

        return {
            full_name: userInChannel?.business.user_person.full_name || "",
            avatar_path: userInChannel?.business.user_person.image ||
                "https://cdn-icons-png.flaticon.com/512/3607/3607444.png"
        }
    }

    const sendMessage = () => {
        if (message.trim().length === 0) {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.ERROR,
                "Thông báo",
                "Vui lòng nhập tin nhắn trước khi gửi"
            );
            return;
        }

        if (socket) {
            const msg = {
                content: message,
                conversation_id: selectedChannelID,
                user_id: profile.userData.id,
            };
            socket.emit('sendDataClient', msg);
            setMessage('');
        }
    };

    const messageBody = useRef();

    const scrollToBottom = () => {
        messageBody.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className={cx('wrapper')}>
            {contextHolder}
            <Header title={'Trao đổi'} icon={faMessage} />
            <Row>
                <Col xs={0} md={4} lg={3} xl={3}>
                    <div className={cx('contact-container')}>
                        <h4 className={cx('category-heading')}>{label.contact["contact-heading"]}</h4>

                        {
                            usersInMessage.length > 0 && (
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
                            )
                        }

                        <div className={cx("user-container")}>
                            {
                                !isLoadedMessage ? (
                                    <React.Fragment>
                                        {
                                            usersInMessage.length > 0 ? usersInMessage.map((user, index) => (
                                                <div
                                                    key={index}
                                                    className={cx("user-item", "user", {
                                                        active: user.id === selectedChannelID
                                                    })}
                                                    onClick={() => setSelectedChannelID(user.id)}
                                                >
                                                    <img
                                                        src={user.business.user_person.image || 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png'}
                                                        alt=""
                                                        className={cx("user-avatar")}
                                                    />
                                                    <div className={cx("general-info")}>
                                                        <h5>{user.business.user_person.full_name}</h5>
                                                        {/* <p>{user.last_message}</p> */}
                                                    </div>
                                                </div>
                                            )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                        }
                                    </React.Fragment>
                                ) : <div className={cx('w-100')}>
                                    <Spin size="small" className={cx('ms-3')} />
                                </div>
                            }
                        </div>
                    </div>
                </Col>
                <Col xs={12} md={8} lg={9} xl={9}>
                    <div className={cx('contact-container')}>
                        {
                            !isLoadedMessage ? (
                                <React.Fragment>
                                    {
                                        messages.length > 0 ? (
                                            <React.Fragment>
                                                <div className={cx("user-item")}>
                                                    <img src={personalInfo().avatar_path} alt="" className={cx("user-avatar")} />
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
                                                        messages.map((message, index) => (
                                                            <div
                                                                style={{ width: 'fit-content', maxWidth: 400 }}
                                                                className={cx({
                                                                    "me": message.user_id === profile.userData?.id
                                                                }, "mb-3")}
                                                            >
                                                                <p className={cx("chat-item", {
                                                                    "me": message.user_id === profile.userData?.id
                                                                }, "msg")} key={index}>
                                                                    {message.content}
                                                                </p>
                                                                {/* <div className={cx('d-flex gap-2')} >
                                                                    <i className={cx('send-time', {
                                                                        "me": message.user_id === profile.userData?.id
                                                                    })}>{ formattedHours(message.createdAt) }</i>

                                                                    <i className={cx('send-time', 'ms-1', {
                                                                        "me": message.user_id === profile.userData?.id
                                                                    })}>{ formattedDate(message.createdAt) }</i>
                                                                </div> */}
                                                            </div>
                                                        ))
                                                    }
                                                    <div ref={messageBody}></div>
                                                </div>
                                                <div className={cx("chat-options")}>
                                                    <div className={cx("search-container", "chat")}>
                                                        <input
                                                            type="text"
                                                            className={cx("search-input", "chat")}
                                                            value={message}
                                                            onChange={(e) => setMessage(e.target.value)}
                                                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                                                            placeholder="Nhập nội dung tin nhắn"
                                                        />
                                                        <Tooltip title="Đính kèm file" color='var(--primary-active-color)'>
                                                            <div className={cx("search-icon__container", "chat", "attach-btn")}>
                                                                <FontAwesomeIcon className={cx('search-icon')} icon={faPaperclip} size="xs" />
                                                            </div>
                                                        </Tooltip>
                                                        <Tooltip title="Gửi tin nhắn" color='var(--purple-color)'>
                                                            <div
                                                                className={cx("search-icon__container", "chat", "sent-btn")}
                                                                onClick={sendMessage}
                                                            >
                                                                <FontAwesomeIcon className={cx('search-icon')} icon={faPaperPlane} size="xs" />
                                                            </div>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </React.Fragment>
                                        ) : <div className={cx('h-100 d-flex align-items-center justify-content-center')}>
                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                        </div>
                                    }
                                </React.Fragment>
                            ) : (
                                <div className={cx("loading-wrapper")}>
                                    <Spin size="small" />
                                </div>
                            )
                        }
                    </div>
                </Col>
            </Row>
        </div>
    )
}