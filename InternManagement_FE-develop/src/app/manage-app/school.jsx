'use client'
import React, { useEffect, useState } from 'react';
import { faFileImport, faFilePdf, faL, faPlus, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { DatePicker, Input, Modal, Spin, Table, notification } from 'antd';
import dayjs from 'dayjs';

import Search from '@/components/Search';
import { label } from '@/constant/label';
import { UPLOAD_FILE_TYPE } from '@/constant/upload-file';
import { NOTIFICATION_TYPE } from '@/constant/notification-type';
import { SCHOOL_COLUMNS } from '@/constant/column-data';
import { formattedDate } from '@/helpers/format';
import { DataValidator } from '@/helpers/valid-data';

import { GoogleService } from "@/services/google.service";
import { GeneralService } from "@/services/general.service";
import { generateAccount } from '@/helpers/create-account';
import { ROLE } from '@/constant/role';

const cx = classNames.bind(styles);

function CreateSchool({ setShow, openNotificationWithIcon }) {
    const INIT_SCHOOL_DATA = {
        id: null,
        name: "",
        shortHandName: "",
        createAt: dayjs(),
        establishDate: dayjs(),
        image: null,
        studyField: '',
    }
    const [school, setSchool] = useState(INIT_SCHOOL_DATA);
    const [image, setImage] = useState(null);
    const [isPending, setIsPending] = useState(false);


    const onUploadImage = (image) => {
        const file = image.files[0];
        if (image.files && image.files[0]) {
            setImage(URL.createObjectURL(file));
            setSchool((prev) => ({...prev, image: image.files[0]}));
        }
    }

    const isValidData = Object.keys(school).every((key) => {
        if (key === 'id' || key === 'createAt' || key === 'image') {
            return true;
        }
        if (school[key] === null || (typeof school[key] === 'string' && school[key].trim().length === 0)) {
            return false;
        }
        return true;
    })

    const postSchool = (data) => {
        GeneralService
            .postSchool(data)
            .then(() => {
                setIsPending(false);
                openNotificationWithIcon(NOTIFICATION_TYPE.SUCCESS, 'Thành công', 'Thêm mới trường học thành công');
                setTimeout(() => setShow(false), 800);
            })
            .catch((err) => openNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Thất bại', err));
    }

    const onSaveSchool = () => {
        if (!isPending) {
            if (!isValidData) {
                openNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Thất bại', 'Vui lòng điền đầy đủ thông tin');
                return;
            }
            setIsPending(true);
            const body = {
                school_name: school.name,
                shorthand_name: school.shortHandName,
                establish_date: school.establishDate,
                study_field: school.studyField,
            }
    
            if (school.image) {
                GoogleService
                    .uploadFile(school.image, UPLOAD_FILE_TYPE.PHOTO)
                    .then((imageLink) => {
                        body.avatar = imageLink;
                        postSchool(body);
                    })
                    .catch((err) => openNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Thất bại', err))
    
                return;
            }
    
            postSchool(body);
            return;
        }
    }

    return (
        <div style={{padding: '0 15px'}}>
            <div className={cx("row")}>
                <div className={cx("col-xl-3 col-lg-4 col-md-12 col-sm-12 col-xs-12 text-center mt-3")}>
                    <h4 className={cx('category-heading')}>{label['manage-app']["logo"]}</h4>
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
                    <h4 className={cx('category-heading')}>{label['manage-app']["create-school"]}</h4>
                    <div className={cx("row mt-4")}>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label")}>Mã trường</p>   
                            <Input readOnly={true} disabled/>
                        </div>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label")}>Ngày tạo</p>   
                            <DatePicker 
                                className={cx('w-100')} 
                                value={school.createAt || ''}
                                disabled
                                inputReadOnly={true}
                                format={"DD-MM-YYYY"}
                            />
                        </div>
                        <div className={cx("col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label", "required")}>Tên trường</p>   
                            <Input 
                                value={school.name} 
                                onChange={(e) => setSchool((prev) => ({...prev, name: e.target.value}))}
                                maxLength={50}
                            />
                        </div>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label", "required")}>Tên viết tắt</p>   
                            <Input 
                                value={school.shortHandName} 
                                onChange={(e) => setSchool((prev) => ({...prev, shortHandName: e.target.value}))}
                                maxLength={20}
                            />
                        </div>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label", "required")}>Ngày thành lập</p>   
                            <DatePicker 
                                className={cx('w-100')} 
                                value={school.establishDate || ''}
                                onChange={(date) => setSchool((prev) => ({...prev, establishDate: date}))} 
                                format={"DD-MM-YYYY"}
                            />
                        </div>
                        <div className={cx("col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label", "required")}>Lĩnh vực đào tạo</p>   
                            <Input 
                                value={school.studyField} 
                                onChange={(e) => setSchool((prev) => ({...prev, studyField: e.target.value}))}
                                maxLength={50}
                            />
                        </div>
                    </div>
                    <div className={cx('d-flex justify-content-end gap-3 mt-3')}>
                        <button 
                            className={cx("view-btn warn")} 
                            onClick={() => {
                                setSchool(INIT_SCHOOL_DATA);
                                setShow(false);
                            }}
                        >
                            Quay lại
                        </button>
                        <button 
                            className={cx("view-btn")} 
                            onClick={onSaveSchool}
                        >
                            {isPending && <Spin size='small' style={{marginRight: 8}}/> }
                            Tạo mới
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
} 

function CreateAccount({ setAccount, account }) {
    const [image, setImage] = useState(null);

    const onUploadImage = (image) => {
        const file = image.files[0];
        if (image.files && image.files[0]) {
            setImage(URL.createObjectURL(file));
            setAccount((prev) => (
                {...prev, image: image.files[0]}
            ));
        }
    }

    return (
        <div className={cx("row")}>
            <div className={cx("col-xl-3 col-lg-4 col-md-12 col-sm-12 col-xs-12 text-center mt-3")}>
                <h4 className={cx('category-heading')}>{label['manage-app']["logo"]}</h4>
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
                <h4 className={cx('category-heading')}>{label['manage-app']["create-account"]}</h4>
                <div className={cx("row mt-4")}>
                    <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                        <p className={cx("todo-label")}>Ngày tạo</p>   
                        <DatePicker 
                            className={cx('w-100')} 
                            value={account.createAt || ''}
                            disabled
                            inputReadOnly={true}
                            format={"DD-MM-YYYY"}
                        />
                    </div>
                    <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                        <p className={cx("todo-label", "required")}>Họ và tên</p>   
                        <Input 
                            value={account.full_name} 
                            onChange={(e) => setAccount((prev) => ({...prev, full_name: e.target.value}))}
                            maxLength={100}
                        />
                    </div>
                    <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                        <p className={cx("todo-label", "required")}>Email</p>   
                        <Input 
                            value={account.email} 
                            onChange={(e) => setAccount((prev) => ({...prev, email: e.target.value}))}
                            maxLength={50}
                        />
                    </div>
                    <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                        <p className={cx("todo-label", "required")}>Số điện thoại</p>   
                        <Input 
                            type='tel'
                            value={account.phone} 
                            onChange={(e) => setAccount((prev) => ({...prev, phone: e.target.value}))}
                            maxLength={10}
                        />
                    </div>
                    <div className={cx("col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                        <p className={cx("todo-label", "required")}>Địa chỉ</p>   
                        <Input 
                            value={account.address} 
                            onChange={(e) => setAccount((prev) => ({...prev, address: e.target.value}))}
                            maxLength={100}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function School() {
    const INIT_ADMIN_ACCOUNT_DATA = {
        id: '',
        email: '',
        full_name: '',
        phone: '',
        address: '',
        image: '',
    }
    const [account, setAccount] = useState(INIT_ADMIN_ACCOUNT_DATA);
    const [selectedSchool, setSelecteSchool] = useState({});
    const [showAddScreen, setShowAddScreen] = useState(false);
    const [schools, setSchools] = useState([]);
    const [loading, setLoading] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [isPending, setIsPending] = useState(false);

    const openNotificationWithIcon = (type, message, description) => {
        return api[type]({
          message,
          description,
        });
    };

    const getAllSchools = () => {
        setLoading(true);
        GeneralService
            .getAllSchools()
            .then((res) => {
                let _schools = [];
                res.data.forEach((item, index) => {
                    _schools.push({
                        ...item,
                        no: index + 1,
                        establish_date: formattedDate(item.establish_date),
                    })
                } )
                setSchools(_schools);
                setLoading(false);
            })
    }

    useEffect(() => {
        getAllSchools();
    }, []);

    const isFullFields = Object.keys(account).every((key) => {
        if (key === 'id' || key === 'image') {
            return true;
        }

        const isEmptyField = (account[key] === null) || 
            (typeof account[key] === 'string' && account[key].trim().length === 0);
        
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

        if (!DataValidator.isValidPhoneNumber(account.phone)) {
            openNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Lỗi', 'Vui lòng nhập đúng định dạng Số điện thoại');
            setIsPending(false);
            return false;
        }

        if (!DataValidator.isValidEmail(account.email)) {
            openNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Lỗi', 'Vui lòng nhập đúng định dạng Email');
            setIsPending(false);
            return false;
        }

        return true;
    }

    const handleCreateAccount = () => {
        if (isValidData() && !isPending) {
            generateAccount(account.full_name, ROLE.ADMIN, true, selectedSchool.shorthand_name)
                .then((userAccount) => {
                    let body = {
                        ...userAccount,
                        user_person: {
                            email: account.email,
                            full_name: account.full_name,
                            phone: account.phone,
                            address: account.address,
        
                            administrator: {
                                school_id: selectedSchool.id
                            }
                        }
                    };
        
                    if (account.image) {
                        GoogleService
                            .uploadFile(account.image, UPLOAD_FILE_TYPE.PHOTO)
                            .then((imageUrl) => {
                                body.user_person.image = imageUrl;
                                postData(body);
                            })
                            .catch((error) => {
                                setIsPending(false);
                                openNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Thất bại', error);
                            })
                    } else {
                        postData(body);
                    }
                });
        }
    }

    const postData = (data) => {
        GeneralService
            .createAccount(data)
            .then(() => {
                setIsPending(false);
                openNotificationWithIcon(
                    NOTIFICATION_TYPE.SUCCESS, 
                    'Thành công', 
                    `Tạo tài khoản cho trường ${selectedSchool.school_name} thành công`
                );
                setTeacher(INIT_TEACHER_DATA);
                setTimeout(() => {
                    setShow(false);
                }, 500);
            })
            .catch(error => {
                openNotificationWithIcon(
                    NOTIFICATION_TYPE.ERROR, 
                    'Thất bại', 
                    error
                );
            })
    }

    return (
        <React.Fragment>
            { contextHolder }
            {
                showAddScreen ? (
                    <CreateSchool setShow={setShowAddScreen} openNotificationWithIcon={openNotificationWithIcon}/>
                ) : (
                    <React.Fragment>
                        <div className={cx('d-flex justify-content-between flex-wrap mb-4')}>
                            <Search classList={['mt-2']}/>
                            <div className={cx("d-flex gap-3 mt-2")}>
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
                                {/* <button 
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
                                </button> */}
                            </div>
                        </div>

                        <h4 className={cx('category-heading')}>Danh sách Trường</h4>
                        {
                            loading ? (
                                <div className={cx('h-100 w-100 d-flex align-items-center justify-content-center mt-5')}>
                                    <Spin size="default"/>
                                </div>
                            ) : (
                                <Table 
                                    className={cx('mt-3')} 
                                    columns={SCHOOL_COLUMNS} 
                                    dataSource={schools} 
                                    onRow={(record, rowIndex) => {
                                        return {
                                            onClick: event => { 
                                                console.log('record: ', record);
                                                setSelecteSchool(record);
                                            }, // click row
                                        };
                                    }}
                                />
                            )
                        }
                        <Modal
                            title="Thông tin tài khoản"
                            centered
                            open={Object.keys(selectedSchool).length > 0}
                            onCancel={() => setSelecteSchool({})}
                            width={800}
                            footer={[
                                <button 
                                    className={cx('view-btn')} 
                                    onClick={handleCreateAccount}
                                >
                                    { isPending && <Spin size='small' style={{ marginRight: 8 }}/>}
                                    Tạo mới
                                </button>,
                                <button 
                                    className={cx('view-btn', 'cancel')} 
                                    onClick={() => setSelecteSchool({})}
                                >
                                    Đóng
                                </button>,
                            ]}
                        >
                            <CreateAccount account={account} setAccount={setAccount}/>
                        </Modal>
                    </React.Fragment>
                )
            }
        </React.Fragment>
    )
}