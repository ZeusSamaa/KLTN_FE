'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { faBuilding, faEnvelope, faLink, faMapLocationDot, faPhone, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";
import { Skeleton, Empty, Spin, notification } from "antd";
import classNames from "classnames/bind";
import styles from "./page.module.scss";

import Header from "@/components/Header";
import { label } from "@/constant/label";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NOTIFICATION_TYPE } from "@/constant/notification-type";
import { LINKED_STATUS, getLinkedStatus } from "@/constant/linked-status";

import { GeneralService } from "@/services/general.service";

const cx = classNames.bind(styles);

const BusinessItem = ({ business, selectItem = () => {}, isPropagation }) => {
    return (
        <div 
            className={cx('item-card', 'd-flex gap-4 mt-3 mb-4')}
            onClick={() => {
                if (isPropagation) {
                    selectItem(business);
                }
            }}
        >
            <div className={cx('avatar')}>
                <img src={business.user_person?.image}/>
            </div>
            <div>
                <span className={cx('heading-name')}>{business.user_person.full_name}</span>

                <div>
                    <FontAwesomeIcon color="var(--gray-7-color)" icon={faPhone} size="sm"/>
                    <span className={cx('ms-2')}>{business.user_person.phone}</span>
                </div>

                <div>
                    <FontAwesomeIcon color="var(--gray-7-color)" icon={faEnvelope} size="sm"/>
                    <span className={cx('ms-2')}>{business.user_person.email}</span>
                </div>

                <div>
                    <FontAwesomeIcon color="var(--gray-7-color)" icon={faMapLocationDot} size="sm"/>
                    <span className={cx('ms-2')}>{business.user_person.address}</span>
                </div>
            </div>
        </div>
    )
}


