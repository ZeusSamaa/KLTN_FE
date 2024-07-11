'use client'
import classNames from "classnames/bind";
import styles from "./buttonback.module.scss";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointLeft } from "@fortawesome/free-solid-svg-icons";

const cx = classNames.bind(styles);

export default function ButtonBack({ prevPath, style }) {
    const router = useRouter();
    const data = router.query;

    return (
        <button 
            className={cx('view-btn', 'pending')} 
            onClick={() => router.push(prevPath)}
            style={{...style}}
        >
            <FontAwesomeIcon icon={faHandPointLeft} style={{marginRight: 8}}/>
            <span>Quay lại</span>
        </button>
    )
}