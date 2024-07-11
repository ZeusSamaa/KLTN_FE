'use client'
import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal, Pagination, Skeleton, Spin } from "antd";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import { faArrowTrendUp, faCaretDown, faCaretUp, faStar } from "@fortawesome/free-solid-svg-icons";

import { JobService } from "@/services/job.service";
import Header from "@/components/Header";
import ViewJob from "@/components/ViewJob";
import Job from "@/components/Job";
import Search from "@/components/Search";

const cx = classNames.bind(styles);

const showLoadingItems = [1, 2, 3];

export default function JobTrending() {

    const [loading, setLoading] = useState(true);

    const [jobs, setJobs] = useState([]);
    
    const [trendingJobs, setTrendingJobs] = useState([]);
    const [recommendJobs, setRecommendJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState({});

    const getTrendingJobs = () => { 
        JobService
            .getTrendingJobs()
            .then((res) => {
                setTrendingJobs(res.data.items);
            })
    }

    const getRecommendingJobs = () => { 
        JobService
            .getRecommendingJobs()
            .then((res) => {
                setRecommendJobs(res.data.items);
                setLoading(false);
            })
    }

    const getData = () => {
        getTrendingJobs();
        getRecommendingJobs();
    }

    useEffect(() => {
        getData();
    }, [])
    
    return (
        <div className={cx('wrapper')}>
            <Header title={'Xu hướng'} icon={faArrowTrendUp}/>
            <div className={cx('contact-container')}>
                <h4 className={cx('category-heading')}>
                    Công việc xu hướng
                </h4>
                <Search />
                <div className={cx('job-list row mt-3')}>
                    {
                        loading ? (
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
                                {
                                    trendingJobs.map((job, index) => (
                                        <div key={index} className={cx('col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12')}>
                                            <Job 
                                                job={job} 
                                                setSelectedJob={setSelectedJob} 
                                                prevPage={'/student/job-trending'} 
                                                getAllJobs={getData}
                                            />
                                        </div>
                                    ))
                                }
                                
                            </React.Fragment>
                        )
                    }
                </div>
            </div>
            <div className={cx('contact-container')}>
                <h4 className={cx('category-heading')}>
                    Gợi ý công việc
                </h4>
                <div className={cx('job-list row mt-3')}>
                    {
                        loading ? (
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
                                {
                                    recommendJobs.map((job, index) => (
                                        <div key={index} className={cx('col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12')}>
                                            <Job 
                                                job={job} 
                                                setSelectedJob={setSelectedJob} 
                                                prevPage={'/student/job-trending'} 
                                                getAllJobs={getData}
                                            />
                                        </div>
                                    ))
                                }
                                
                            </React.Fragment>
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