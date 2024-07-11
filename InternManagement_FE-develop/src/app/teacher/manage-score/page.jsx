'use client'
import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { Pagination, Select, Tooltip } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faCheck, 
    faDownload, 
    faFloppyDisk, 
    faPen, 
    faRotateRight, 
    faSpinner, 
    faTableList, 
    faTrash 
} from "@fortawesome/free-solid-svg-icons";

import Header from "@/components/Header";
import { label } from "@/constant/label";
import { InternService } from "@/services/intern.service";
import { GeneralService } from "@/services/general.service";

const cx = classNames.bind(styles);

const INTERNING_TABVIEW_INDEX = 0;
const INTERNED_TABVIEW_INDEX = 1;

const maxItemsInPage = 10;

const INTERNING_HEADERS = [
    { title: "Ảnh", size: "small" },
    { title: "Mã số sinh viên", size: "medium" },
    { title: "Họ và tên", size: "large" },
    { title: "Lớp", size: "medium" },
    { title: "Điểm", size: "medium" },
    { title: "Lựa chọn", size: "large" },
];

const INTERNED_HEADERS = [
    { title: "Ảnh", size: "small" },
    { title: "Mã số sinh viên", size: "medium" },
    { title: "Họ và tên", size: "large" },
    { title: "Lớp", size: "medium" },
    { title: "Vị trí thực tập", size: "medium" },
    { title: "Điểm cuối kì", size: "medium" },
];

