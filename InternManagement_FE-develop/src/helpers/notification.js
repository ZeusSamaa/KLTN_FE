'use client'
import { notification } from "antd";
import React, { useEffect } from "react";

export default function Notification({ showNoti, type, message, description }) {
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, message, description) => {
        return api[type]({
          message,
          description,
        });
    };

    useEffect(() => {
        if (showNoti) {
            openNotificationWithIcon(type, message, description);
        }
    }, [showNoti])

    return <React.Fragment>
        { contextHolder }
    </React.Fragment>
}