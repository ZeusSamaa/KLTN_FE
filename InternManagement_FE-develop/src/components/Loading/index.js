import classNames from "classnames/bind";
import styles from "./Loading.module.scss";
import { Spin } from "antd";

const cx = classNames.bind(styles);

export default function Loading() {
    return (
        <div className={cx("wrapper")}>
            <Spin size="large" />
        </div>
    )
}