export default function AdminBusiness() {
    const [profile, setProfile] = useState(null);
    const [unlinkedBusinesses, setUnlinkedBusinesses] = useState([]);
    const [linkedBusinesses, setLinkedBusinesses] = useState([]);
    const [pendingLinkedRequests, setPendingLinkedRequests] = useState([]);
    const [selectedBusiness, setSelectedBusiness] = useState(null);

    const [loading, setLoading] = useState(true);

    const [api, contextHolder] = notification.useNotification();
    
    const openNotificationWithIcon = (type, message, description) => {
        return api[type]({
            message,
          description,
        });
    };

    const getProfile = () => {
        GeneralService
            .getProfile()
            .then((res) => {
                setProfile(res.data);
            })
    }

    const getUnLinkedBusinesses = () => {
        GeneralService
                .getUnLinkedBusinesses()
                .then((res) => {
                    setUnlinkedBusinesses(res.data.items);
                })
    }

    const getLinkedBusiness = () => {
        GeneralService
            .getLinkedBusiness()
            .then((res) => {
                const _linkedList = [];
                const _pendingList = [];
                if (res.data.items.length > 0) {
                    res.data.items.forEach((item) => {
                        item.schoolLinkedBusiness.forEach((linkedItem) => {
                            if (linkedItem.school_id === profile?.userData.schoolId ) {
                                if (linkedItem.is_linked === LINKED_STATUS.APPROVED.value) {
                                    _linkedList.push(item);
                                } else {
                                    _pendingList.push(item);
                                }
                            }
                        })
                    })
                    setLinkedBusinesses(_linkedList);
                    setPendingLinkedRequests(_pendingList);
                    setLoading(false);
                }
            })
    }

    const getLinkedData = () => {
        getUnLinkedBusinesses();
        getLinkedBusiness();
    }

    useEffect(() => {
        getProfile();
    }, [])

    useEffect(() => {
        if (profile) {
            getLinkedData();
        }
    }, [profile])

    const handleLinked = () => {
        const business_id = selectedBusiness.id;
        GeneralService
            .postLinkedBusiness(business_id)
            .then(() => {
                openNotificationWithIcon(
                    NOTIFICATION_TYPE.SUCCESS,
                    "Thành công",
                    "Bạn đã gửi yêu cầu liên kết đến doanh nghiệp thành công"
                )
                getLinkedData();
                setSelectedBusiness(null);
            })
            .catch((error) => {
                openNotificationWithIcon(
                    NOTIFICATION_TYPE.ERROR,
                    "Thất bại",
                    error
                )
            })
    }

    return (
        <div className={cx("wrapper")}>
            { contextHolder }
            <Header title={'Doanh nghiệp'} icon={faBuilding}/>
          
            <div className={cx('row')}>
                <div className={cx('col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12')}>
                    <div className={cx('business-container')}>
                        <h2 className={cx('category-heading')}>{label.business["business-list"]}</h2>
                        {
                            loading ? <div className={cx('mt-4')}>
                                <Skeleton.Button 
                                    className={cx('mb-2')} 
                                    active={true} 
                                    size={"large"} 
                                    shape={"square"} 
                                    block={true} 
                                />
                                <Skeleton.Button 
                                    className={cx('mb-2')} 
                                    active={true} 
                                    size={"large"} 
                                    shape={"square"} 
                                    block={true} 
                                />
                                <Skeleton.Button 
                                    className={cx('mb-2')} 
                                    active={true} 
                                    size={"large"} 
                                    shape={"square"} 
                                    block={true} 
                                />
                            </div> : (
                                <React.Fragment>
                                    {
                                        unlinkedBusinesses.length > 0 ? (
                                            unlinkedBusinesses.map((business, idx) => (
                                                <BusinessItem 
                                                    business={business} 
                                                    key={idx}
                                                    selectItem={setSelectedBusiness}
                                                    isPropagation={true}
                                                />
                                            ))
                                        ) : (
                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                        )
                                    }
                                </React.Fragment>
                            )
                        }
                    </div>
                    <div className={cx('business-container', 'mt-3')}>
                        <h2 className={cx('category-heading')}>{label.business["linked-business"]}</h2>
                        {
                            loading ? <div className={cx('mt-4')}>
                                <Skeleton.Button 
                                    className={cx('mb-2')} 
                                    active={true} 
                                    size={"large"} 
                                    shape={"square"} 
                                    block={true} 
                                />
                                <Skeleton.Button 
                                    className={cx('mb-2')} 
                                    active={true} 
                                    size={"large"} 
                                    shape={"square"} 
                                    block={true} 
                                />
                                <Skeleton.Button 
                                    className={cx('mb-2')} 
                                    active={true} 
                                    size={"large"} 
                                    shape={"square"} 
                                    block={true} 
                                />
                            </div> : (
                                <React.Fragment>
                                    {
                                        linkedBusinesses.length > 0 ? (
                                            linkedBusinesses.map((business, idx) => (
                                                <BusinessItem 
                                                    business={business} 
                                                    key={idx}
                                                    isPropagation={false} 
                                                />
                                            ))
                                        ) : (
                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                        )
                                    }
                                </React.Fragment>
                            )
                        }

                    </div>
                </div>
                <div className={cx('col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12')}>
                    <div className={cx('business-container')}>
                        <h2 className={cx('category-heading')}>{label.business["chosed-business"]}</h2>

                        {
                            selectedBusiness && (
                                <div 
                                    className={cx('item-card', 'mt-3')}
                                    onClick={() => selectItem(business)}
                                >
                                    <div className={cx('d-flex flex-column align-items-center')}>
                                        <div className={cx('avatar', 'border-outlined')}>
                                            <img src={selectedBusiness.user_person?.image}/>
                                        </div>
                                        <span className={cx('heading-name')}>{selectedBusiness.user_person.full_name}</span>
                                    </div>
                                    <div className={cx('mt-2')}>
                                        <FontAwesomeIcon color="var(--gray-7-color)" icon={faPhone} size="sm"/>
                                        <span className={cx('ms-2')}>{selectedBusiness.user_person.phone}</span>
                                    </div>
                                    <div className={cx('mt-2')}>
                                        <FontAwesomeIcon color="var(--gray-7-color)" icon={faEnvelope} size="sm"/>
                                        <span className={cx('ms-2')}>{selectedBusiness.user_person.email}</span>
                                    </div>
                                    <div className={cx('mt-2')}>
                                        <FontAwesomeIcon color="var(--gray-7-color)" icon={faMapLocationDot} size="sm"/>
                                        <span className={cx('ms-2')}>{selectedBusiness.user_person.address}</span>
                                    </div>
                                </div>
                            )
                        }
                        {
                            selectedBusiness && (
                                <div className={cx('d-flex justify-content-between mt-3')}>
                                    <button 
                                        className={cx('view-btn', 'sucess')}
                                        onClick={handleLinked}
                                    >
                                        <FontAwesomeIcon icon={faLink}  style={{ marginRight: 8 }}/>
                                        Liên kết
                                    </button>
                                    <button 
                                        className={cx('view-btn', 'error')}
                                        onClick={() => setSelectedBusiness(null)}    
                                    >
                                        <FontAwesomeIcon icon={faTrash}  style={{ marginRight: 8 }}/>
                                        Gỡ bỏ
                                    </button>
                                </div>
                            )
                        }
                    </div>

                    <div className={cx('business-container', 'mt-3')}>
                        <h2 className={cx('category-heading')}>{label.business["linked-request"]}</h2>
                        {
                            loading ? <div className={cx('mt-4')}>
                                <Skeleton.Button 
                                    className={cx('mb-2')} 
                                    active={true} 
                                    size={"large"} 
                                    shape={"square"} 
                                    block={true} 
                                />
                            </div> : (
                                <React.Fragment>
                                    {
                                        pendingLinkedRequests.length > 0 ? (
                                            pendingLinkedRequests.map((business, idx) => (
                                                <div key={idx} className={cx('d-flex justify-content-between align-items-center')}>
                                                    <div className={cx('d-flex gap-2 align-items-center')}>
                                                        <div className={cx('avatar')}>
                                                            <img src={business.user_person.image}/>
                                                        </div>
                                                        <span 
                                                            className={cx('heading-name')}
                                                            style={{ fontSize: 16, marginTop: 0 }}
                                                        >{business.user_person.full_name}</span>
                                                    </div>
                                                    <span className={cx('view-btn view-mode', {
                                                        pending: business.schoolLinkedBusiness[0].is_linked === LINKED_STATUS.WAITING.value,
                                                        error: business.schoolLinkedBusiness[0].is_linked === LINKED_STATUS.REJECTED.value,
                                                    })}>
                                                        { getLinkedStatus(business.schoolLinkedBusiness[0].is_linked) }
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                        )
                                    }
                                </React.Fragment>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}