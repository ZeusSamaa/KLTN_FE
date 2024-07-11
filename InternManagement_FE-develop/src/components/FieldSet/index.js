import classNames from "classnames/bind";
import styles from "./page.module.scss";

const cx = classNames.bind(styles);

export default function FieldSet({ children, heading }) {
    return (
        <div className={cx('content')}>
            <h2 className={cx('heading')}>
                { heading }
            </h2> 
            <div className={cx('wrapper')}>
                { children }
            </div>
        </div>
    )
}