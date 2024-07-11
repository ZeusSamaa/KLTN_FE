'use client'
import { useSelector } from "react-redux";
import classNames from "classnames/bind";
import styles from './page.module.scss'
import { notification } from 'antd';

const cx = classNames.bind(styles);

export default function Content ({ children }) {
    const isLogined = useSelector(state => state.login);
    
    return (
        <div className={cx('content', { logined: isLogined })}>
            { children }
        </div>
    )
}