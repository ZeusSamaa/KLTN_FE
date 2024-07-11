'use client'
import React, { useEffect, useState } from "react";

import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { Tabs } from 'antd';
import { faHome } from "@fortawesome/free-solid-svg-icons";

import Header from "@/components/Header";
import School from "./school";
import Business from "./business";

const cx = classNames.bind(styles);

const tabs = [
    {
        key: 1,
        label: "Trường học",
        children: <School />
    },
    {
        key: 2,
        label: "Doanh nghiệp",
        children: <Business />
    }
]

export default function ManageApp() {
    return (
        <div className={cx("wrapper")}>
            <Header title={'Trang chủ'} icon={faHome}/>
            <div className={cx('intern-container')}>
                <div className={cx('intern-main')}>
                    <Tabs
                        defaultActiveKey="1"
                        items={tabs}
                    />
                </div>
            </div>
        </div>
    )
}