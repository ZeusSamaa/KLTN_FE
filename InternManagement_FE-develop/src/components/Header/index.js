'use client'
import { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./header.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-regular-svg-icons";
import { Input, Modal } from "antd";

import { LocalStorageService } from "@/services/localStorage.service";
import { GeneralService } from "@/services/general.service";

const cx = classNames.bind(styles);

const AccountModal = ({ profile }) => {
    return (
        <div className={cx('row')}>
            <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                <p className={cx("todo-label")}>Tên đăng nhập</p>
                <Input value={profile?.user.username} disabled/>
            </div>
            <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                <p className={cx("todo-label")}>Họ và tên</p>
                <Input value={profile?.user.full_name} readOnly/>
            </div>
            <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                <p className={cx("todo-label")}>Số điện thoại</p>
                <Input value={profile?.user.phone} readOnly/>
            </div>
            <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                <p className={cx("todo-label")}>Email</p>
                <Input value={profile?.user.email} readOnly/>
            </div>
            <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                <p className={cx("todo-label")}>Địa chỉ</p>
                <Input value={profile?.user.address} readOnly/>
            </div>
        </div>
    )
}

const SettingPassword = () => {
    return (
        <div className={cx('row')}>
            <div className={cx("col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                <p className={cx("todo-label")}>Mật khẩu hiện tại</p>
                <Input.Password />
            </div>
            <div className={cx("col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                <p className={cx("todo-label")}>Mật khẩu mới</p>
                <Input.Password />
            </div>
            <div className={cx("col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                <p className={cx("todo-label")}>Xác nhận mật khẩu</p>
                <Input.Password />
            </div>
        </div>
    )
}

export default function Header({ title, icon }) {
    const [profile, setProfile] = useState(null);

    const [showProfile, setShowProfile] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);

    const getProfile = () => {
        GeneralService
            .getProfile()
            .then((res) => setProfile(res.data))
    }

    useEffect(() => {
        getProfile();
    }, [])

    function logout() {
        LocalStorageService.removeToken();
        window.location.assign('/login');
    }

    return (
        <header className={cx("header")}>
            <div className="d-flex align-items-center">
                <FontAwesomeIcon icon={icon} size="sm"/>
                <h5 className={cx("heading")}>{ title }</h5>
            </div>
            <div className="d-flex align-items-center position-relative">
                <div style={{ position: 'relative' }}>
                    <FontAwesomeIcon icon={faBell} size="lg" className={cx("i-notification")}/>
                    <span className={cx('total-notif')}>0</span>
                </div>
                <div className={cx('user-options')}>
                    <div className={cx("avatar")}>
                        <img 
                            src={
                                profile?.user.image ||
                                "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" 
                            }
                            alt="user-avt"
                        />
                    </div>
                    <ul className={cx("account-settings")}>
                        <li className={cx("setting-item")} onClick={() => setShowProfile(true)}>Thông tin tài khoản</li>
                        <li className={cx("setting-item")} onClick={() => setShowResetPassword(true)}>Cài đặt mật khẩu</li>
                        <li 
                            className={cx("setting-item")} 
                            onClick={() => logout()}>
                            Đăng xuất
                        </li>
                    </ul>
                </div>
            </div>
            <Modal
                title="Thông tin tài khoản"
                centered
                open={showProfile}
                onCancel={() => {
                    setShowProfile(false);
                }}
                width={600}
                footer={[
                    <button className={cx('view-btn', 'cancel')} onClick={() => setShowProfile(false)}>Đóng</button>
                ]}
            >
                <AccountModal profile={profile} />
            </Modal>

            <Modal
                title="Cài đặt mật khẩu"
                centered
                open={showResetPassword}
                onCancel={() => {
                    setShowResetPassword(false);
                }}
                width={400}
                footer={[
                    <div className={cx('d-flex justify-content-end gap-1')}>
                        <button className={cx('view-btn')} onClick={() => setShowResetPassword(false)}>Lưu thay đổi</button>,
                        <button className={cx('view-btn', 'cancel')} onClick={() => setShowResetPassword(false)}>Đóng</button>
                    </div>
                ]}
            >
                <SettingPassword />
            </Modal>
        </header>
    )
}