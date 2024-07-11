import React, { useEffect, useState } from "react";
import { faFileImport, faFilePdf, faPlus, faUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { DatePicker, Input, Spin, Table, notification } from "antd";
import dayjs from "dayjs";

import Search from "@/components/Search";
import { label } from "@/constant/label";
import { UPLOAD_FILE_TYPE } from "@/constant/upload-file";
import { NOTIFICATION_TYPE } from "@/constant/notification-type";
import { BUSINESS_COLUMNS } from "@/constant/column-data";
import { ROLE } from "@/constant/role";
import { generateAccount } from "@/helpers/create-account";
import { formattedDate } from "@/helpers/format";

import { GoogleService } from "@/services/google.service";
import { GeneralService } from "@/services/general.service";

const cx = classNames.bind(styles);
const { TextArea } = Input;

function CreatBusiness({ setShow }) {
    const INIT_BUSINESS_DATA = {
        id: null,
        name: "",
        image: null,
        phone: "",
        email: "",
        address: "",
        createAt: dayjs(),
        establishDate: dayjs(),
        industrySector: "",
        representator: "",
        shortDesc: "",
    }
    const [business, setBusiness] = useState(INIT_BUSINESS_DATA);
    const [image, setImage] = useState(null);
    const [api, contextHolder] = notification.useNotification();
    const [isPending, setIsPending] = useState(false);

    const openNotificationWithIcon = (type, message, description) => {
        return api[type]({
          message,
          description,
        });
    };

    const onUploadImage = (image) => {
        const file = image.files[0];
        if (image.files && image.files[0]) {
            setImage(URL.createObjectURL(file));
            setBusiness((prev) => ({...prev, image: image.files[0]}));
        }
    }

    const isValidEmail = (email) => {
        const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return email.match(emailFormat);
    }

    const isValidPhoneNumber = (phone) => {
        const phoneFormat = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        return phone.match(phoneFormat);
    }

    const postBusiness = (data) => {
        GeneralService
            .postBusiness(data)
            .then(() => {
                openNotificationWithIcon(NOTIFICATION_TYPE.SUCCESS, 'Thành công', 'Thêm mới doanh nghiệp thành công');
                setTimeout(() => setShow(false), 800);
                setIsPending(false);
                return;
            })
            .catch((err) => {
                openNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Thất bại', err);
                setIsPending(false);
            });
    }

    const onSaveBusiness = () => {
        if (!isPending) {
            const isFullFields = Object.keys(business).filter((key) => {
                if (key === 'id' || key === 'creatAt' || key === 'image') {
                    return true;
                }
                return business[key] === null || (typeof business[key] === 'string' && business[key].trim().length === 0);
            });
        
            if (isFullFields.length < Object.keys(business)) {
                openNotificationWithIcon('error', 'Lỗi', 'Vui lòng nhập đầy đủ thông tin');
                return;
            }
        
            if (!isValidEmail(business.email)) {
                openNotificationWithIcon('error', 'Lỗi', 'Vui lòng nhập đúng định dạng Email');
                return;
            }
        
            if (!isValidPhoneNumber(business.phone)) {
                openNotificationWithIcon('error', 'Lỗi', 'Vui lòng nhập đúng định dạng Số điện thoại');
                return;
            }
            setIsPending(true);
            const account = generateAccount(business.name, ROLE.BUSINESS);
        
            const body = {
                ...account,
                user_person: {
                    full_name: business.name,
                    phone: business.phone,
                    email: business.email,
                    address: business.address,
                    business: {
                        establish_date: business.establishDate,
                        industry_sector: business.industrySector,
                        representator: business.representator,
                        short_desc: business.shortDesc,
                    }
                }
            }
        
            if (business.image) {
                GoogleService
                    .uploadFile(business.image, UPLOAD_FILE_TYPE.PHOTO)
                    .then((imageLink) => {
                        body.user_person.image = imageLink;
                        postBusiness(body);
                    })
                    .catch((err) => {
                        openNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Thất bại', err);
                        setIsPending(false);
                    });
                return;
            }
        
            postBusiness(body);
        }
    }

    return (
        <div style={{padding: '0 15px'}}>
            { contextHolder }
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
                    <h4 className={cx('category-heading')}>{label['manage-app']["create-business"]}</h4>
                    <div className={cx("row mt-4")}>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label")}>Mã doanh nghiệp</p>   
                            <Input readOnly={true} disabled/>
                        </div>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label")}>Ngày tạo</p>   
                            <DatePicker 
                                className={cx('w-100')} 
                                value={business.createAt || ''}
                                disabled
                                inputReadOnly={true}
                                format={"DD-MM-YYYY"}
                            />
                        </div>
                        <div className={cx("col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label", "required")}>Tên doanh nghiệp</p>   
                            <Input 
                                type="text"
                                value={business.name} 
                                onChange={(e) => setBusiness((prev) => ({...prev, name: e.target.value}))}
                            />
                        </div>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label", "required")}>Số điện thoại</p>   
                            <Input 
                                type="phone"
                                value={business.phone} 
                                onChange={(e) => setBusiness((prev) => ({...prev, phone: e.target.value}))}
                            />
                        </div>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label", "required")}>Email</p>   
                            <Input 
                                type="email"
                                maxLength={50}
                                value={business.email}
                                onChange={(e) => setBusiness((prev) => ({...prev, email: e.target.value}))}
                            />
                        </div>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label", "required")}>Địa chỉ</p>   
                            <Input 
                                maxLength={100}
                                value={business.address}
                                onChange={(e) => setBusiness((prev) => ({...prev, address: e.target.value}))}
                            />
                        </div>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label", "required")}>Người đại diện</p>   
                            <Input 
                                value={business.representator}
                                onChange={(e) => setBusiness((prev) => ({...prev, representator: e.target.value}))}
                            />
                        </div>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label", "required")}>Lĩnh vực hoạt động</p>   
                            <TextArea
                                showCount
                                maxLength={100}
                                style={{
                                    height: 120,
                                    resize: 'none',
                                }}
                                value={business.industrySector}
                                onChange={(e) => setBusiness((prev) => ({...prev, industrySector: e.target.value}))}
                            />
                        </div>
                        <div className={cx("col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 mb-3")}>
                            <p className={cx("todo-label", "required")}>Mô tả ngắn</p>   
                            <TextArea
                                showCount
                                maxLength={100}
                                style={{
                                    height: 120,
                                    resize: 'none',
                                }}
                                value={business.shortDesc}
                                onChange={(e) => setBusiness((prev) => ({...prev, shortDesc: e.target.value}))}
                            />
                        </div>
                    </div>
                    <div className={cx('d-flex justify-content-end gap-3 mt-3')}>
                        <button 
                            className={cx("view-btn warn")} 
                            onClick={() => {
                                setBusiness(INIT_BUSINESS_DATA);
                                setShow(false);
                            }}
                        >
                            Quay lại
                        </button>
                        <button 
                            className={cx("view-btn")} 
                            onClick={onSaveBusiness}
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

export default function Business() {
    const [showAddScreen, setShowAddScreen] = useState(false);
    const [businesses, setBusinesses] = useState([]);
    const [loading, setLoading] = useState(false);

    const getBusinesses = () => {
        setLoading(true);
        GeneralService
            .getBusinesses()
            .then((res) => {
                let _businesses = [];
                res.data.items.forEach((item, index) => {
                    _businesses.push({
                        no: index + 1,
                        id: item.id,
                        full_name: item.user_person.full_name,
                        phone: item.user_person.phone,
                        email: item.user_person.email,
                        representator: item.representator,
                        establish_date: formattedDate(item.establish_date)
                    })
                })
                setBusinesses(_businesses);
                setLoading(false);
            })
    }

    useEffect(() => {
        getBusinesses();
    }, [showAddScreen])

    return (
        <React.Fragment>
        {
            showAddScreen ? (
                <CreatBusiness setShow={setShowAddScreen}/>
            ) : (
                <React.Fragment>
                    <div className={cx('d-flex flex-wrap justify-content-between mb-4')}>
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

                    <h4 className={cx('category-heading')}>Danh sách Doanh nghiệp</h4>
                    {
                        loading ? (
                            <div className={cx('h-100 w-100 d-flex align-items-center justify-content-center mt-5')}>
                                <Spin size="default"/>
                            </div>
                        ) : (
                            <Table className={cx('mt-3')} columns={BUSINESS_COLUMNS} dataSource={businesses} />
                        )
                    }
                </React.Fragment>
            )
        }
        </React.Fragment>
    )
}