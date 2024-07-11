import classNames from "classnames/bind";
import styles from "./Search.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

export default function Search({ classList = [], value,  setValue }) {
    return (
        <div className={cx("search-container", ...classList)}>
            <input 
                type="text" 
                className={cx("search-input")} 
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Tìm kiếm"
            />
            <div className={cx("search-icon__container", "search")}>
                <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
            </div>
        </div>
    )
}