import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { DatePicker, Input, Select, Spin, notification } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";

import { label } from "@/constant/label";
import { WORK_SPACE as SPACE, WORK_TYPE as TYPE } from "@/constant/job";
import { NOTIFICATION_TYPE } from "@/constant/notification-type";

import CustomModal from "@/components/Modal";

import { JobService } from "@/services/job.service";

const cx = classNames.bind(styles);
const { TextArea } = Input;

const WORK_SPACE = [
    { label: 'Chọn hình thức', value: null },
    { ...SPACE.ONLINE },
    { ...SPACE.OFFLINE },
    { ...SPACE.HYBRID },
];

const WORK_TYPE = [
    { label: 'Chọn thời gian', value: null },
    { ...TYPE.PART_TIME },
    { ...TYPE.FULL_TIME }
];

export default function CreateJob({ setShow }) {
    const INIT_JOB_DATA = {
        id: null,
        job_name: '',
        job_desc: '',
        requirements: '',
        another_information: '',
        vacancies: null,
        position_id: null,
        experience_years: null,
        expire_date: dayjs(),
        work_space: '',
        work_type: '',
        salary: null,
        skillIds: [],
        position_id: null,
    }
    const [job, setJob] = useState(INIT_JOB_DATA);
    const [skills, setSkills] = useState([]);
    const [positions, setPositions] = useState([]);

    const [showAddSkill, setShowAddSkill] = useState(false);
    const [showAddWorkingPosition, setShowAddWorkingPosition] = useState(false);

    const [newSkill, setNewSkill] = useState('');
    const [newPosition, setNewPosition] = useState('');

    const [isPending, setIsPending] = useState(false);
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

    useEffect(() => {
        getAllSkills();
        getAllPositions();
    }, []);

    const onSaveSkill = () => {
        if (newSkill.trim().length === 0) {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.ERROR,
                "Thất bại",
                "Vui lòng nhập đủ thông tin",
            );
            return;
        }

        JobService
        .postSkill({ skill_name: newSkill.trim() })
        .then(() => {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.SUCCESS,
                "Thành công",
                "Thêm mới kỹ năng thành công",
            );
            setNewSkill('');
            getAllSkills();
        })
    }

    const onSavePosition = () => {
        if (newPosition.trim().length === 0) {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.ERROR,
                "Thất bại",
                "Vui lòng nhập đủ thông tin",
            );
            return;
        }

        JobService
        .postPosition({ position_name: newPosition.trim() })
        .then(() => {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.SUCCESS,
                "Thành công",
                "Thêm mới vị trí thành công",
            );
            setNewPosition('');
            getAllPositions();
        })
    }
    
    const saveJob = () => {

        JobService
        .postJob(job)
        .then(() => {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.SUCCESS,
                "Thành công",
                "Thêm mới công việc thành công",
            );
            setJob(INIT_JOB_DATA);
            setIsPending(false);
        })
        .catch((error) => {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.ERROR,
                "Thất bại",
                error,
            );
        })

    }
    
    const onCreateJob = () => {
        const isFullFields = Object.keys(job).every(key => {
            if (key === 'id' || key === 'another_information') {
                return true;
            }
            if (
                job[key] === null || 
                (typeof job[key] === 'string' && job[key]?.trim().length === 0) || 
                (key === 'skillIds' && job[key].length === 0)
            ) {
                return false;
            }
            return true;
        })

        if (!isFullFields) {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.ERROR,
                "Thất bại",
                "Vui lòng nhập đủ thông tin công việc",
            );
            return;
        }

        if (job.salary < 0) {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.ERROR,
                "Thất bại",
                "Vui lòng kiểm tra giá trị 'Lương'",
            );
            return;
        }

        if (job.experience_years < 0) {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.ERROR,
                "Thất bại",
                "Vui lòng kiểm tra giá trị 'Số năm kinh nghiệm'",
            );
            return;
        }

        if (job.vacancies < 0) {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.ERROR,
                "Thất bại",
                "Vui lòng kiểm tra giá trị 'Số lượng tuyển'",
            );
            return;
        }

        setIsPending(true);

        if (!job.id) {
            delete job.id;
        }

        saveJob();
    }

    return (
        <React.Fragment>
            { contextHolder }
            <h4 className={cx('category-heading')}>{label.business["create-job"]}</h4>
            <div className={cx('row mt-4')}>
                <div className={cx("col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                    <p className={cx("todo-label", "required")}>Tên công việc</p>   
                    <Input 
                        maxLength={50}
                        value={job.job_name}
                        onChange={(e) => setJob((prev) => ({...prev, job_name: e.target.value}))}
                    />
                </div>
                <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                    <p className={cx("todo-label", "required")}>Ngày hết hạn</p>   
                    <DatePicker 
                        className={cx('w-100')} 
                        value={job.expire_date || ''}
                        onChange={(date) => setJob((prev) => ({...prev, expire_date: date}))}
                        placeholder="Chọn ngày"
                        format={'DD-MM-YYYY'}
                    />
                </div>
                <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                    <p className={cx("todo-label", "required")}>Lương</p>   
                    <Input 
                        type="number"
                        maxLength={100}
                        min={0}
                        value={job.salary}
                        onChange={(e) => setJob((prev) => ({...prev, salary: parseInt(e.target.value)}))}
                    />
                </div>
                <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                    <p className={cx("todo-label", "required")}>Số năm kinh nghiệm</p>   
                    <Input 
                        type="number"
                        maxLength={100}
                        value={job.experience_years}
                        onChange={(e) => setJob((prev) => ({...prev, experience_years: parseInt(e.target.value)}))}
                    />
                </div>
                <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                    <p className={cx("todo-label", "required")}>Hình thức làm việc</p>   
                    <Select
                        className={cx('w-100')}
                        value={job.work_space}
                        style={{ width: 150 }}
                        options={WORK_SPACE}
                        onChange={(value) => setJob((prev) => ({ ...prev, work_space: value }))}
                    />
                </div>
                <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                    <div className={cx('flex')}>
                        <div style={{ flex: 1 }}>
                            <p className={cx("todo-label", "required")}>Kỹ năng</p>   
                            <Select
                                mode="multiple"
                                className={cx('w-100')}
                                style={{ width: '100%' }}
                                options={skills}
                                value={job.skillIds}
                                onChange={(value) => setJob((prev) => ({ ...prev, skillIds: value }))}
                            />
                        </div>
                        <button className={cx('view-btn', 'mt-2')} onClick={() => setShowAddSkill(true)}>
                            <FontAwesomeIcon icon={faPlus} style={{ marginRight: 8 }}/>
                            Thêm kỹ năng
                        </button>
                    </div>
                </div>
                <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                <div className={cx('flex')}>
                        <div style={{ flex: 1 }}>
                            <p className={cx("todo-label", "required")}>Vị trí công việc</p>   
                            <Select
                                className={cx('w-100')}
                                style={{ width: '100%' }}
                                options={positions}
                                value={job.position_id}
                                onChange={(value) => setJob((prev) => ({ ...prev, position_id: value }))}
                            />
                        </div>
                        <button className={cx('view-btn', 'mt-2')} onClick={() => setShowAddWorkingPosition(true)}>
                            <FontAwesomeIcon icon={faPlus} style={{ marginRight: 8 }}/>
                            Thêm vị trí
                        </button>
                    </div>
                </div>
                <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                    <p className={cx("todo-label", "required")}>Thời gian làm việc</p>   
                    <Select
                        className={cx('w-100')}
                        value={job.work_type}
                        style={{ width: 150 }}
                        options={WORK_TYPE}
                        onChange={(value) => setJob((prev) => ({ ...prev, work_type: value }))}
                    />
                </div>
                <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                    <p className={cx("todo-label", "required")}>Số lượng tuyển</p>   
                    <Input 
                        type="number"
                        maxLength={100}
                        value={job.vacancies}
                        onChange={(e) => setJob((prev) => ({...prev, vacancies: parseInt(e.target.value)}))}
                    />
                </div>
                <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                    <p className={cx("todo-label", "required")}>Mô tả công việc</p>   
                    <TextArea
                        showCount
                        maxLength={500}
                        onChange={(e) => setJob((prev) => ({...prev, job_desc: e.target.value}))}
                        style={{
                            height: 120,
                            resize: 'none',
                        }}
                        value={job.job_desc}
                    />
                </div>
                <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                    <p className={cx("todo-label", "required")}>Yêu cầu công việc</p>   
                    <TextArea
                        showCount
                        maxLength={500}
                        onChange={(e) => setJob((prev) => ({...prev, requirements: e.target.value}))}
                        style={{
                            height: 120,
                            resize: 'none',
                        }}
                        value={job.requirements}
                    />
                </div>
                <div className={cx("col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                    <p className={cx("todo-label")}>Thông tin khác</p>   
                    <TextArea
                        showCount
                        maxLength={500}
                        onChange={(e) => setJob((prev) => ({...prev, another_information: e.target.value}))}
                        style={{
                            height: 120,
                            resize: 'none',
                        }}
                        value={job.another_information}
                    />
                </div>
                
            </div>

            <div className={cx('d-flex justify-content-end gap-3 mt-3')}>
                <button 
                    className={cx("view-btn warn")} 
                    onClick={() => {
                        setShow(false);
                    }}
                >
                    Quay lại
                </button>
                <button 
                    className={cx("view-btn")} 
                    onClick={() => onCreateJob()}
                >
                    { isPending && <Spin size="small" style={{ marginRight: 8 }}/> }
                    Tạo mới
                </button>
            </div>

            {
                showAddSkill && (
                    <CustomModal 
                        heading={'Thêm mới kỹ năng'}
                        saveButtonLabel={job.id ? 'Lưu thay đổi' : 'Thêm mới'}
                        onSave={() => onSaveSkill()}
                        onHide={() => setShowAddSkill(false)}
                    >
                        <p className={cx("todo-label")}>Tên kỹ năng</p>
                        <Input 
                            className={cx("todo-content")} 
                            placeholder="Kỹ năng" 
                            value={newSkill}
                            onChange={e => setNewSkill(e.target.value)}
                        />
                    </CustomModal>
                )
            }

            {
                showAddWorkingPosition && (
                    <CustomModal 
                        heading={'Thêm mới vị trí công việc'}
                        saveButtonLabel={job.id ? 'Lưu thay đổi' : 'Thêm mới'}
                        onSave={() => onSavePosition()}
                        onHide={() => setShowAddWorkingPosition(false)}
                    >
                        <p className={cx("todo-label")}>Tên vị trí</p>
                        <Input 
                            className={cx("todo-content")} 
                            placeholder="Vị trí" 
                            value={newPosition}
                            onChange={e => setNewPosition(e.target.value)}
                        />
                    </CustomModal>
                )
            }
        </React.Fragment>
    )
}