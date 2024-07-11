'use client'
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { useSearchParams } from "next/navigation";
import { faFileImport, faFilePdf, faLandmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Input, Select, Table } from "antd";

// Components
import Header from "@/components/Header";
import ButtonBack from "@/components/ButtonBack";
import { IDepartment } from "@/modals/department";
import { DEPARTMENT_COLUMNS } from "@/constant/column-data";
import { label } from "@/constant/label";
import { UPLOAD_FILE_TYPE } from "@/constant/upload-file"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CustomModal from "@/components/Modal";

// Services
import { GeneralService } from "@/services/general.service";
import { TeacherService } from "@/services/teacher.service";
import { GoogleService } from "@/services/google.service";

const cx = classNames.bind(styles);

function DepartmentModal(props) {
    const { department, onHide, schoolId, onRender } = props;
    const [departmentName, setDepartmentName] = useState(department.name);
    const [teachers, setTeachers] = useState([]);
    const [selectedTeacher, setSelectedTeacher] = useState(department?.head_department_name || null);

    const getAllTeachers = async () => {
        await TeacherService
        .getAllTeachers()
        .then((res) => {
            const resData = res.data;
            let _teachers = [];
            resData.data.forEach((item) => {
                if (item.teacher.department_id === department.id) {
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
        getAllTeachers();
    }, []);

    const onPostDepartment = () => {
        let body = {
            school_id: parseInt(schoolId),
            department_name: departmentName?.trim()
        }
        let type = 'create';
        if (department?.id) {
            body.id = department.id;
            if (selectedTeacher) {
                body.department_head = selectedTeacher;
            }
            type = 'update';
        }

        GeneralService
        .postDepartment(body, type)
        .then(() => {
            onRender();
            onHide();
        })
    }

    return (
        <CustomModal 
            heading={"Thông tin Khoa"}
            onHide={onHide}
            onSave={onPostDepartment}
            saveButtonLabel={department?.id ? 'Lưu thay đổi' : 'Thêm mới'}
        >
            <div>
                <p className={cx("todo-label")}>Tên khoa</p>
                <Input 
                    className={cx("todo-content")} 
                    placeholder="Khoa" 
                    value={departmentName}
                    onChange={e => setDepartmentName(e.target.value)}
                />
            </div>
            <div  className={cx('mt-4')}>
                <p className={cx("todo-label")}>Trưởng khoa</p>
                <Select 
                    options={teachers}
                    className={cx("todo-content")} 
                    placeholder="Trưởng Khoa" 
                    value={selectedTeacher}
                    onChange={value => setSelectedTeacher(value)}
                />
            </div>
        </CustomModal>
    );
}

export default function Department() {
    const searchParams = useSearchParams();
    const schoolId = searchParams.get('schoolId');
    const [departments, setDepartments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDepartment, setSelectedDepartment] = useState(null);

    const [tableParams, setTableParams] = useState({
        pagination: {
          current: 1,
          pageSize: 10,
        },
    });

    const columns = useMemo (() => DEPARTMENT_COLUMNS, []);

    const getAllDepartments = () => {
        GeneralService
            .getAllDepartments(schoolId)
            .then((res) => {
                const _departments = [];
                res.data.forEach((item, index) => {
                    _departments.push(
                        new IDepartment(
                            index + 1,
                            item.id, 
                            item.department_name, 
                            item.teacher?.user_person.full_name || 'Chưa tạo', 
                            'Đại học Công nghệ thông tin'
                        )
                    );
                })
                setDepartments(_departments);
                setIsLoading(false);
            })
    }

    useEffect(() => {
        getAllDepartments();
    }, [schoolId])

    const onChangeFileUpload = (e) => {
        const file = e.target.files[0];
        GoogleService
        .uploadFile(file, UPLOAD_FILE_TYPE.DOCS)
        .then((fileUrl) => {
            console.log('saved link into BE: ', fileUrl);
        });
    }

    return (
        <div className={cx('wrapper')}>
            <Header title={'Khoa'} icon={faLandmark}/>
            {/* <ButtonBack prevPath={'/admin'}/> */}
            <div className={cx('intern-container')}>
                <div className={cx('intern-main')}>
                    <div className={cx('d-flex gap-3')}>
                        <button 
                            className={cx("view-btn")} 
                            onClick={() => setSelectedDepartment({})}
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
                        <input 
                            id="upload-file" 
                            type="file" 
                            style={{display: 'none'}} 
                            accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            onChange={(e) => onChangeFileUpload(e)}
                        />
                        <label
                            htmlFor="upload-file" 
                            className={cx("view-btn", "sucess")} 
                            type="file"
                            style={{marginLeft: 0}}
                        >
                            <FontAwesomeIcon 
                                className={cx("btn-option__icon", "sucess")} 
                                icon={faFileImport} 
                                size="lg" 
                                style={{marginRight: 10}}
                            />
                            Tải lên
                        </label>
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
                            dataSource={departments} 
                            pagination={tableParams?.pagination}
                            onRow={(record) => { 
                                return {
                                    onClick: event => {
                                        setSelectedDepartment(record);
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
            {
                selectedDepartment && Object.keys(selectedDepartment)?.length > 0 && (
                    <DepartmentModal
                        show={selectedDepartment !== null}
                        onHide={() => setSelectedDepartment(null)}
                        department={selectedDepartment}
                        schoolId={schoolId}
                        onRender={() => getAllDepartments()}
                    />
                )
            }
            {
                selectedDepartment && Object.keys(selectedDepartment)?.length === 0 && (
                    <DepartmentModal
                        show={Object.keys(selectedDepartment).length === 0}
                        onHide={() => setSelectedDepartment(null)}
                        department={selectedDepartment}
                        schoolId={schoolId}
                        onRender={() => getAllDepartments()}
                    />
                )
            }
        </div>
    )
}