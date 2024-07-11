"use client"
import { useState } from "react";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { Input, Spin, notification } from "antd";

import { LoginService } from "@/services/login.service"
import { LocalStorageService } from "@/services/localStorage.service"

const cx = classNames.bind(styles);

export default function Login() {
    const initUser = {
        username: "",
        pass: "",
    }
    const [user, setUser] = useState(initUser);
    const [inValidMessage, setInValidMessage] = useState("empty");
    const [api, contextHolder] = notification.useNotification();
    const [pending, setPending] = useState(false);

    const openNotificationWithIcon = (type, message, description) => {
        return api[type]({
          message,
          description,
        });
    };

    function handleSubmitLogin() {
        if (isValidatedData()) {
            setPending(true);
            LoginService
                .login(user)
                .then((res) => {
                    openNotificationWithIcon('success', 'Thành công', 'Đăng nhập thành công');
                    saveAccount(res.data);
                })
                .catch((err) => {
                    openNotificationWithIcon('error', 'Thất bại', 'Thông tin tài khoản không chính xác');
                    setPending(false);
                });
        } else {

        }
    }

    function isValidatedData() {
        if (!user.username.trim() && !user.pass.trim()) {
            setInValidMessage("Vui lòng điền đầy đủ thông tin");
            return false;
        }
        return true;
    }

    function saveAccount(response) {
        const secret_token = LocalStorageService.getToken();
        if (!secret_token) { 
            LocalStorageService.createNewToken();
        }
        
        LocalStorageService
            .saveToken(response)
            .then(() => {
                setPending(false);
                window.location.assign('/');
            })
    }

    function refreshInputMessage() {
        setInValidMessage("empty");
    }

    return (
        <div className={cx('login_container')}>
        { contextHolder }
            <div className={cx('login')}>
                <div className={cx("row w-100 justify-content-center")}>
                    <div 
                        className={cx("col-xl-3 col-lg-5 col-md-6 col-sm-10 col-11")}
                        style={{transform: 'translateX(12px)'}}
                    >
                        <div className={cx('form')}>
                            <div className={cx("text-center mb-5")}>
                                <img 
                                    src="https://firebasestorage.googleapis.com/v0/b/internship-management-90eca.appspot.com/o/logo%2Fsecond-logo.png?alt=media&token=436b2e38-df1f-4727-bf7c-61cd2ea6514c"
                                    alt="logo"
                                    width={140}
                                    height={100}
                                    style={{objectFit: 'cover'}}
                                />
                                <span className={cx('banner_heading d-block')}>Internship Management System - ITW</span>
                            </div>
                            <h3 className={cx('banner_heading')}>Đăng nhập</h3>
                            <p className={cx('login_require')}>Vui lòng đăng nhập để tiếp tục 
                                <span className={cx('require_star')}>*</span>
                            </p>
                            <div className={cx('input_item')}>
                                <Input  
                                    className={cx('input_field', {
                                        error: inValidMessage !== "empty"
                                    })} 
                                    type="text" 
                                    placeholder="Tên đăng nhập" 
                                    required
                                    name="username"
                                    value={user.username}
                                    onFocus={() => refreshInputMessage()}
                                    onBlur={() => isValidatedData()}
                                    onChange={(e) => setUser(prev => ({...prev, [e.target.name]: e.target.value}))}
                                    onKeyDown={(e) => e.code === "Enter" && handleSubmitLogin()}
                                />
                                <p className={cx("message-label", {
                                        error: inValidMessage !== "empty"
                                })}>{inValidMessage}</p>
                            </div>
                            <div className={cx('input_item')}>
                                <Input.Password 
                                    className={cx('input_field', {
                                        error: inValidMessage !== "empty"
                                    })} 
                                    type="password" 
                                    placeholder="Mật khẩu" 
                                    required
                                    name="pass"
                                    value={user.password}
                                    onFocus={() => refreshInputMessage()}
                                    onBlur={() => isValidatedData()}
                                    onChange={(e) => setUser(prev => ({...prev, [e.target.name]: e.target.value}))}
                                    onKeyDown={(e) => e.code === "Enter" && handleSubmitLogin()}
                                />
                                <p className={cx("message-label", {
                                        error: inValidMessage !== "empty"
                                })}>{inValidMessage}</p>
                            </div>
                            <span className={cx('forget_pass')}>Quên mật khẩu</span>
                            <button className={cx('view-btn', 'login-btn', 'mt-4')} onClick={() => handleSubmitLogin()}>
                                { pending && <Spin size="small" style={{ marginRight: 8 }}/> }
                                Đăng nhập
                            </button>
                            <div className={cx("text-center mt-2")}>
                                <span style={{color: 'var(--border-color)', fontSize: 13}}>Chưa có tài khoản? </span>
                                <span className={cx('forget_pass')}>Liên hệ quản trị viên</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}