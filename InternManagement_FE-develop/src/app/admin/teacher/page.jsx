'use client'
import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { Table } from "antd";
import { useSearchParams } from "next/navigation";
import { faChalkboardTeacher, faFileImport, faFilePdf, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Modal } from "react-bootstrap";

import CreateTeacher from "./create-teacher";
import Header from "@/components/Header";
import ButtonBack from "@/components/ButtonBack";
import { TEACHER_COLUMNS } from "@/constant/column-data";
import { exportData } from "@/helpers/export-data"
import { formattedDate } from "@/helpers/format"
import { EXPORT_TYPE } from "@/constant/export-type";
import Search from "@/components/Search";
import { TeacherService } from "@/services/teacher.service";
import { getTeachingStatus } from "@/constant/teaching-status";

const cx = classNames.bind(styles);

function TeacherModal(props) {
    const student = props.student;

    return (
        <React.Fragment>
            {
                Object.keys(student).length > 0 && (
                    <Modal
                        {...props}
                        size="lg"
                        aria-labelledby="contained-modal-title-vcenter"
                        centered
                    >
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                Thông tin Giảng viên
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4>{student.name}</h4>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={props.onHide}>Đóng</Button>
                        </Modal.Footer>
                    </Modal>
                )
            }
        </React.Fragment>
    );
}

export default function Teacher() {
    const searchParams = useSearchParams();
    const schoolId = searchParams.get('schoolId');
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTeacherIndex, setSelectedTeacherIndex] = useState(null);
    const [teachers, setTeachers] = useState([]);
    const [showAddScreen, setShowAddScreen] = useState(false);

    const [tableParams, setTableParams] = useState({
        pagination: {
          current: 1,
          pageSize: 10,
        },
    });

    const columns = useMemo (() => TEACHER_COLUMNS, []);

    const getAllTeachers = () => {
        TeacherService
        .getAllTeachers()
        .then((res) => {
            let _teachers = [];
            res.data.data.forEach((item, index) => {
                _teachers.push({
                    id: item.id,
                    no: index + 1,
                    image: item.image,
                    name: item.full_name,
                    email: item.email,
                    dob: formattedDate(item.teacher.dob),
                    start_date: formattedDate(item.teacher.start_date),
                    education_level: item.teacher.education_level,
                    experience_year: item.teacher.experience_year,
                    current_status: getTeachingStatus(item.teacher.current_status),
                    department_name: item.teacher.department.department_name,
                })
            })
            setTeachers(_teachers);
            setIsLoading(false);
        })
    }


    useEffect(() => {
        getAllTeachers();
    }, [schoolId])

    return (
        <div className={cx('wrapper')}>
            <Header title={'Giảng viên'} icon={faChalkboardTeacher}/>
            {/* <ButtonBack prevPath={'/admin'}/> */}
            <div className={cx('intern-container')}>
                <div className={cx('intern-main')}>
                {
                    showAddScreen ? (
                        <CreateTeacher 
                            setShow={setShowAddScreen} 
                            schoolId={schoolId}
                        />
                    ) : (
                        <React.Fragment>
                            <div className={cx('d-flex justify-content-between align-items-center flex-wrap')}>
                                <Search classList={['mt-2']}/>
                                <div className={cx('d-flex gap-3 mt-2')}>
                                    <button 
                                        className={cx("view-btn")} 
                                        style={{marginLeft: 0}}
                                        onClick={() => setShowAddScreen(true)}
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
                                        onClick={() => exportData(teachers, EXPORT_TYPE.TEACHER)}
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
                            </div>
                            <div className={cx('table-data')}>
                                <Table 
                                    loading={isLoading}
                                    bordered
                                    columns={columns} 
                                    dataSource={teachers} 
                                    pagination={tableParams?.pagination}
                                />
                            </div>
                        </React.Fragment>
                    )
                }
                </div>
            </div>
            {
                selectedTeacherIndex !== null && (
                    <TeacherModal
                        show={selectedTeacherIndex}
                        onHide={() => setSelectedTeacherIndex(null)}
                        student={dataStore[selectedTeacherIndex]}
                    />
                )
            }
        </div>
    )
}