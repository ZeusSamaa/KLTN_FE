'use client'
import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { faBookOpenReader, faFileImport, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-regular-svg-icons";
import { Input, Select, Table, notification } from "antd";
import { useSearchParams } from "next/navigation";

import { IMajor } from "@/modals/major";
import CustomModal from "@/components/Modal";
import Header from "@/components/Header";
import ButtonBack from "@/components/ButtonBack";
import { MAJOR_COLUMNS } from "@/constant/column-data";
import { NOTIFICATION_TYPE } from "@/constant/notification-type";

import { GeneralService } from "@/services/general.service";

const cx = classNames.bind(styles);

function MajorModal(props) {
    const { _major, schoolId, onRender, onHide } = props;

    const [majorName, setMajorName] = useState(_major?.name || "");
    const [selectedDepartment, setSelectedDepartment] = useState(_major?.department_id || null);
    const [departments, setDepartments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, message, description) => {
        return api[type]({
          message,
          description,
        });
    };

    const getAllDepartments = () => {
        GeneralService
        .getAllDepartments(schoolId)
        .then((res) => {
            const _departments = [];
            res.data.forEach((item) => {
                _departments.push({
                    value: item.id,
                    label: item.department_name
                })
            })
            setDepartments(_departments);
            setIsLoading(false);
        })
        .catch((err) => alert(err));

    }

    useEffect(() => {
        getAllDepartments();
    }, [])

    const onPostMajor = () => {
        if (majorName.trim().length === 0 || selectedDepartment === null) {
            openNotificationWithIcon(NOTIFICATION_TYPE.ERROR, "Thất bại", "Vui lòng nhập đầy đủ thông tin");
            return;
        }

        let data = {
            major_name: majorName,
            department_id: selectedDepartment
        };

        if (_major.id) {
            data.id = _major.id;
        }

        GeneralService
        .postMajor(data, schoolId)
        .then(() => {
            if (_major.id) {
                openNotificationWithIcon(NOTIFICATION_TYPE.SUCCESS, "Thành công", "Cập nhật ngành học thành công");
            } else {
                openNotificationWithIcon(NOTIFICATION_TYPE.SUCCESS, "Thành công", "Thêm mới ngành học thành công");
            }
            setTimeout(() => {
                onRender();
                onHide();
            }, 800);
        })
        .catch((err) => {
            openNotificationWithIcon(NOTIFICATION_TYPE.ERROR, "Thất bại", err);
        })
    }

    return (
        <CustomModal 
            heading={"Thông tin Ngành học"}
            onHide={onHide}
            onSave={onPostMajor}
            saveButtonLabel={_major?.id ? 'Lưu thay đổi' : 'Thêm mới'}
        >
            { contextHolder }
            <div>
                <p className={cx("todo-label required")}>Tên ngành học</p>
                <Input 
                    className={cx("todo-content")} 
                    placeholder="Ngành học..." 
                    value={majorName}
                    onChange={e => setMajorName(e.target.value)}
                />
            </div>
            <div  className={cx('mt-4')}>
                <p className={cx("todo-label required")}>Khoa</p>
                <Select 
                    options={departments}
                    className={cx("todo-content", "w-100")} 
                    placeholder="Khoa..." 
                    value={!isLoading && selectedDepartment}
                    loading={isLoading}
                    onChange={value => setSelectedDepartment(value)}
                />
            </div>
        </CustomModal>
    );
}

export default function Major() {
    const searchParams = useSearchParams();
    const schoolId = searchParams.get('schoolId');

    const [isLoading, setIsLoading] = useState(true);
    const [selectedMajor, setSelectedMajor] = useState(null);
    const [majors, setMajors] = useState([]);

    const [tableParams, setTableParams] = useState({
        pagination: {
          current: 1,
          pageSize: 10,
        },
    });

    const columns = useMemo (() => MAJOR_COLUMNS, []);

    const getAllMajors = () => {
        GeneralService
        .getAllMajors(schoolId)
        .then((res) => {
            const _majors = [];
            res.data.items.forEach((item, index) => {
                _majors.push(
                    new IMajor(
                        index + 1,
                        item.id,
                        item.major_name,
                        item.department.department_name,
                        item.department_id
                    )
                )
            })
            setMajors(_majors);
            setIsLoading(false);
        })
        .catch((err) => alert(err));
    }

    useEffect(() => {
        getAllMajors();
    }, [schoolId])

    return (
        <div className={cx('wrapper')}>
            <Header title={'Ngành học'} icon={faBookOpenReader}/>
            {/* <ButtonBack prevPath={'/admin'}/> */}
            <div className={cx('intern-container')}>
                <div className={cx('intern-main')}>
                    <div className={cx('d-flex gap-3')}>
                        <button 
                            className={cx("view-btn")} 
                            onClick={() => setSelectedMajor({})}
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
                            onChange={(e) => {}}
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
                            dataSource={majors} 
                            // setModalShow={setSelectedMajorIndex}
                            // currentSelectedRow={selectedMajorIndex}
                            onRow={(record, index) => { 
                                return {
                                    onClick: event => {
                                        setSelectedMajor(majors[index]);
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
            {
                selectedMajor && Object.keys(selectedMajor)?.length > 0 && (
                    <MajorModal
                        show={Object.keys(selectedMajor).length > 0}
                        onHide={() => setSelectedMajor(null)}
                        _major={selectedMajor} 
                        schoolId={schoolId}
                        onRender={() => getAllMajors()}
                    />
                )
            }
            {
                selectedMajor && Object.keys(selectedMajor)?.length === 0 && (
                    <MajorModal
                        show={Object.keys(selectedMajor).length === 0}
                        onHide={() => setSelectedMajor(null)}
                        _major={selectedMajor}
                        schoolId={schoolId}
                        onRender={() => getAllMajors()}
                    />
                )
            }
        </div>
    )
}