function InternedStudents() {
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [students, setStudents] = useState([]);
    const [academicYears, setAcademicYears] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [currentAcademicYear, setCurrentAcademicYear] = useState(null);
    const [currentSemester, setCurrentSemester] = useState(null);
    const [loaded, setLoaded] = useState(false);

    function getAcademicYears() {
        GeneralService
            .getAcademicYears()
            .then((_academicYears) => {
                setAcademicYears(_academicYears);
                setCurrentAcademicYear(_academicYears[0]);
            })
            .catch((err) => console.log('err: ', err));
    }

    function getSemesters() {
        GeneralService
            .getSemesters()
            .then((_semesters) => {
                setSemesters(_semesters);
                setCurrentSemester(_semesters[0]);
            })
            .catch((err) => console.log('err: ', err));
    }

    function getInternedList() {
        InternService
            .getInternedList()
            .then((_students) => setStudents(_students))
            .catch((err) => console.log('err: ', err));
    }

    useEffect(() => {
        getAcademicYears();
        getSemesters();
        getInternedList();
        setLoaded(true);
    }, [])

    return (
        <React.Fragment>
            {
                loaded && (
                    <React.Fragment>
                        <h4 className={cx('category-heading')}>{label.score["interned-list"]}</h4>
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
                        </div>
                        <table className={cx('intern-main', 'interned')}>
                            <thead>
                                {
                                    INTERNED_HEADERS.map((header, index) => (
                                        <th key={index} className={cx("field-item", header.size)}>{header.title}</th>
                                    ))
                                }
                            </thead>
                            <tbody>
                                {
                                    students.length > 0 && students.map((student, index) => (
                                        <tr className={cx("student-item")} key={index}>
                                            <td className={cx("field-item", INTERNING_HEADERS[0]?.size)}>
                                                <img 
                                                    className={cx("avatar")} 
                                                    src={student.image_path} 
                                                    alt=""
                                                />
                                            </td>
                                            <td className={cx("field-item", INTERNING_HEADERS[1]?.size)}>{student.student_id}</td>
                                            <td className={cx("field-item", INTERNING_HEADERS[2]?.size)}>{student.full_name}</td>
                                            <td className={cx("field-item", INTERNING_HEADERS[3]?.size)}>{student.class}</td>
                                            <td className={cx("field-item", INTERNING_HEADERS[4]?.size)}>{student.job}</td>
                                            <td className={cx("field-item", INTERNING_HEADERS[5]?.size)}>{student.score}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        <Pagination 
                            className={cx("d-flex align-items-center justify-content-center mt-3")}
                            defaultCurrent={currentPageNumber} 
                            total={students.length / maxItemsInPage * 10} 
                            onChange={(pageNumber) => setCurrentPageNumber(pageNumber)}    
                        />
                        <button className={cx("save-btn", "export")}>
                            <FontAwesomeIcon icon={faDownload} size="lg" style={{marginRight: 10}}/>
                            Xuất bảng điểm
                        </button>
                    </React.Fragment>
                )
            }
        </React.Fragment>
    )
}

function InterningStudents() {
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    const [students, setStudents] = useState([]);
    
    function getInterningList() {
        InternService
            .getInterningList()
            .then((_students) => setStudents(_students))
            .catch((err) => console.log('err: ', err));
    }

    useEffect(() => {
        getInterningList();
    }, [])

    return (
        <React.Fragment>
            <h4 className={cx('category-heading')}>{label.score["interning-list"]}</h4>
            <table className={cx('intern-main')}>
                <thead>
                    {
                        INTERNING_HEADERS.map((header, index) => (
                            <th key={index} className={cx("field-item", header.size)}>{header.title}</th>
                        ))
                    }
                </thead>
                <tbody>
                    {
                        students.length > 0 && students.map((student, index) => (
                            <tr className={cx("student-item")} key={index}>
                                <td className={cx("field-item", INTERNING_HEADERS[0]?.size)}>
                                    <img 
                                        className={cx("avatar")} 
                                        src={student.image_path} 
                                        alt=""
                                    />
                                </td>
                                <td className={cx("field-item", INTERNING_HEADERS[1]?.size)}>{student.student_id}</td>
                                <td className={cx("field-item", INTERNING_HEADERS[2]?.size)}>{student.full_name}</td>
                                <td className={cx("field-item", INTERNING_HEADERS[3]?.size)}>{student.class}</td>
                                <td className={cx("field-item", INTERNING_HEADERS[4]?.size)}>{student.score}</td>
                                <td className={cx("field-item", INTERNING_HEADERS[5]?.size, "action")}>
                                    <Tooltip color="var(--blue-5-color)" title="Lưu">
                                            <div className={cx("action-item", 'save')}>
                                            <FontAwesomeIcon icon={faFloppyDisk} size="lg"/>
                                        </div>
                                    </Tooltip>
                                    <Tooltip color="var(--green-5-color)" title="Khôi phục">
                                        <div className={cx("action-item", "restore")}>
                                            <FontAwesomeIcon icon={faRotateRight} size="lg"/>
                                        </div>
                                    </Tooltip>
                                    <Tooltip color="var(--purple-5-color)" title="Cập nhật">
                                        <div className={cx("action-item", "update")}>
                                            <FontAwesomeIcon icon={faPen} size="lg"/>
                                        </div>
                                    </Tooltip>
                                    <Tooltip color="var(--red-5-color)" title="Xóa">
                                        <div className={cx("action-item", "delete")}>
                                            <FontAwesomeIcon icon={faTrash} size="lg"/>
                                        </div>
                                    </Tooltip>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <Pagination 
                className={cx("d-flex align-items-center justify-content-center mt-3")}
                defaultCurrent={currentPageNumber} 
                total={students.length / maxItemsInPage * 10} 
                onChange={(pageNumber) => setCurrentPageNumber(pageNumber)}    
            />
            <button className={cx("save-btn")}>Lưu bảng điểm</button>
        </React.Fragment>
    )
}

export default function TeacherScore() {
    const [currentTabIndex, setCurrentTabIndex] = useState(0);

    function handleNavigateTabView(index) {
        if (currentTabIndex !== index) {
            setCurrentTabIndex(index);
        }
    }

    return (
        <div className={cx('wrapper')}>
            <Header title={'Bảng điểm'} icon={faTableList}/>
            <div className={cx('intern-container')}>
                <div className={cx("tab-view")}>
                    <div 
                        className={cx("tab-view__item", {
                            active: currentTabIndex === INTERNING_TABVIEW_INDEX
                        })}
                        onClick={() => handleNavigateTabView(INTERNING_TABVIEW_INDEX)}    
                    >
                        <FontAwesomeIcon icon={faSpinner} size="lg"/>
                        <span>Đang thực tập</span>
                    </div>
                    <div 
                        className={cx("tab-view__item", {
                            active: currentTabIndex === INTERNED_TABVIEW_INDEX
                        })}
                        onClick={() => handleNavigateTabView(INTERNED_TABVIEW_INDEX)}    
                    >
                        <FontAwesomeIcon icon={faCheck} size="lg"/>
                        <span>Đã hoàn thành</span>
                    </div>
                </div>
                {
                    currentTabIndex === INTERNING_TABVIEW_INDEX ? (
                        <InterningStudents />
                    ) : (
                        <InternedStudents />
                    )
                }
            </div>
        </div>
    )
}