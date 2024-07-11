'use client'
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from "./page..module.scss";
import { useRouter, useSearchParams } from "next/navigation";
import { 
    faBriefcase, 
    faCalendar, 
    faCheckCircle, 
    faClipboard, 
    faCloudArrowUp, 
    faMoneyBill1Wave, 
    faShareNodes, 
    faStar, 
    faUserCheck, 
    faXmark 
} from '@fortawesome/free-solid-svg-icons';
import { Modal, Spin, notification } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faMap, faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { useSelector } from 'react-redux';

import Header from "@/components/Header";
import { ROLE } from '@/constant/role';
import { WORK_SPACE, WORK_TYPE } from "@/constant/job";
import { UPLOAD_FILE_TYPE } from "@/constant/upload-file";
import { NOTIFICATION_TYPE } from '@/constant/notification-type';
import { formattedCurrency, formattedDate } from '@/helpers/format';

import { JobService } from '@/services/job.service';
import { GoogleService } from "@/services/google.service";
import { GeneralService } from '@/services/general.service';

const cx = classNames.bind(styles);

const ApplyContainer = ({ cvFile, setCVFile }) => {
    return (
        <div style={{marginTop: 30, marginLeft: 6, marginRight: 6}}>
            <div>
                <div className={cx("upload-container")}>
                    <FontAwesomeIcon icon={faCloudArrowUp} className={cx("i-upload")}/>
                    <span className={cx("upload-title")}>File CV</span>
                    <input 
                        type="file" 
                        id="teacher-file" 
                        onChange={(e) => setCVFile(e.target.files[0])}
                    />
                    <label htmlFor="teacher-file" className={cx("upload-label")}>Tải lên</label>
                </div>
                <div className={cx("d-flex flex-column mt-2 w-100")}>
                    <label 
                        className={cx("upload-link__label")} 
                        htmlFor="cv-file__link"
                    >
                        Liên kết đính kèm
                    </label>
                    <div className={cx("d-flex flex-wrap gap-2 mb-4")}>
                        <input 
                            type="text" 
                            id="cv-file__link" 
                            className={cx("upload-link")} 
                            disabled={true}
                            value={cvFile?.name || ""}
                        />
                        {
                            cvFile?.name && (
                                <button className={cx("view-btn", "error")} onClick={() => setCVFile(null)}>
                                    <FontAwesomeIcon 
                                        icon={faXmark} 
                                        size="lg" 
                                        style={{marginRight: 10}}
                                    />
                                    Gỡ bỏ
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function Job() {
    const role = useSelector(state => state.role);
    const searchParams = useSearchParams();
    const jobId = searchParams.get('jobId');
    const prevPage = searchParams.get('prevPage');

    const router = useRouter();

    const [job, setJob] = useState({});
    const [loading, setLoading] = useState(false);
    const [showedApplyModal, setShowedApplyModal] = useState(false);

    const [cvFile, setCVFile] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, message, description) => {
        return api[type]({
          message,
          description,
        });
    };

    const getData = () => {
        setLoading(true);
        getJobById();
        updateViewersForJob();
    }

    const getJobById = async () => {
        await JobService
            .getJobById(jobId)
            .then((res) => {
                setJob(res.data);
                if (role === ROLE.BUSINESS) {
                    setLoading(false);
                }
            })
    }

    const updateViewersForJob = async () => {
        if (role !== ROLE.BUSINESS) {
            await JobService
                .updateViewers(jobId)
                .then(()=> {
                    setLoading(false);
                })
        }
    }

    useEffect(() => {
        getData();
    }, [jobId])

    const onApplyNow = () => {
        if (!cvFile) {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.ERROR,
                "Thất bại",
                "Vui lòng đính kèm CV trước khi gửi hồ sơ"
            )
            return;
        }

        setIsPending(true);
        GoogleService
            .uploadFile(cvFile, UPLOAD_FILE_TYPE.DOCS)
            .then((cvLink) => {
                const cvData = {
                    job_id: job.id,
                    cv_file: cvLink
                }
                postCVData(cvData);
            })
            .catch((err) => {
                openNotificationWithIcon(
                    NOTIFICATION_TYPE.ERROR,
                    "Thất bại",
                    err
                )
            })
    }

    const postCVData = (data) => {
        JobService
            .applyJob(data)
            .then(() => {
                setIsPending(false);
                openNotificationWithIcon(
                    NOTIFICATION_TYPE.SUCCESS,
                    "Thành công",
                    "Bạn đã ứng tuyển công việc thành công"
                )
                setShowedApplyModal(false);
                getJobById();
            })
            .catch((err) => {
                openNotificationWithIcon(
                    NOTIFICATION_TYPE.ERROR,
                    "Thất bại",
                    err
                )
            })
    }
    
    return (
        <div className={cx('wrapper')}>
            { contextHolder }
            <Header title={'Chi tiết công việc'} icon={faClipboard}/>
            {
                loading ? (
                    <div className={cx('intern-container', 'filter', 'text-center')}>
                        <Spin size='small' />
                    </div>
                ) : (
                    <React.Fragment>
                        <div className={cx('intern-container', 'filter', 'mb-4')}>
                            <div className={cx('d-flex align-items-center mb-3')}>
                                <h4 className={cx('category-heading')}>{job?.job_name}</h4>
                                <FontAwesomeIcon className={cx('ms-2')} icon={faCheckCircle} size="lg" color="var(--blue-5-color)"/>
                            </div>

                            <div className={cx('row gap-4 mt-2 mb-2')}>
                                <div className={cx('col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12 d-flex align-items-center')}>
                                    <div 
                                        className={cx('d-flex align-items-center justify-content-center')}
                                        style={{ width: 50, height: 50, borderRadius: '50%', backgroundColor: 'var(--red-1-color)'}}
                                    >
                                        <FontAwesomeIcon icon={faMoneyBill1Wave} size="lg" color="var(--red-5-color)"/>
                                    </div>
                                    <div className={cx('ms-3')}>
                                        <span className={cx('job-name')}>Mức lương</span>
                                        <span className={cx('company-name')}>{formattedCurrency(Math.floor(job.salary))}</span>
                                    </div>
                                </div>
                                <div className={cx('col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12  d-flex align-items-center')}>
                                    <div 
                                        className={cx('d-flex align-items-center justify-content-center')}
                                        style={{ width: 50, height: 50, borderRadius: '50%', backgroundColor: 'var(--purple-1-color)'}}
                                    >
                                        <FontAwesomeIcon icon={faMap} size="lg" color="var(--purple-5-color)"/>
                                    </div>
                                    <div className={cx('ms-3')}>
                                        <span className={cx('job-name')}>Địa điểm</span>
                                        <span className={cx('company-name')}>{
                                            job?.business?.user_person.address.split(',').pop()
                                        }</span>
                                    </div>
                                </div>
                                <div className={cx('col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12  d-flex align-items-center')}>
                                    <div 
                                        className={cx('d-flex align-items-center justify-content-center')}
                                        style={{ width: 50, height: 50, borderRadius: '50%', backgroundColor: 'var(--orange-1-color)'}}
                                    >
                                        <FontAwesomeIcon icon={faBriefcase} size="lg" color="var(--orange-5-color)"/>
                                    </div>
                                    <div className={cx('ms-3')}>
                                        <span className={cx('job-name')}>Số năm kinh nghiệm</span>
                                        <span className={cx('company-name')}>{job.experience_years || 'Không yêu cầu'}</span>
                                    </div>
                                </div>
                                <div className={cx('col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12  d-flex align-items-center')}>
                                    <div 
                                        className={cx('d-flex align-items-center justify-content-center')}
                                        style={{ width: 50, height: 50, borderRadius: '50%', backgroundColor: 'var(--gold-1-color)'}}
                                    >
                                        <FontAwesomeIcon icon={faStar} size="lg" color="var(--gold-5-color)"/>
                                    </div>
                                    <div className={cx('ms-3')}>
                                        <span className={cx('job-name')}>Đánh giá công việc</span>
                                        <span className={cx('company-name')}>{job.average_rate || 0}/5</span>
                                    </div>
                                </div>
                                <div className={cx('col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12  d-flex align-items-center')}>
                                    <div 
                                        className={cx('d-flex align-items-center justify-content-center')}
                                        style={{ width: 50, height: 50, borderRadius: '50%', backgroundColor: 'var(--green-1-color)'}}
                                    >
                                        <FontAwesomeIcon icon={faUserCheck} size="lg" color="var(--green-5-color)"/>
                                    </div>
                                    <div className={cx('ms-3')}>
                                        <span className={cx('job-name')}>Số lượng ứng viên</span>
                                        <span className={cx('company-name')}>{job?.count_apply}</span>
                                    </div>
                                </div>
                                <div className={cx('col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12  d-flex align-items-center')}>
                                    <div 
                                        className={cx('d-flex align-items-center justify-content-center')}
                                        style={{ width: 50, height: 50, borderRadius: '50%', backgroundColor: 'var(--magenta-1-color)'}}
                                    >
                                        <FontAwesomeIcon icon={faCalendar} size="lg" color="var(--magenta-5-color)"/>
                                    </div>
                                    <div className={cx('ms-3')}>
                                        <span className={cx('job-name')}>Ngày hết hạn</span>
                                        <span className={cx('company-name')}>{formattedDate(job.expire_date)}</span>
                                    </div>
                                </div>
                            </div>

                            {
                                role === ROLE.STUDENT && (
                                    <div className={cx('d-flex justify-content-end mt-3 gap-3')}>
                                        <button className={cx('view-btn')}>
                                            <FontAwesomeIcon icon={faShareNodes} size='sm' style={{ marginRight: 8 }}/>
                                            Chia sẻ
                                        </button>
                                        {
                                            !job?.isApplied && (
                                                <button className={cx('view-btn', 'optional')} onClick={() => setShowedApplyModal(true)}>
                                                    <FontAwesomeIcon icon={faPaperPlane} size='sm' style={{ marginRight: 8 }}/>
                                                    Ứng tuyển ngay
                                                </button>
                                            ) 
                                        }
                                    </div>
                                )
                            }
                        </div>

                        <div className={cx('intern-container')}>
                            <div className={cx('intern-main')}>
                                <h4 className={cx('category-heading', 'important')}>Chi tiết công việc</h4>
                                <div className={cx('row')}>
                                    <div className={cx('col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12')}>
                                        <div className={cx('mt-4')}>
                                            <span className={cx('job-name')}>Mô tả công việc</span>
                                            <p className={cx('sub-heading', 'content', 'mt-1')}>{job.job_desc}</p>
                                        </div>
                                        <div className={cx('mt-4')}>
                                            <span className={cx('job-name')}>Yêu cầu công việc</span>
                                            <p className={cx('sub-heading', 'content', 'mt-1')}>{job.requirements}</p>
                                        </div>
                                        <div className={cx('mt-4')}>
                                            <span className={cx('job-name')}>Trình độ yêu cầu</span>
                                            <p className={cx('sub-heading', 'content', 'mt-1')}>{job.level?.name}</p>
                                        </div>
                                        <div className={cx('mt-4')}>
                                            <span className={cx('job-name')}>Thông tin khác</span>
                                            <p className={cx('sub-heading', 'content', 'mt-1')}>{job.another_information}</p>
                                        </div>
                                    </div>
                                    <div className={cx('col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12')}>
                                        <div className={cx('mt-4')}>
                                            <span className={cx('job-name')}>Địa điểm làm việc</span>
                                            <p className={cx('sub-heading', 'content', 'mt-1')}>{job.business?.user_person.address}</p>
                                        </div>
                                        <div className={cx('mt-4')}>
                                            <span className={cx('job-name')}>Thời gian làm việc</span>
                                            <p className={cx('sub-heading', 'content', 'mt-1')}>{WORK_TYPE[job.work_type]?.label}</p>
                                        </div>
                                        <div className={cx('mt-4')}>
                                            <span className={cx('job-name')}>Hình thức làm việc</span>
                                            <p className={cx('sub-heading', 'content', 'mt-1')}>{WORK_SPACE[job.work_space]?.label}</p>
                                        </div>
                                        <div className={cx('mt-4')}>
                                            <span className={cx('job-name')}>Kỹ năng yêu cầu</span>
                                            <div className={cx('d-flex flex-wrap gap-4')}>
                                            {
                                                job.jobSkills?.map((_skill, index) => (
                                                    <span 
                                                        key={index} 
                                                        className={cx('sub-heading', 'content', 'd-block')}
                                                    >{_skill.skill.skill_name}</span>
                                                ))
                                            }
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                                <div className={cx('d-flex justify-content-end gap-3 mt-3')}>
                                    <button 
                                        className={cx("view-btn warn")} 
                                        onClick={() => router.push(prevPage)}
                                    >
                                        Quay lại
                                    </button>
                                    {
                                        role === ROLE.STUDENT && (
                                            <button 
                                                className={cx("view-btn")} 
                                                onClick={() => {}}
                                            >
                                                Thêm vào thư viện
                                            </button>
                                        )
                                    }
                                </div>              
                            </div>
                        </div>
                    </React.Fragment>
                )
            }
            <Modal
                title="Thông tin ứng tuyển"
                closeIcon={null}
                centered
                open={showedApplyModal}
                onCancel={() => {
                    setShowedApplyModal(false);
                }}
                width={800}
                footer={[
                    <div className={cx('d-flex justify-content-end gap-1')}>
                        <button className={cx('view-btn')} onClick={onApplyNow}>
                            { isPending && <Spin size='small' style={{ marginRight: 8 }}/> }
                            Gửi hồ sơ
                        </button>,
                        <button className={cx('view-btn', 'cancel')} onClick={() => setShowResetPassword(false)}>Đóng</button>
                    </div>
                ]}
            >
                <ApplyContainer job={job} cvFile={cvFile} setCVFile={setCVFile}/>
            </Modal>
        </div>
    )
}