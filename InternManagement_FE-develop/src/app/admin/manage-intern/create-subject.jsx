import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from "./page.module.scss";
import { Input, Select, DatePicker } from 'antd';

import { GeneralService } from '@/services/general.service';
import { TeacherService } from '@/services/teacher.service';
import dayjs from 'dayjs';

const cx = classNames.bind(styles);

export default function CreateSubject({ schoolId, currentSubject, setSubject, setDepartment }) {
    const [academicYears, setAcademicYears] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [teachers, setTeachers] = useState([]);

    const getAllAcademicYears = () => {
        GeneralService
            .getAcademicYears(schoolId)
            .then((res) => {
                const _years = [];
                res.data.items.forEach((year) => {
                    _years.push({
                        value: year.id,
                        label: year.current_year,
                    })
                })
                setAcademicYears(_years.sort((a, b) => a.label - b.label));
            })
    }

    const getAllSemesters = () => {
        GeneralService
            .getAllSemesters(schoolId)
            .then((res) => {
                const _semesters = [];
                res.data.forEach((semester) => {
                    _semesters.push({
                        value: semester.id,
                        label: semester.semester_name
                    })
                })
                setSemesters(_semesters);
            })
    }

    const getAllTeachers = () => {
        TeacherService
            .getAllTeachers()
            .then((res) => {
                const _teachers = [];
                res.data.data.forEach((item) => {
                    _teachers.push({
                        label: item.full_name,
                        value: item.teacher.id,
                        departmentId: item.teacher.department_id
                    })
                })
                setTeachers(_teachers);
            })
    }

    useEffect(() => {
        if (schoolId) {
            getAllAcademicYears();
            getAllSemesters();
            getAllTeachers();
        }
    }, [schoolId])

    return (
        <div className={cx("row")}>
            <div className={cx("col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12 mb-3")}>
                <p className={cx("todo-label")}>Mã môn học</p>   
                <Input value={currentSubject?.id || null} readOnly={true} disabled/>
            </div>
            <div className={cx("col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12 mb-3")}>
                <p className={cx("todo-label", "required")}>Tên môn học</p>   
                <Input value={currentSubject?.name} readOnly/>
            </div>
            <div className={cx("col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12 mb-3")}>
                <p className={cx("todo-label", "required")}>Số tín chỉ</p>   
                <Input 
                    min={1} 
                    type='number' 
                    className={cx('remove-appearance')}
                    value={currentSubject?.unit}
                    onChange={(e) => setSubject((prev) => ({ ...prev, unit: parseInt(e.target.value)}))}
                />
            </div>
            <div className={cx("col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12 mb-3")}>
                <p className={cx("todo-label", "required")}>Số buổi học</p>   
                <Input 
                    min={1} 
                    type='number' 
                    className={cx('remove-appearance')}
                    value={currentSubject?.sessions}
                    onChange={(e) => setSubject((prev) => ({ ...prev, sessions: parseInt(e.target.value)}))}
                />
            </div>
            <div className={cx("col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12 mb-3")}>
                <p className={cx("todo-label", "required")}>Số lượng sinh viên</p>   
                <Input 
                    min={1} 
                    type='number' 
                    className={cx('remove-appearance')}
                    value={currentSubject?.max_students}
                    onChange={(e) => setSubject((prev) => ({ ...prev, max_students: parseInt(e.target.value)}))}
                />
            </div>
            <div className={cx("col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12 mb-3")}>
                <p className={cx("todo-label", "required")}>Giảng viên hướng dẫn</p>   
                <Select 
                    className={cx('w-100')}
                    options={teachers}
                    value={currentSubject?.teacher_id}
                    onChange={(value) => {
                        const departmentId = teachers.filter((item) => item.value === value)[0].departmentId;
                        setSubject((prev) => ({ ...prev, teacher_id: value}));
                        setDepartment(departmentId);
                    }}
                />
            </div>
            <div className={cx("col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12 mb-3")}>
                <p className={cx("todo-label", "required")}>Năm học</p>   
                <Select 
                    className={cx('w-100')}
                    options={academicYears}
                    value={currentSubject?.academic_year}
                    onChange={(value) => setSubject((prev) => ({ ...prev, academic_year: value}))}
                />
            </div>
            <div className={cx("col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12 mb-3")}>
                <p className={cx("todo-label", "required")}>Học kỳ</p>   
                <Select 
                    className={cx('w-100')}
                    options={semesters}
                    value={currentSubject?.semester_id}
                    onChange={(value) => setSubject((prev) => ({ ...prev, semester_id: value}))}
                />
            </div>
            <div className={cx("col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12 mb-3")}>
                <p className={cx("todo-label", "required")}>Ngày bắt đầu</p>   
                <DatePicker 
                    className={cx('w-100')} 
                    placeholder='Chọn ngày' 
                    format={'DD-MM-YYYY'}
                    value={dayjs(currentSubject?.start_date)}
                    onChange={(date) => setSubject((prev) => ({ ...prev, start_date: date}))}
                />
            </div>
            <div className={cx("col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12 mb-3")}>
                <p className={cx("todo-label", "required")}>Ngày kết thúc</p>   
                <DatePicker 
                    className={cx('w-100')} 
                    placeholder='Chọn ngày' 
                    format={'DD-MM-YYYY'}
                    value={dayjs(currentSubject?.end_date)}
                    onChange={(date) => setSubject((prev) => ({ ...prev, end_date: date}))}
                />
            </div>
            <div className={cx("col-xl-3 col-lg-4 col-md-6 col-sm-12 col-xs-12 mb-3")}>
                <p className={cx("todo-label", "required")}>Trạng thái môn học</p>   
                <Select className={cx('w-100')}/>
            </div>
        </div>
    )
}