'use client'
import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Spin, notification } from "antd";
import { Col, Row } from "react-bootstrap";
import { faBookmark, faStar, faUserGroup } from "@fortawesome/free-solid-svg-icons";

import { ROLE } from "@/constant/role";
import { handleNavigate } from "@/utils/navigate";
import Header from "@/components/Header";
import { label } from "@/constant/label";
import ViewJob from "@/components/ViewJob";
import Job from "@/components/Job";
import { getApplyStatus, APPLY_STATUS, INTERN_STATUS } from "@/constant/intern-status";
import { formattedDate } from "@/helpers/format";

import { JobService } from "@/services/job.service";
import { InternService } from "@/services/intern.service";
import { NOTIFICATION_TYPE } from "@/constant/notification-type";
import Link from "next/link";

const cx = classNames.bind(styles);

const AppliedJobItem = ({ data, openNotificationWithIcon, reload }) => {

    const handleAcceptIntern = () => {
        InternService
            .submitInternProgress({ id: data.id, is_interning: INTERN_STATUS.IN_PROGRESS.value })
            .then(() => {
                openNotificationWithIcon(
                    NOTIFICATION_TYPE.SUCCESS,
                    "Thông báo",
                    "Xác nhận làm việc thành công"
                );
                reload();
            })
            .catch((error) => {
                openNotificationWithIcon(
                    NOTIFICATION_TYPE.SUCCESS,
                    "Thất bại",
                    error
                );
            })
    }

    return (
        <div className={cx("job-item")}>
            <img src={data.job.business.user_person?.image} className={cx("job-img")}/>
            <div className={cx("job-desc")}>
                <h6 className={cx("job-label", "small")}>
                    {data.job.business.user_person.full_name}
                </h6>
                <div className={cx("d-flex align-items-center mt-2")}>
                    <h5 className={cx("job-label", "large")}>
                        {data.job.job_name}
                    </h5>
                    <h5 className={cx("job-label", "medium")}>
                        <FontAwesomeIcon icon={faUserGroup} style={{marginRight: 6}}/>
                        {data.job.vacancies}
                    </h5>
                </div>
                <div className={cx('mt-2')}>
                </div>
                <span className={cx('mt-2', 'todo-label')}>
                    Ngày ứng tuyển: { formattedDate(data.createdAt) }
                </span>
                <div className={cx('d-flex gap-2 align-items-end')}>
                    <span 
                        className={cx('sub-content', {
                            'success-status': data.apply_status === APPLY_STATUS.FINISHED.value || 
                                                data.apply_status === APPLY_STATUS.APPROVED.value,
                            'fail-status': data.apply_status === APPLY_STATUS.FAILED.value,
                            'applying-status': data.apply_status === APPLY_STATUS.APPLYING.value,
                            'interviewing-status': data.apply_status === APPLY_STATUS.INTERVIEWING.value,
                            'onboard-status': data.apply_status === APPLY_STATUS.ONBOARD.value,
                        }, 'mt-4'
                    )}>{ getApplyStatus(data.apply_status) } </span>
                    {
                        data.apply_status === APPLY_STATUS.APPROVED.value && (
                            <div 
                                className={cx('view-btn')}
                                onClick={handleAcceptIntern}
                            >Xác nhận</div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default function StudentLibrary() {
    const router = useRouter();
    const role = useSelector(state => state.role);

    const [isLoading, setIsLoading] = useState(true);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState({});
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, message, description) => {
        return api[type]({
          message,
          description,
        });
    };

    const getAppliedJob = () => {
        JobService
            .getAppliedJob()
            .then((res) => {
                setAppliedJobs(res.data);
                setIsLoading(false);
            })
    }
    
    useEffect(() => {
        getAppliedJob();
    }, []);

    return (
        <div className={cx('wrapper')}>
            { contextHolder }
            <Header title={'Thư viện'} icon={faBookmark}/>
            <div className={cx('intern-container')}>
                <h4 className={cx('category-heading')}>{label.library["applied-job"]}</h4>
                <div className={cx('intern-main')}>
                    {
                        isLoading ? (
                            <div className={'w-100 h-100 d-flex align-items-center justify-content-center'}>
                                <Spin size="small"/>
                            </div>
                        ) : (
                            <Row>
                                {
                                    appliedJobs.map((job, index) => (
                                        <Col key={index} xs={12} sm={12} md={6} lg={6} xl={4}>
                                          
                                            <AppliedJobItem 
                                                data={job} 
                                                key={index} 
                                                openNotificationWithIcon={openNotificationWithIcon}
                                                reload={getAppliedJob}
                                            />
                                        </Col>
                                    ))
                                }
                            </Row>
                            
                        )
                    }
                </div>
            </div>
            <div className={cx('intern-container')}>
                <h4 className={cx('category-heading')}>{label.library["stored-file"]}</h4>
                <div className={cx('intern-main')}>
                    {
                        isLoading ? (
                            <div className={'w-100 h-100 d-flex align-items-center justify-content-center'}>
                                <Spin size="small"/>
                            </div>
                        ) : (
                                <Row>
                                {
                                    appliedJobs.filter((v) => v.file_url).map((job, index) => (
                                        <Link href={job.file_url} key={index}>
                                            {job.file_url.split('/').pop()}
                                           </Link>
                                    ))
                                }
                            </Row>
                        )
                    }
                </div>
            </div>
            {
                Object.keys(selectedJob).length > 0 && (
                    <Modal
                        title={selectedJob.job_name}
                        centered
                        open={Object.keys(selectedJob).length > 0}
                        onOk={() => setSelectedJob({})}
                        onCancel={() => setSelectedJob({})}
                        width={800}
                        footer={[
                            <Button 
                                key="submit" 
                                size="medium" 
                                onClick={() => setSelectedJob({})}
                            >
                                Đóng
                            </Button>,
                        ]}
                    >
                        <ViewJob job={selectedJob}/>
                        
                    </Modal>
                )
            }
        </div>
    )
}