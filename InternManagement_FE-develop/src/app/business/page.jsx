'use client'
import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { faHome, faXmark } from "@fortawesome/free-solid-svg-icons";
import { Empty, Select, Skeleton, Spin, notification } from "antd";
import { useSelector } from "react-redux";

import CreateJob from "./create-job";

import { NOTIFICATION_TYPE } from "@/constant/notification-type";
import { label } from "@/constant/label";
import Header from "@/components/Header";
import Search from "@/components/Search";
import Job from "@/components/Job";

import { JobService } from "@/services/job.service";
import { GeneralService } from "@/services/general.service";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const cx = classNames.bind(styles);

const showLoadingItems = [1, 2, 3];

export default function BusinessHome() {
    const role = useSelector(state => state.role);

    const [profile, setProfile] = useState(null);
    const [jobs, setJobs] = useState([]);


    const [skills, setSkills] = useState([]);
    const [positions, setPositions] = useState([]);

    const [filterParams, setFilterParams] = useState({
        searchValue: '',
        workingPosition: null,
        skill: null,
        workingTime: '',
        workingSpace: '',
    })

    const [showCreateJob, setShowCreateJob] = useState(false);

    const [isLoading, setIsLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, message, description) => {
        return api[type]({
          message,
          description,
        });
    };

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

    const getProfile = () => {
        GeneralService
            .getProfile()
            .then((res) => setProfile(res.data.user?.business))
    }

    const getAllJobs = () => {
        setIsLoading(true);
        JobService
            .getJobs({ filterParams })
            .then((res) => {
                const _jobs = res.data.items.filter((item) => item.business_id === profile?.id);
                setJobs(_jobs);
                setIsLoading(false);
            })
    }

    useEffect(() => {
        getAllSkills();
        getAllPositions();
        getProfile();
    }, [showCreateJob]);

    useEffect(() => {
        if (profile) {
            getAllJobs();
        }
    }, [profile]);

    useEffect(() => {
        getAllJobs();
    }, [filterParams])

    return (
        <div className={cx('wrapper')}>
            { contextHolder }
            <Header title={'Trang chủ'} icon={faHome}/>
            <div className={cx('intern-container')}>
                <div className={cx('intern-main')}>
                {
                    showCreateJob ? (
                        <CreateJob setShow={setShowCreateJob}/>
                    ) : (
                        <React.Fragment>
                            <h4 className={cx('category-heading')}>{label.business["job-incruitment"]}</h4>
                            <div className={cx('d-flex flex-wrap mt-3 gap-4')}>
                                <div >
                                    <Search classList={['w-100']} 
                                        value={filterParams.searchValue}
                                        setValue={(value) => setFilterParams((prev) => ({ ...prev, searchValue: value }))}
                                    />
                                </div>
                                <button 
                                    className="view-btn"
                                    onClick={() => setShowCreateJob(true)}
                                >Thêm mới</button>
                            </div>
                            <div className={cx('row mt-2 mb-4 align-items-end')}>
                                <div className={cx('col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 mb-1')}>
                                    <div className={cx('w-100')}>
                                        <span className={cx('select-label')}>{label.jobs["position"]}</span>
                                        <Select
                                            className={cx('w-100')}
                                            placeholder={'Chọn vị trí'}
                                            options={positions}
                                            value={filterParams.workingPosition}
                                            onChange={(value) => setFilterParams((prev) => ({ ...prev, workingPosition: value }))}
                                        />
                                    </div>
                                </div>
                                <div className={cx('col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 mb-1')}>
                                    <div className={cx('w-100')}>
                                        <span className={cx('select-label')}>{label.jobs["skill"]}</span>
                                        <Select
                                            className={cx('w-100')}
                                            placeholder={'Chọn kỹ năng'}
                                            options={skills}
                                            value={filterParams.skill}
                                            onChange={(value) => setFilterParams((prev) => ({ ...prev, skill: value }))}
                                        />
                                    </div>
                                </div>
                                <div className={cx('col-xl-3 col-lg-3 col-md-6 col-sm-12 col-12 mb-1')}>
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
                                                            padding: '20px' 
                                                        }}
                                                    >
                                                        <Skeleton.Avatar active={true} shape="square" className={cx('mb-3')} />
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
                                        <div className={cx('row')}>
                                            {
                                                jobs.length > 0 ? jobs.map((job, index) => (
                                                    <div 
                                                        className={cx('col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12')} 
                                                        key={index}
                                                    >
                                                        <Job job={job} prevPage={'/business'} getAllJobs={getAllJobs}/>
                                                    </div>
                                                )) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                                            }
                                        </div>
                                    </React.Fragment>
                                )
                            }
                        </React.Fragment>
                    )
                }
                </div>
            </div>
        </div>
    )
}