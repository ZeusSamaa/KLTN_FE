'use client'
import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Job.module.scss";
import { faClock, faEye, faHeart, faMap, faUser } from "@fortawesome/free-regular-svg-icons";
import { faMoneyBill1Wave, faStar, faUserCheck, faHeart as faFillHeart, faTrashCan, faInfo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useSelector } from "react-redux";
import { Button, Rate, notification } from "antd";


import { label } from "@/constant/label";
import { ROLE } from "@/constant/role";
import { formattedCurrency, formattedDate } from "@/helpers/format";
import CustomModal from "../Modal";

import { GeneralService } from "@/services/general.service";
import { JobService } from "@/services/job.service";
import { NOTIFICATION_TYPE } from "@/constant/notification-type";

const cx = classNames.bind(styles);

export default function Job({ 
    job, 
    setSelectedJob, 
    isShortView = false, 
    prevPage, 
    getAllJobs = () => {} 
}) {
    const role = useSelector(state => state.role);
    const [showedDeletedDialog, setShowedDeletedDialog] = useState(false);

    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, message, description) => {
        return api[type]({
          message,
          description,
        });
    };

    const onSetJob = () => {
        if (isShortView) {
            setSelectedJob(job);
        }
    }

    const onDeleteJob = () => {
        JobService
        .deleteJob([ job.id ])
        .then(() => {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.SUCCESS,
                "Thành công",
                "Xóa công việc thành công"
            )
            setShowedDeletedDialog(false);
            getAllJobs();
        })
        .catch((error) => {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.ERROR,
                "Thất bại",
                error
            )
        })
    }

    const onRate = (rate_point) => {
        JobService
            .rateJob(job.id, rate_point)
            .then(() => {
                getAllJobs();
            })
            .catch((error) => {
                openNotificationWithIcon(
                    NOTIFICATION_TYPE.ERROR,
                    "Thất bại",
                    error
                )
            })
    }

    const getAddress = data => data.split(',').pop();

    return (
        <div 
            className={cx('job-card', {
                'able-click': isShortView
            })}
            onClick={() => onSetJob()}
        >
            { contextHolder }
            {
                role === ROLE.BUSINESS && (
                    <div className={cx('trash')} onClick={() => setShowedDeletedDialog(true)}>
                        <FontAwesomeIcon className={cx('i-trash')} icon={faTrashCan} size="sm"/>
                    </div>
                )
            }
            <div className={cx('d-flex align-items-center mb-4')}>
                <img className={cx('job-img')} src={job?.business.user_person.image || 'https://images.careerbuilder.vn/content/images/IOS-developer-careerbuilder.png'} alt=""/>
                <div className={cx('h-100 d-flex flex-column justify-content-between ms-2')}>
                    <h5 className={cx('heading-name mt-0 mb-0')}>{job.job_name}</h5>
                    <span className={cx('content-name')}>{job.company}</span>
                </div>
            </div>

            <div className={cx('d-flex align-items-center mb-2')}>
                <div className={cx('col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 d-flex align-items-center')}>
                    <FontAwesomeIcon icon={faMap} size="sm" color="var(--gray-5-color)"/>
                    <span className={cx('content-name', 'ms-1')}>{getAddress(job?.business.user_person.address) || ''}</span>
                </div>
            </div>

            <div className={cx('d-flex flex-wrap align-items-center  mb-2')}>
                <div className={cx('col d-flex align-items-center')}>
                    <FontAwesomeIcon icon={faMoneyBill1Wave} size="sm" color="var(--gray-5-color)"/>
                    <span className={cx('content-name', 'ms-1')}>{formattedCurrency(Math.floor(job.salary))}</span>
                </div>
                <div className={cx('col d-flex align-items-center')}>
                    <FontAwesomeIcon icon={faClock} size="sm" color="var(--gray-5-color)"/>
                    <span className={cx('content-name', 'ms-1')}>{formattedDate(job.expire_date)}</span>
                </div>
            </div>

            <div className={cx('d-flex flex-wrap mt-2 justify-content-between align-items-center')}>
                <div className={cx('col d-flex align-items-center mb-2')}>
                    <FontAwesomeIcon icon={faStar} size="sm" color="var(--volcano-3-color)"/>
                    <span className={cx('content-name', 'ms-1')}>{ (job.average_rate && (Math.floor(job.average_rate)).toFixed(1)) || 0 }/5</span>
                </div>
                <div className={cx('col d-flex align-items-center mb-2')}>
                    <FontAwesomeIcon icon={faEye} size="sm" color="var(--gray-5-color)"/>
                    <span className={cx('content-name', 'ms-1')}>{job.viewer_count}</span>
                </div>
                <div className={cx('col d-flex align-items-center mb-2')}>
                    <FontAwesomeIcon icon={faUser} size="sm" color="var(--gray-5-color)"/>
                    <span className={cx('content-name', 'ms-1')}>{job.candidates || 0}</span>
                </div>
                <div className={cx('col d-flex align-items-center mb-2')}>
                    <FontAwesomeIcon icon={faUserCheck} size="sm" color="var(--gray-5-color)"/>
                    <span className={cx('content-name', 'ms-1')}>{job.appliers || 0}</span>
                </div>
            </div>

            <div className={cx('d-flex flex-wrap align-items-center gap-3 mb-4')}>
                {
                    job.jobSkills.map((_skill, index) => (
                        index < 2 && (
                            <div 
                                key={index} 
                                className={cx('view-btn view-mode')}
                            >{_skill.skill.skill_name}</div>
                        )
                    ))
                }
                {
                    job.jobSkills.length > 2 && (
                        <div 
                            className={cx('view-btn view-mode')}
                        >{ job.jobSkills.length - 2 }+</div>
                    )
                }
                
            </div>

            <div className={cx('d-flex align-items-center justify-content-between')}>
                {
                    job?.isApplied && (
                        <Rate 
                            defaultValue={0} 
                            value={job.average_rate || 0} 
                            style={{color: 'var(--volcano-3-color)'}}
                            onChange={(value) => onRate(value)}
                        />
                    )
                }
                <Link 
                    className={cx('view-btn optional')}
                    style={{ textDecoration: 'none' }}
                    href={{ 
                        pathname: '/student/view-job', 
                        query: { 'jobId': job?.id, 'prevPage': prevPage },
                    }}
                >Xem chi tiết</Link>
            </div>

            {
                showedDeletedDialog && (
                    <CustomModal
                        heading={''}
                        saveButtonLabel={'Xác nhận'}
                        onHide={() => setShowedDeletedDialog(false)}
                        onSave={() => onDeleteJob()}
                    >
                        <div className={cx('d-flex justify-content-center')}>
                            <div className={cx('warning-box')}>
                                <FontAwesomeIcon icon={faInfo} size="sm" color="var(--red-5-color)"/>
                            </div>
                        </div>
                        <h4 className={cx('content-name', 'text-center mt-3')}>Bạn chắc chắn muốn xóa công việc này?</h4>
                    </CustomModal>
                )
            }
        </div>
    );
}