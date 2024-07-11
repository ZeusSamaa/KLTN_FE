'use client'
import { useState, useEffect } from "react";
import { DatePicker, Input, Select, Spin, notification } from "antd";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import styles from "./page.module.scss";

import { GeneralService } from "@/services/general.service";
import { GoogleService } from "@/services/google.service";
import { StudentService } from "@/services/student.service";

import { generateAccount } from "@/helpers/create-account";
import { DataValidator } from "@/helpers/valid-data"
import { ROLE } from "@/constant/role";
import { label } from "@/constant/label";
import { UPLOAD_FILE_TYPE } from "@/constant/upload-file";
import { NOTIFICATION_TYPE } from "@/constant/notification-type";
import { GENDER } from "@/constant/gender";
import { STUDYING_STATUS } from "@/constant/studying-status";

const cx = classNames.bind(styles);

export default function CreateStudent({ setShow, schoolId }) {
    const INIT_STUDENT_DATA = {
        id: null,
        name: "",
        image: null,
        phone: "",
        email: "",
        address: "",
        dob: dayjs(),
        admission_date: dayjs(),
        sex: "",
        current_status: null,
        program_id: null,
        major_id: null,
        class_id: null,
    }
    const [student, setStudent] = useState(INIT_STUDENT_DATA);
    const [image, setImage] = useState(null);
    const [api, contextHolder] = notification.useNotification();
    const [classes, setClasses] = useState([]);
    const [majors, setMajors] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [isPending, setIsPending] = useState(false);

    const openNotificationWithIcon = (type, message, description) => {
        return api[type]({
          message,
          description,
        });
    };

    const getMajors = async () => {
        await GeneralService
                .getAllMajors(schoolId)
                .then((res) => {
                    const _majors = [];
                    res.data.items.forEach((item) => {
                        _majors.push({
                            value: item.id,
                            label: item.major_name
                        })
                    })
                    setMajors(_majors);
                })
    }

    const getPrograms = async () => {
        await GeneralService
                .getAllPrograms(schoolId)
                .then((res) => {
                    const _programs = [];
                    res.data.forEach((item) => {
                        _programs.push({
                            value: item.id,
                            label: item.program_name
                        })
                    })
                    setPrograms(_programs);
                })
    }

    const getClasses = async () => {
        await GeneralService
                .getAllClasses(schoolId)
                .then((res) => {
                    const _classes = [];
                    res.data.data.forEach((item) => {
                        _classes.push({
                            value: item.id,
                            label: item.class_name
                        })
                    })
                    setClasses(_classes);
                })
    }

    useEffect(() => {
        getPrograms();
        getMajors();
        getClasses();
    }, []);

    const onUploadImage = (image) => {
        const file = image.files[0];
        if (image.files && image.files[0]) {
            setImage(URL.createObjectURL(file));
            setStudent((prev) => ({...prev, image: image.files[0]}));
        }
    }

    const isFullFields = Object.keys(student).every((key) => {
        if (key === 'id' || key === 'image') {
            return true;
        }

        const isEmptyField = (student[key] === null) || 
            (typeof student[key] === 'string' && student[key].trim().length === 0);
        if (isEmptyField) {
            return false;
        }
        return true;
    });

    const isValidData = () => {
        if (!isFullFields) {
            openNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Lỗi', 'Vui lòng nhập đầy đủ thông tin');
            setIsPending(false);
            return false;
        }

        if (!DataValidator.isValidPhoneNumber(student.phone)) {
            openNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Lỗi', 'Vui lòng nhập đúng định dạng Số điện thoại');
            setIsPending(false);
            return false;
        }

        if (!DataValidator.isValidEmail(student.email)) {
            openNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Lỗi', 'Vui lòng nhập đúng định dạng Email');
            setIsPending(false);
            return false;
        }

        return true;
    }

    const postData = data => {
        StudentService
        .postNewStudent(schoolId, data)
        .then((res) => {
            if (res.status === 200) {
                setIsPending(false);
                openNotificationWithIcon(NOTIFICATION_TYPE.SUCCESS, 'Thành công', 'Thêm sinh viên mới thành công');
                setStudent(INIT_STUDENT_DATA);
                setTimeout(() => {
                    setShow(false);
                }, 800);
            } else {
                openNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Thất bại', 'Thêm sinh viên mới không thành công');
            }
        })
        .catch(error => {
            openNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Thất bại', error);
        })
    }

    const onSaveStudent = () => {
        if (!isPending) {
            setIsPending(true);

            if (isValidData()) {
                generateAccount(student.name, ROLE.STUDENT)
                .then((account) => {
                    let body = {
                        ...account,
                        user_person: {
                            email: student.email,
                            full_name: student.name,
                            phone: student.phone,
                            address: student.address,
        
                            student: {
                                dob: student.dob,
                                sex: student.sex,
                                current_status: student.current_status,
                                admission_date: student.admission_date,
                                program_id: student.program_id,
                                class_id: student.class_id,
                                major_id: student.major_id
                            }
                        }
                    };

                    if (student.image) {
                        GoogleService
                        .uploadFile(student.image, UPLOAD_FILE_TYPE.PHOTO)
                        .then((imageUrl) => {
                            body.user_person.image = imageUrl;
                            postData([body]);
                        })
                        .catch((error) => {
                            setIsPending(false);
                            openNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Thất bại', error);
                        })
                    } else {
                        postData([body]);
                    }
                })
                .catch((error) => openNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Thất bại', error));
            }
        }
    }

    return (
        <div style={{padding: '0 15px'}}>
            { contextHolder }
            <div className={cx("row")}>
            <div className={cx("col-xl-3 col-lg-4 col-md-12 col-sm-12 col-xs-12 text-center mt-3")}>
                <h4 className={cx('category-heading')}>{label.home.avatar}</h4>
                <img
                    className={cx("avatar-container", "mt-4")} 
                    style={{margin: '0 auto'}}
                    src={image || "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"}
                />
                <div className={cx("mt-3")}>
                    <input 
                        id='avatar' 
                        type='file' 
                        style={{display: 'none'}} 
                        accept="image/*"
                        onChange={(e) => onUploadImage(e.target)}
                    />
                    <label htmlFor='avatar' className={cx('view-btn')} style={{cursor: 'pointer'}}>
                        <FontAwesomeIcon 
                            className={cx("btn-option__icon")} 
                            icon={faUpload} 
                            size="lg" 
                            style={{marginRight: 10}}
                        />
                        Tải ảnh lên
                    </label>
                </div>

            </div>
                <div className={cx("col-xl-9 col-lg-8 col-md-12 col-sm-12 col-xs-12 mt-3")}>
                    <h4 className={cx('category-heading')}>{label.home.student}</h4>
                    <div className={cx("row mt-4")}>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label")}>Mã sinh viên</p>   
                            <Input readOnly={true} disabled/>
                        </div>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label")}>Ngày nhập học</p>   
                            <DatePicker 
                                className={cx('w-100')} 
                                value={student.admission_date || ''}
                                onChange={(date) => setStudent((prev) => ({...prev, admission_date: date}))}
                                placeholder="Chọn ngày"
                                format={'DD-MM-YYYY'}
                            />
                        </div>
                        <div className={cx("col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label", "required")}>Họ và tên</p>   
                            <Input 
                                type="text"
                                value={student.name} 
                                onChange={(e) => setStudent((prev) => ({...prev, name: e.target.value}))}
                            />
                        </div>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label", "required")}>Số điện thoại</p>   
                            <Input 
                                type="phone"
                                maxLength={10}
                                value={student.phone} 
                                onChange={(e) => setStudent((prev) => ({...prev, phone: e.target.value}))}
                            />
                        </div>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label", "required")}>Email</p>   
                            <Input 
                                type="email"
                                maxLength={50}
                                value={student.email}
                                onChange={(e) => setStudent((prev) => ({...prev, email: e.target.value}))}
                            />
                        </div>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label", "required")}>Địa chỉ</p>   
                            <Input 
                                maxLength={100}
                                value={student.address}
                                onChange={(e) => setStudent((prev) => ({...prev, address: e.target.value}))}
                            />
                        </div>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label", "required")}>Ngày sinh</p>   
                            <DatePicker 
                                className={cx('w-100')} 
                                value={student.dob || ''}
                                onChange={(date) => setStudent((prev) => ({...prev, dob: date}))}
                                placeholder="Chọn ngày"
                                format={'DD-MM-YYYY'}
                            />
                        </div>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label", "required")}>Giới tính</p>   
                            <Select
                                className={cx('w-100')}
                                labelInValue
                                onChange={(e) => setStudent((prev) => ({...prev, sex: e.value}))}
                                options={GENDER}
                                placeholder='Chọn giới tính'
                            />
                        </div>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label", "required")}>Trạng thái</p>   
                            <Select
                                className={cx('w-100')}
                                labelInValue
                                onChange={(e) => setStudent((prev) => ({...prev, current_status: e.value}))}
                                options={STUDYING_STATUS}
                                placeholder='Chọn trạng thái'
                            />
                        </div>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label", "required")}>Lớp</p>   
                            <Select
                                className={cx('w-100')}
                                labelInValue
                                onChange={(e) => setStudent((prev) => ({...prev, class_id: e.value}))}
                                options={classes}
                                placeholder='Chọn lớp'
                            />
                        </div>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label", "required")}>Ngành học</p>   
                            <Select
                                className={cx('w-100')}
                                labelInValue
                                onChange={(e) => setStudent((prev) => ({...prev, major_id: e.value}))}
                                options={majors}
                                placeholder='Chọn ngành học'
                            />
                        </div>
                        <div className={cx("col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label", "required")}>Chương trình học</p>   
                            <Select
                                className={cx('w-100')}
                                labelInValue
                                onChange={(e) => setStudent((prev) => ({...prev, program_id: e.value}))}
                                options={programs}
                                placeholder='Chọn chương trình học'
                            />
                        </div>
                    </div>
                    <div className={cx('d-flex justify-content-end gap-3 mt-3')}>
                        <button 
                            className={cx("view-btn warn")} 
                            onClick={() => {
                                setStudent(INIT_STUDENT_DATA);
                                setShow(false);
                            }}
                        >
                            Quay lại
                        </button>
                        <button 
                            className={cx("view-btn")} 
                            onClick={onSaveStudent}
                        >
                            { isPending && <Spin size="small" style={{ marginRight: 8 }}/> }
                            Tạo mới
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )

}