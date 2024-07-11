import classNames from "classnames/bind";
import styles from "./Modal.module.scss";
import React from "react";

const cx = classNames.bind(styles);

export default function CustomModal({ 
    heading, 
    onHide, 
    onSave, 
    saveButtonLabel,
    children
}) {

    return (
        <div className={cx("modal")}>
            <div className={cx("modal-body")}>
                <h4 
                    className={cx('category-heading')} 
                    style={{marginTop: '10px', marginBottom: '20px'}}
                >{heading}</h4>

                <React.Fragment>
                    { children }
                </React.Fragment>
                
                <div 
                    className={cx('d-flex justify-content-end gap-3')} 
                    style={{marginTop: '30px', marginBottom: '10px'}}
                >
                    <button 
                        className={cx("view-btn")}
                        onClick={onSave}
                    >{saveButtonLabel}</button>

                    <button 
                        className={cx("view-btn", "error")}
                        onClick={onHide}
                    >Đóng</button>
                </div>
            </div>
        </div>
    )
}