'use client'
import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { faFileImport, faFilePdf, faPeopleRoof, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Input, Select, Table, notification } from "antd";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Header from "@/components/Header";
import ButtonBack from "@/components/ButtonBack";
import CustomModal from "@/components/Modal";
import { IClass } from "@/modals/class";
import { CLASS_COLUMNS } from "@/constant/column-data";
import { label } from "@/constant/label";

import { GeneralService } from "@/services/general.service";
import { TeacherService } from "@/services/teacher.service";

const cx = classNames.bind(styles);

function ClassModal(props) {
    const { _class, onHide, onRender, schoolId } = props;

    const [className, setClassName] = useState(_class?.name || '');
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState(_class?.department_id || null)
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(_class?.head_teacher || null);
    const [academicYear, setAcademicYear] = useState(null);

    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, message, description) => {
        return api[type]({
          message,
          description,
        });
    };

    const getAcademicYears = async () => {
        await GeneralService
        .getAcademicYears()
        .then((res) => setAcademicYear(res.data[res.data.length - 1].id))
    }

    const getAllDepartments = async () => {
        await GeneralService
        .getAllDepartments(schoolId)
        .then((res) => {
            const data = res.data;
            let _departments = [];
            data.forEach((item) => {
                _departments.push({
                    value: item.id,
                    label: item.department_name
                })
            })
            setDepartments(_departments);
        })
    }

    const getAllTeachers = async () => {
        await TeacherService
        .getAllTeachers()
        .then((res) => {
            const resData = res.data;
            let _teachers = [];
            resData.data.forEach((item) => {
                if (item.teacher.department_id === selectedDepartment) {
                    _teachers.push({
                        value: item.teacher.id,
                        label: item.full_name
                    })
                }
            })
            setTeachers(_teachers);
        })
    }

    useEffect(() => {
        getAcademicYears();
        getAllDepartments();
    }, [])

    useEffect(() => {
        if (selectedDepartment) {
            getAllTeachers();
        }
    }, [selectedDepartment])

    const onPostClass = () => {
        if (className.trim() === '' || selectedDepartment === null || selectedTeacher === null) { 
            openNotificationWithIcon('error', 'Thất bại', 'Vui lòng nhập đầy đủ thông tin');
        } else {
            let type = 'create';
            let body = {
                class_name: className,
                head_teacher: selectedTeacher,
                academic_year: academicYear
            }

            if (_class?.id) {
                type = 'update';
                body.id = _class.id;
            }

            GeneralService
            .postClass(body, schoolId, selectedDepartment, type)
            .then(() => {
                onRender();
                onHide();
            })
        }
    }

    return (
        <CustomModal 
            heading="Thông tin lớp"
            onHide={onHide}
            onSave={onPostClass}
            saveButtonLabel={_class.id ? 'Lưu thay đổi' : 'Thêm mới'}
        >
            { contextHolder }
            <div className={cx('mt-4')}>
                <p className={cx("todo-label")}>Tên lớp</p>
                <Input 
                    className={cx("todo-content")} 
                    placeholder="Lớp" 
                    value={className}
                    onChange={e => setClassName(e.target.value)}
                />
            </div>
            <div  className={cx('mt-4')}>
                <p className={cx("todo-label")}>Khoa</p>
                <Select 
                    options={departments}
                    className={cx("todo-content")} 
                    placeholder="Khoa" 
                    value={selectedDepartment}
                    onChange={value => setSelectedDepartment(value)}
                />
            </div>
            <div  className={cx('mt-4')}>
                <p className={cx("todo-label")}>Giảng viên chủ nhiệm</p>
                <Select 
                    options={teachers}
                    className={cx("todo-content")} 
                    placeholder="Giảng viên" 
                    value={selectedTeacher}
                    onChange={value => setSelectedTeacher(value)}
                />
            </div>
        </CustomModal>
    );
}

export default function Class() {
    const searchParams = useSearchParams();
    const schoolId = searchParams.get('schoolId');
    const loading = useSelector((state) => state.loading);
    
    const [classes, setClasses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedClass, setSelectedClass] = useState(null);

    const [tableParams, setTableParams] = useState({
        pagination: {
          current: 1,
          pageSize: 10,
        },
    });

    const columns = useMemo (() => CLASS_COLUMNS, []);

    const getAllClasses = () => {
        GeneralService
        .getAllClasses(schoolId)
        .then((res) => {
            let _classes = [];
            res.data.data.forEach((item, index) => {
                _classes.push(
                    new IClass(
                        index + 1,
                        item.id, 
                        item.class_name, 
                        item.students, 
                        item.head_teacher, 
                        item.department.department_name,
                        item.department_id
                    )
                );
            })
            setClasses(_classes);
            setIsLoading(false);
        })
    }

    useEffect(() => {
        getAllClasses();
    }, [schoolId])

    return (
        <div className={cx('wrapper')}>
            <Header title={'Lớp'} icon={faPeopleRoof}/>

            <div className={cx('intern-container')}>
                <div className={cx('intern-main')}>
                    <div className={cx('d-flex gap-3')}>
                        <button 
                            className={cx("view-btn")} 
                            onClick={() => setSelectedClass({})}
                            style={{marginLeft: 0}}
                        >
                            <FontAwesomeIcon 
                                className={cx("btn-option__icon")} 
                                icon={faPlus} 
                                size="lg" 
                                style={{marginRight: 10}}
                            />
                            Thêm mới
                        </button>
                        <button 
                            className={cx("view-btn", "sucess")} 
                            onClick={() => {}}
                            style={{marginLeft: 0}}
                        >
                            <FontAwesomeIcon 
                                className={cx("btn-option__icon", "sucess")} 
                                icon={faFileImport} 
                                size="lg" 
                                style={{marginRight: 10}}
                            />
                            Tải lên
                        </button>
                        <button 
                            className={cx("view-btn", "warn")} 
                            onClick={() => {}}
                            style={{marginLeft: 0}}
                        >
                            <FontAwesomeIcon 
                                className={cx("btn-option__icon", "warn")} 
                                icon={faFilePdf} 
                                size="lg" 
                                style={{marginRight: 10}}
                            />
                            Xuất File
                        </button>
                    </div>
                    <div className={cx('table-data')}>
                        <Table 
                            loading={isLoading}
                            bordered
                            columns={columns} 
                            dataSource={classes} 
                            pagination={tableParams?.pagination}
                            onRow={(record, index) => { 
                                return {
                                    onClick: event => {
                                        setSelectedClass(classes[index]);
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
            {
                selectedClass && Object.keys(selectedClass)?.length > 0 && (
                    <ClassModal
                        show={Object.keys(selectedClass).length > 0}
                        onHide={() => setSelectedClass(null)}
                        _class={selectedClass} 
                        schoolId={schoolId}
                        onRender={() => getAllClasses()}
                    />
                )
            }
            {
                selectedClass && Object.keys(selectedClass)?.length === 0 && (
                    <ClassModal
                        show={Object.keys(selectedClass).length === 0}
                        onHide={() => setSelectedClass(null)}
                        _class={selectedClass}
                        schoolId={schoolId}
                        onRender={() => getAllClasses()}
                    />
                )
            }
        </div>
    )
}