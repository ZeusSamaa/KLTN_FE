'use client'
import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { faHome, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Col, Row } from "react-bootstrap";
import { Button, Empty, Modal, Pagination, Select, Skeleton, Spin, notification } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { ROLE } from "@/constant/role";
import { handleNavigate } from "@/utils/navigate";

import Header from '@/components/Header';
import ViewJob from '@/components/ViewJob';
import { label } from '@/constant/label';
import { WORK_SPACE as SPACE, WORK_TYPE as TYPE} from '@/constant/job';

// Service
import { JobService } from '@/services/job.service';
import Job from "@/components/Job";
import Search from "@/components/Search"
import { NOTIFICATION_TYPE } from "@/constant/notification-type";

const cx = classNames.bind(styles);

const workingTime = [ 
    { ...TYPE.PART_TIME },
    { ...TYPE.FULL_TIME }
];

const workingSpace = [ 
    { ...SPACE.ONLINE },
    { ...SPACE.OFFLINE },
    { ...SPACE.HYBRID },
];

const showLoadingItems = [1, 2, 3];

export default function StudentHome() {
    const [isLoading, setIsLoading] = useState(false);

    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState({});
    const [skills, setSkills] = useState([]);
    const [positions, setPositions] = useState([]);

    const [filterParams, setFilterParams] = useState({
        searchValue: '',
        workingPosition: null,
        skill: null,
        workingTime: '',
        workingSpace: '',
    })
    
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, message, description) => {
        return api[type]({
          message,
          description,
        });
    };

    const getJobs = () => {
        setIsLoading(true);
        JobService
            .getJobs({ filterParams })
            .then((res) => {
                setJobs(res.data.items);
                setIsLoading(false);
            })
    }

    const getAllSkills = () => {
        JobService
        .getAllSkills()
        .then((res) => {
            const _skills = [];
            res.data.forEach((skill) => {
                _skills.push({
                    value: skill.id,
                    label: skill.skill_name,
                })
            })
            setSkills(_skills);
        })
        .catch((err) => {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.ERROR,
                "Thất bại",
                err,
            );
        })
    }

    const getAllPositions = () => {
        JobService
        .getAllPositions()
        .then((res) => {
            const _positions = [];
            res.data.forEach((position) => {
                _positions.push({
                    value: position.id,
                    label: position.position_name,
                })
            })
            setPositions(_positions);
        })
        .catch((err) => {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.ERROR,
                "Thất bại",
                err,
            );
        })
    }

    useEffect(() => {
        getAllSkills();
        getAllPositions();
        getJobs();
    }, []);

    useEffect(() => {
        if (skills && positions) {
            getJobs();
        }
    }, [filterParams])

    return (
        <React.Fragment>
            {
                <div className={cx('wrapper')}>
                    { contextHolder }
                    <Header title={'Trang chủ'} icon={faHome}/>
                    <div className={cx('intern-container', 'search-filter')}>
                        <div className={cx('intern-main')}>
                            <h4 className={cx('category-heading')}>{label.home["filter-heading"]}</h4>
                            <Search 
                                classList={['mt-4']} 
                                value={filterParams.searchValue} 
                                setValue={(value) => setFilterParams((prev) => ({ ...prev, searchValue: value }))}
                            />
                            <div className={cx('d-flex flex-wrap align-items-end gap-3 mt-1 mb-3')}>
                                <div className={cx('col-xl-2 col-lg-3 col-md-4 col-12 mt-2')}>
                                    <div className={cx('select-item')}>
                                        <span className={cx('select-label')}>{label.jobs["position"]}</span>
                                        <Select
                                            className={cx('w-100')}
                                            style={{ width: 150 }}
                                            placeholder={'Chọn vị trí'}
                                            options={positions}
                                            value={filterParams.workingPosition}
                                            onChange={(value) => setFilterParams((prev) => ({ ...prev, workingPosition: value }))}
                                        />
                                    </div>
                                </div>
                                <div className={cx('col-xl-2 col-lg-3 col-md-4 col-12 mt-2')}>
                                    <div className={cx('select-item')}>
                                        <span className={cx('select-label')}>{label.jobs["skill"]}</span>
                                        <Select
                                            className={cx('w-100')}
                                            style={{ width: 150 }}
                                            placeholder={'Chọn kỹ năng'}
                                            options={skills}
                                            value={filterParams.skill}
                                            onChange={(value) => setFilterParams((prev) => ({ ...prev, skill: value }))}
                                        />
                                    </div>
                                </div>
                                <div className={cx('col-xl-2 col-lg-3 col-md-4 col-12 mt-2')}>
                                    <div className={cx('select-item')}>
                                        <span className={cx('select-label')}>{label.jobs["workingTime"]}</span>
                                        <Select
                                            className={cx('w-100')}
                                            style={{ width: 150 }}
                                            placeholder={'Chọn thời gian làm việc'}
                                            value={filterParams.workingTime}
                                            options={workingTime}
                                            onChange={(value) => setFilterParams((prev) => ({ ...prev, workingTime: value }))}
                                        />
                                    </div>
                                </div>
                                <div className={cx('col-xl-2 col-lg-3 col-md-4 col-12 mt-2')}>
                                    <div className={cx('select-item')}>
                                        <span className={cx('select-label')}>{label.jobs["workspace"]}</span>
                                        <Select
                                            className={cx('w-100')}
                                            style={{ width: 150 }}
                                            placeholder={'Chọn hình thức làm việc'}
                                            value={filterParams.workingSpace}
                                            options={workingSpace}
                                            onChange={(value) => setFilterParams((prev) => ({ ...prev, workingSpace: value }))}
                                        />
                                    </div>
                                </div>

                                <button 
                                    className={cx('view-btn', 'warn')}
                                    onClick={() => setFilterParams({
                                        searchValue: '',
                                        workingPosition: null,
                                        skill: null,
                                        workingTime: '',
                                        workingSpace: '',
                                    })}
                                >
                                    <FontAwesomeIcon icon={faXmark} size="sm" style={{ marginRight: 8 }}/>
                                    Làm mới
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={cx('intern-container')}>
                        {
                            isLoading ? (
                                <div className={'row'}>
                                    {
                                        showLoadingItems.map((item) => (
                                            <div 
                                                className={cx('col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12')} 
                                                key={item}
                                            >
                                                <div 
                                                    style={{ 
                                                        boxShadow: 'var(--primary-box-shadow)',
                                                        backgroundColor: 'var(--white-color)',
                                                        borderRadius: 'var(--box-radius)',
                                                        padding: '20px' 
                                                    }}
                                                >
                                                    <Skeleton.Avatar 
                                                        active={true} 
                                                        shape="square" 
                                                        className={cx('mb-3')} 
                                                    />
                                                    <Skeleton.Button 
                                                        active={true} 
                                                        block={true}
                                                        shape="square"
                                                        size="large"
                                                        style={{ height: '150px' }}
                                                    />
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            ) : (
                                <React.Fragment>
                                    <Row>
                                        {
                                            jobs.length > 0 ? jobs.map((job, index) => (
                                                <Col key={index} xs={12} md={6} lg={6} xl={4}>
                                                    <Job job={job} setSelectedJob={setSelectedJob} prevPage={'/student'} getAllJobs={getJobs}/>
                                                </Col>
                                            )) : (
                                                <div className={cx('intern-main', 'no-data')}>
                                                    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} /> 
                                                </div>
                                            )
                                        }
                                    </Row>
                                </React.Fragment>
                            )
                        }
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
            }
        </React.Fragment>
    )
}