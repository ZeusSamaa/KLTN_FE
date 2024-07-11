'use client'
import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import Header from "@/components/Header";
import { label } from "@/constant/label";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { GeneralService } from "@/services/general.service";
import { Button, Input, Modal, Pagination, Select } from "antd";
import { InternService } from "@/services/intern.service";
import { Col, Container, Row } from "react-bootstrap";

const cx = classNames.bind(styles);

const maxItemsInPage = 10;

const headers = [
    { title: "Ảnh", size: "small" },
    { title: "Mã số sinh viên", size: "medium" },
    { title: "Họ và tên", size: "large" },
    { title: "Lớp", size: "medium" },
    { title: "Trạng thái", size: "medium" },
    { title: "Lựa chọn", size: "large" },
];

function StudentView({ student }) {
    return (
        <div className={cx("d-flex mt-3")}>
            <img src={student.image_path} alt="" className={cx("avatar-view")}/>
            <Container style={{marginLeft: 20}}>
                <Row>
                    <Col xl={6} lg={6} md={12} xs={12} className={cx("mb-3")}>
                        <span className={cx('select-label')}>Mã số sinh viên</span>
                        <Input 
                            value={student.student_id} 
                            disabled 
                            style={{ backgroundColor: 'var(--white-color)'}}
                        />
                    </Col>
                    <Col xl={6} lg={6} md={12} xs={12} className={cx("mb-3")}>
                        <span className={cx('select-label')}>Họ và tên</span>
                        <Input 
                            value={student.full_name} 
                            disabled 
                            style={{ backgroundColor: 'var(--white-color)'}}
                        />
                    </Col>
                    <Col xl={6} lg={6} md={12} xs={12} className={cx("mb-3")}>
                        <span className={cx('select-label')}>Lớp</span>
                        <Input 
                            value={student.class} 
                            disabled 
                            style={{ backgroundColor: 'var(--white-color)'}}
                        />
                    </Col>
                    <Col xl={6} lg={6} md={12} xs={12} className={cx("mb-3")}>
                        <span className={cx('select-label')}>Trạng thái thực tập</span>
                        <Input 
                            value={student.status === 1 ? 'Đang thực tập' : 'Đã hoàn thành'} 
                            disabled 
                            style={{ backgroundColor: 'var(--white-color)'}}
                        />
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default function TeacherHome() {
    const [loaded, setLoaded] = useState(false);
    const [academicYears, setAcademicYears] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [currentAcademicYear, setCurrentAcademicYear] = useState(null);
    const [currentSemester, setCurrentSemester] = useState(null);
    const [currentStatus, setCurrentStatus] = useState(null);
    const [students, setStudents] = useState([]);
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [selectedStudent, setSelectedStudent] = useState({});

    // function getAcademicYears() {
    //     GeneralService
    //         .getAcademicYears()
    //         .then((_academicYears) => {
    //             setAcademicYears(_academicYears);
    //             setCurrentAcademicYear(_academicYears[0]);
    //         })
    //         .catch((err) => console.log('err: ', err));
    // }

    // function getSemesters() {
    //     GeneralService
    //         .getSemesters()
    //         .then((_semesters) => {
    //             setSemesters(_semesters);
    //             setCurrentSemester(_semesters[0]);
    //         })
    //         .catch((err) => console.log('err: ', err));
    // }

    function getStatuses() {
        GeneralService
            .getStatuses()
            .then((_status) => {
                setStatuses(_status);
                setCurrentStatus(_status[0]);
            })
            .catch((err) => console.log('err: ', err));
    }

    function getInterningList() {
        InternService
            .getInterningList()
            .then((_students) => setStudents(_students))
            .catch((err) => console.log('err: ', err));
    }

    useEffect(() => {
        // getAcademicYears();
        // getSemesters();
        getStatuses();
        getInterningList();
        setLoaded(true);
    }, [])

    return (
        <div className={cx('wrapper')}>
            <Header title={'Trang chủ'} icon={faHome}/>
            <div className={cx('intern-container')}>
                <h4 className={cx('category-heading')}>{label.intern["intern-list"]}</h4>
                {
                    loaded && (
                        <React.Fragment>
                            <div className={cx('d-flex mt-1 mb-4')} style={{marginLeft: 15}}>
                                <div className={cx('select-item')}>
                                    <span className={cx('select-label')}>{label.intern["academic-year"]}</span>
                                    <Select
                                        defaultValue={currentAcademicYear}
                                        style={{ width: 150 }}
                                        options={academicYears}
                                        onChange={(value) => setCurrentAcademicYear(value)}
                                    />
                                </div>
                                <div className={cx('select-item')}>
                                    <span className={cx('select-label')}>{label.intern["semester"]}</span>
                                    <Select
                                        defaultValue={currentSemester}
                                        style={{ width: 150 }}
                                        options={semesters}
                                        onChange={(value) => setCurrentSemester(value)}
                                    />
                                </div>
                                <div className={cx('select-item')}>
                                    <span className={cx('select-label')}>{label.intern["status"]}</span>
                                    <Select
                                        defaultValue={currentStatus}
                                        style={{ width: 150 }}
                                        options={statuses}
                                        onChange={(value) => setCurrentStatus(value)}
                                    />
                                </div>
                            </div>

                            <table className={cx('intern-main')}>
                                <thead>
                                    {
                                        headers.map((header, index) => (
                                            <th key={index} className={cx("field-item", header.size)}>{header.title}</th>
                                        ))
                                    }
                                </thead>
                                <tbody>
                                    {
                                        students && students.length > 0 && students.map((student, index) => (
                                            <tr className={cx("student-item")} key={index}>
                                                <td className={cx("field-item", headers[0]?.size)}>
                                                    <img 
                                                        className={cx("avatar")} 
                                                        src={student.image_path} 
                                                        alt=""
                                                    />
                                                </td>
                                                <td className={cx("field-item", headers[1]?.size)}>{student.student_id}</td>
                                                <td className={cx("field-item", headers[2]?.size)}>{student.full_name}</td>
                                                <td className={cx("field-item", headers[3]?.size)}>{student.class}</td>
                                                <td className={cx("field-item", headers[4]?.size)}>
                                                    { student.status === 1 ? 
                                                        "Đang thực tập" : "Đã hoàn thành" }
                                                </td>
                                                <td className={cx("field-item", headers[5]?.size)}>
                                                    <button 
                                                        className={cx("view-btn")}
                                                        onClick={() => setSelectedStudent(student)}    
                                                    >Xem chi tiết</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>

                            <Pagination 
                                className={cx("d-flex align-items-center justify-content-center")}
                                defaultCurrent={currentPageNumber} 
                                total={students.length / maxItemsInPage * 10} 
                                onChange={(pageNumber) => setCurrentPageNumber(pageNumber)}    
                            />
                        </React.Fragment>
                    )
                }
                {
                    Object.keys(selectedStudent).length > 0 && (
                        <Modal
                            title="Thông tin sinh viên"
                            centered
                            open={Object.keys(selectedStudent).length > 0}
                            onOk={() => setSelectedStudent({})}
                            onCancel={() => setSelectedStudent({})}
                            width={800}
                            footer={[
                                <Button 
                                    key="submit" 
                                    size="medium" 
                                    onClick={() => setSelectedStudent({})}
                                >
                                    Đóng
                                </Button>,
                            ]}
                        >
                            <StudentView student={selectedStudent}/>
                        </Modal>
                    )
                }
            </div>
        </div>
    )
}