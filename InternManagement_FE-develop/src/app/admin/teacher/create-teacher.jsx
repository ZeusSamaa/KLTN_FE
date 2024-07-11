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
import { TeacherService } from "@/services/teacher.service";

import { generateAccount } from "@/helpers/create-account";
import { DataValidator } from "@/helpers/valid-data"
import { TeachingStatusList } from "@/constant/teaching-status";
import { ROLE } from "@/constant/role";
import { label } from "@/constant/label";
import { UPLOAD_FILE_TYPE } from "@/constant/upload-file";
import { NOTIFICATION_TYPE } from "@/constant/notification-type";

const cx = classNames.bind(styles);

export default function CreateTeacher({ setShow, schoolId }) {
    const INIT_TEACHER_DATA = {
        id: null,
        name: "",
        image: null,
        phone: "",
        email: "",
        address: "",
        dob: dayjs(),
        start_date: dayjs(),
        education_level: null,
        experience_year: null,
        current_status: null,
        department: null,
    }
    const [teacher, setTeacher] = useState(INIT_TEACHER_DATA);
    const [image, setImage] = useState(null);
    const [api, contextHolder] = notification.useNotification();
    const [departments, setDepartments] = useState([]);
    const [isPending, setIsPending] = useState(false);

    const openNotificationWithIcon = (type, message, description) => {
        return api[type]({
          message,
          description,
        });
    };

    const getDepartments = async () => {
        await GeneralService
        .getAllDepartments(schoolId)
        .then((res) => {
            setDepartments(res.data);
        })
    }

    useEffect(() => {
        getDepartments();
    }, []);

    const onUploadImage = (image) => {
        const file = image.files[0];
        if (image.files && image.files[0]) {
            setImage(URL.createObjectURL(file));
            setTeacher((prev) => ({...prev, image: image.files[0]}));
        }
    }

    const isFullFields = Object.keys(teacher).every((key) => {
        if (key === 'id' || key === 'image') {
            return true;
        }

        const isEmptyField = (teacher[key] === null) || 
            (typeof teacher[key] === 'string' && teacher[key].trim().length === 0);
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

        if (!DataValidator.isValidPhoneNumber(teacher.phone)) {
            openNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Lỗi', 'Vui lòng nhập đúng định dạng Số điện thoại');
            setIsPending(false);
            return false;
        }

        if (!DataValidator.isValidEmail(teacher.email)) {
            openNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Lỗi', 'Vui lòng nhập đúng định dạng Email');
            setIsPending(false);
            return false;
        }

        return true;
    }

    const onSaveTeacher = () => {
        if (!isPending) {
            setIsPending(true);

            if (isValidData()) {
                generateAccount(teacher.name, ROLE.TEACHER)
                .then((account) => {
                    let body = {
                        ...account,
                        user_person: {
                            email: teacher.email,
                            full_name: teacher.name,
                            phone: teacher.phone,
                            address: teacher.address,
        
                            teacher: {
                                dob: teacher.dob,
                                start_date: teacher.start_date,
                                education_level: teacher.education_level,
                                experience_year: teacher.experience_year,
                                current_status: teacher.current_status,
                                department_id: teacher.department
                            }
                        }
                    };
        
                    if (image) {
                        GoogleService
                        .uploadFile(teacher.image, UPLOAD_FILE_TYPE.PHOTO)
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
        
                });
            }
        }
    }

    const postData = (data) => {
        TeacherService
        .postNewTeacher(schoolId, data)
        .then(() => {
            setIsPending(false);
            openNotificationWithIcon(NOTIFICATION_TYPE.SUCCESS, 'Thành công', 'Thêm giảng viên mới thành công');
            setTeacher(INIT_TEACHER_DATA);
            setTimeout(() => {
                setShow(false);
            }, 500);
        })
        .catch(error => {
            openNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Thất bại', error);
        })
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
                    <h4 className={cx('category-heading')}>{label.home.teacher}</h4>
                    <div className={cx("row mt-4")}>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label")}>Mã giảng viên</p>   
                            <Input readOnly={true} disabled/>
                        </div>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label")}>Ngày vào làm</p>   
                            <DatePicker 
                                className={cx('w-100')} 
                                value={teacher.start_date || ''}
                                placeholder="Chọn ngày"
                                onChange={(date) => setTeacher((prev) => ({...prev, start_date: date}))}
                                format={'DD-MM-YYYY'}
                            />
                        </div>
                        <div className={cx("col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label", "required")}>Họ và tên</p>   
                            <Input 
                                type="text"
                                value={teacher.name} 
                                onChange={(e) => setTeacher((prev) => ({...prev, name: e.target.value}))}
                            />
                        </div>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label", "required")}>Số điện thoại</p>   
                            <Input 
                                type="phone"
                                maxLength={10}
                                value={teacher.phone} 
                                onChange={(e) => setTeacher((prev) => ({...prev, phone: e.target.value}))}
                            />
                        </div>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label", "required")}>Email</p>   
                            <Input 
                                type="email"
                                maxLength={50}
                                value={teacher.email}
                                onChange={(e) => setTeacher((prev) => ({...prev, email: e.target.value}))}
                            />
                        </div>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label", "required")}>Địa chỉ</p>   
                            <Input 
                                maxLength={100}
                                value={teacher.address}
                                onChange={(e) => setTeacher((prev) => ({...prev, address: e.target.value}))}
                            />
                        </div>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label", "required")}>Trình độ học vấn</p>   
                            <Input 
                                value={teacher.education_level}
                                onChange={(e) => setTeacher((prev) => ({...prev, education_level: e.target.value}))}
                            />
                        </div>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label", "required")}>Số năm kinh nghiệm</p>   
                            <Input 
                                type="number"
                                value={teacher.experience_year}
                                onChange={(e) => setTeacher((prev) => ({...prev, experience_year: e.target.value}))}
                            />
                        </div>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label", "required")}>Trạng thái giảng dạy</p>   
                            <Select
                                className={cx('w-100')}
                                labelInValue
                                onChange={(e) => setTeacher((prev) => ({...prev, current_status: e.value}))}
                                options={TeachingStatusList}
                                placeholder='Chọn trạng thái'
                            />
                        </div>
                        <div className={cx("col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label", "required")}>Khoa</p>   
                            <Select
                                className={cx('w-100')}
                                labelInValue
                                onChange={(e) => setTeacher((prev) => ({...prev, department: e.value}))}
                                options={departments.length > 0 && departments.map((item) => ({
                                    value: item.id,
                                    label: item.department_name
                                }))}
                                placeholder='Chọn khoa'
                            />
                        </div>
                    </div>
                    <div className={cx('d-flex justify-content-end gap-3 mt-3')}>
                        <button 
                            className={cx("view-btn warn")} 
                            onClick={() => {
                                setTeacher(INIT_TEACHER_DATA);
                                setShow(false);
                            }}
                        >
                            Quay lại
                        </button>
                        <button 
                            className={cx("view-btn")} 
                            onClick={onSaveTeacher}
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