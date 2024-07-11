'use client'
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import classNames from 'classnames/bind';
import styles from './page.module.scss'

import { setRole } from "@/store/reducer/roleReducer";
import { setLogin } from "@/store/reducer/loginReducer";
import { setLoading } from "@/store/reducer/loadingReducer";
import ContextProvider from "@/context/providerContext";

import Menu from '@/components/MenuSidebar';
import Loading from '@/components/Loading';
import Custom404 from '@/app/not-found.jsx';
import Content from './content';
import ChatBot from '@/components/Chatbot';

import { LocalStorageService } from '@/services/localStorage.service';
import { ROLE } from '@/constant/role';

const cx = classNames.bind(styles);

const Children = ({ _children }) => {
    const currentRole = useSelector(state => state.role);
    const isLogined = useSelector(state => state.login);
    const loading = useSelector(state => state.loading);
    const { fullLoading, navbarLoading } = loading;
    const dispatch = useDispatch();
    const router = useRouter();
    
    const [clickedChatbot, setClickedChatbot] = useState(false);


    function getToken() {
        if (!isLogined) {
            LocalStorageService.getToken().then((token) => {
                if (token && Object.keys((token))?.length > 0) {
                    const now = new Date();
                    if (now.getTime() > token.expire) {
                        LocalStorageService.removeToken();
                        router.push('/login');
                    } else {
                        const role = LocalStorageService.getRole();
                        dispatch(setRole(role));
                        dispatch(setLogin(true));
                    }
                } else {
                    router.push('/login');
                }
                dispatch(setLoading({ navbarLoading, fullLoading: false }));
            })
        } 
    }

    useEffect(() => {
        getToken();
    }, [])

    return (
        <React.Fragment>
        {
            fullLoading ? (
                <div 
                    className={cx(
                        'd-flex align-items-center justify-content-center h-100'
                    )}
                >
                    <Loading/>
                </div>
            ) : (
                <Container fluid className={cx('container')}>
                    <Row g={0}>
                        <Col 
                            md={(isLogined) ? "4" : "0"}  
                            lg={(isLogined) ? "3" : "0"}  
                            xl={(isLogined) ? "2" : "0"}  
                            className={cx("reset-padding", "menu")}
                        >
                            <Menu className={cx('menu')} />
                        </Col>
                        <Col 
                            sm="12" 
                            md={isLogined ? "8" : "0"}  
                            lg={isLogined ? "9" : "0"}  
                            xl={isLogined ? "10" : "12"}  
                            className={cx("reset-padding")}
                        >
                            {
                                navbarLoading ? (
                                    <div 
                                        className={cx(
                                            'd-flex align-items-center justify-content-center h-100'
                                        )}
                                    >
                                        <Loading/>
                                    </div>
                                ) : (
                                    <Content children={_children}/>
                                )
                            }
                        </Col>
                    </Row>
                    {
                        currentRole === ROLE.STUDENT && (
                            <div className={cx('chatbot')} onClick={() => setClickedChatbot(prev => !prev)}>
                                <img
                                    src="https://freepngimg.com/save/97427-logo-chat-png-file-hd/640x492"
                                    alt=""
                                    className={cx('chatbot-icon')}
                                />
                            </div>
                        )
                    }
                    {
                        clickedChatbot && <ChatBot open={setClickedChatbot} />
                    }
                </Container>
            )
        }
        </React.Fragment>
    )
}

export default function MainLayout({ children }) {
    return (
        <ContextProvider>
            <Children _children={children}/>
        </ContextProvider>
    )
}