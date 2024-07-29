'use client'
import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { faFileImport, faFilePdf, faPlus, faUserGraduate } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal } from "react-bootstrap";
import { Table } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSearchParams } from "next/navigation";

import CreateStudent from "./create-student";
import Header from "@/components/Header";
import ButtonBack from "@/components/ButtonBack";
import { IStudent } from "@/modals/student";
import { STUDENT_COLUMNS } from "@/constant/column-data";
import { EXPORT_TYPE } from "@/constant/export-type";
import { getStudyingStatus } from "@/constant/studying-status";
import { exportData } from "@/helpers/export-data";
import { formattedDate, upperCaseFirtLetter } from "@/helpers/format";

import { StudentService } from "@/services/student.service";

const cx = classNames.bind(styles);

function StudentModal(props) {
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
                                Thông tin Sinh viên
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

export default function Student() {
    const searchParams = useSearchParams();
    const schoolId = searchParams.get('schoolId');

    const [isLoading, setIsLoading] = useState(true);
    const [students, setStudents] = useState([]);
    const [selectedStudentIndex, setSelectedStudentIndex] = useState(null);
    const [showAddScreen, setShowAddScreen] = useState(false);

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });

    const columns = useMemo(() => STUDENT_COLUMNS, []);

    const getAllStudents = () => {
        StudentService
            .getAllStudents()
            .then((res) => {
                const _students = [];
                console.log(("data student: ", res.data));
                res.data.data.forEach((item, index) => {
                    _students.push(
                        new IStudent(
                            index + 1,
                            item.id,
                            item.full_name,
                            formattedDate(item.student.admission_date),
                            formattedDate(item.student.dob),
                            upperCaseFirtLetter(item.student.sex),
                            getStudyingStatus(item.student.current_status),
                            item.student.class.class_name
                        )
                    )
                })
                setStudents(_students);
                setIsLoading(false);
            })
    }

    useEffect(() => {
        getAllStudents();
    }, [schoolId])

    return (
        <div className={cx('wrapper')}>
            <Header title={'Sinh viên'} icon={faUserGraduate} />


            <div className={cx('intern-container')}>
                <div className={cx('intern-main')}>
                    {
                        showAddScreen ? (
                            <CreateStudent schoolId={schoolId} setShow={setShowAddScreen} />
                        ) : (
                            <React.Fragment>
                                <div className={cx('d-flex gap-3')}>
                                    <button
                                        className={cx("view-btn")}
                                        style={{ marginLeft: 0 }}
                                        onClick={() => setShowAddScreen(true)}
                                    >
                                        <FontAwesomeIcon
                                            className={cx("btn-option__icon")}
                                            icon={faPlus}
                                            size="lg"
                                            style={{ marginRight: 10 }}
                                        />
                                        Thêm mới
                                    </button>
                                    <button
                                        className={cx("view-btn", "sucess")}
                                        onClick={() => { }}
                                        style={{ marginLeft: 0 }}
                                    >
                                        <FontAwesomeIcon
                                            className={cx("btn-option__icon", "sucess")}
                                            icon={faFileImport}
                                            size="lg"
                                            style={{ marginRight: 10 }}
                                        />
                                        Tải lên
                                    </button>
                                    <button
                                        className={cx("view-btn", "warn")}
                                        onClick={() => exportData(dataStore, EXPORT_TYPE.STUDENT)}
                                        style={{ marginLeft: 0 }}
                                    >
                                        <FontAwesomeIcon
                                            className={cx("btn-option__icon", "warn")}
                                            icon={faFilePdf}
                                            size="lg"
                                            style={{ marginRight: 10 }}
                                        />
                                        Xuất File
                                    </button>
                                </div>
                                <div className={cx('table-data')}>
                                    <Table
                                        loading={isLoading}
                                        bordered
                                        columns={columns}
                                        dataSource={students}
                                        pagination={tableParams?.pagination}
                                    />
                                </div>
                            </React.Fragment>
                        )
                    }
                </div>
            </div>

            {/* <ButtonBack prevPath={'/admin'}/> */}
            {
                selectedStudentIndex !== null && (
                    <StudentModal
                        show={selectedStudentIndex}
                        onHide={() => setSelectedStudentIndex(null)}
                        student={dataStore[selectedStudentIndex]}
                    />
                )
            }
        </div>
    )
}