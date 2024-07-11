'use client'
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { 
    faBookOpenReader, 
    faChalkboardTeacher, 
    faHome, 
    faLandmark, 
    faPeopleRoof, 
    faSchool, 
    faTrash, 
    faUserGraduate 
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { Image } from "next/image";
import { 
    LineChart, 
    Line, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    Legend, 
    ResponsiveContainer,
} from 'recharts';

import classNames from "classnames/bind";
import styles from "./page.module.scss";

import Header from "@/components/Header";
import Loading from "@/components/Loading";
import { ROLE } from "@/constant/role";
import { NOTIFICATION_TYPE } from "@/constant/notification-type";

import { GeneralService } from "@/services/general.service";
import { Input, Popconfirm, Spin, notification } from "antd";

const cx = classNames.bind(styles);

const MANAGEMENT_ITEMS = [
    {
        name: 'countProgram',
        title: 'Chương trình học',
        desc: 'Chương trình đào tạo',
        quantity: null,
        path: '/admin/program',
        "icon-background-color": 'var(--green-1-color)',
        color: 'var(--green-4-color)',
        icon: faSchool,
    },
    {
        name: 'countDepartment',
        title: 'Khoa',
        desc: 'Khoa và phòng ban',
        quantity: null,
        path: '/admin/department',
        "icon-background-color": 'var(--red-1-color)',
        color: 'var(--red-4-color)',
        icon: faLandmark,
    },
    {
        name: 'countMajor',
        title: 'Ngành học',
        desc: 'Ngành học đào tạo',
        quantity: null,
        path: '/admin/major',
        "icon-background-color": 'var(--blue-1-color)',
        color: 'var(--blue-4-color)',
        icon: faBookOpenReader,
    },
    {
        name: 'countClass',
        title: 'Lớp',
        desc: 'Danh sách lớp học',
        quantity: null,
        path: '/admin/class',
        "icon-background-color": 'var(--orange-1-color)',
        color: 'var(--orange-4-color)',
        icon: faPeopleRoof,
    },
    {
        name: 'countTeacher',
        title: 'Giảng viên',
        desc: 'Giảng viên giảng dạy',
        quantity: null,
        path: '/admin/teacher',
        "icon-background-color": 'var(--purple-1-color)',
        color: 'var(--purple-4-color)',
        icon: faChalkboardTeacher,
    },
    {
        name: 'countStudent',
        title: 'Sinh viên',
        desc: 'Sinh viên được đào tạo',
        quantity: null,
        path: '/admin/student',
        "icon-background-color": 'var(--volcano-1-color)',
        color: 'var(--volcano-4-color)',
        icon: faUserGraduate,
    },
]

const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
];

export default function AdminHome() {
    const [school, setSchool] = useState(null);
    const loading = useSelector((state) => state.loading);
    const role = useSelector((state) => state.role);

    const [graphState, setGraphState] = useState({
        opacity: {
            uv: 1,
            pv: 1,
        },
    });
    const [academicName, setAcademicName] = useState('');
    const [semesterName, setSemesterName] = useState('');
    const [academicYears, setAcademicYears] = useState([]);
    const [semesters, setSemesters] = useState([]);
    const [loadingPage, setLoadingPage] = useState(true);
    const [isAcademicPending, setIsAcademicPending] = useState(false);
    const [isSemesterPending, setIsSemesterPending] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    
    const openNotificationWithIcon = (type, message, description) => {
        return api[type]({
            message,
          description,
        });
    };

    const getSchool = async () => {
        await GeneralService
            .getSchool()
            .then((res) => {
                setSchool(res.data);
            })
    }

    useEffect(() => {
        if (role !== ROLE.UNLOGINED) {
            getSchool();
        }
    }, [role])

    const setItemData = () => MANAGEMENT_ITEMS.map((item) => 
        item.quantity = school[`${item.name}`]
    )

    const getAllAcademicYears = () => {
        GeneralService
        .getAcademicYears(school.school_id)
        .then((res) => {
            setAcademicYears(res.data?.items);
        })
        .catch((error) => {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.ERROR,
                "Thất bại",
                error
            );
        }); 
    }

    const getAllSemesters = () => {
        GeneralService
        .getAllSemesters(school.school_id)
        .then((res) => {
            setSemesters(res.data);
        })
        .catch((error) => {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.ERROR,
                "Thất bại",
                error
            );
        })
    }

    useEffect(() => {
        if (school) {
            getAllAcademicYears();
            getAllSemesters();
            setItemData();
            setLoadingPage(false);
        }
    }, [school])

    const handleMouseEnter = (o) => {
        const { dataKey } = o;
        const { opacity } = graphState;
    
        setGraphState({
          opacity: { ...opacity, [dataKey]: 0.5 },
        });
    };

    const handleMouseLeave = (o) => {
        const { dataKey } = o;
        const { opacity } = graphState;

        setGraphState({
            opacity: { ...opacity, [dataKey]: 1 },
        });
    };

    const getEstablishedYear = () => {
        return new Date(Date.parse(school?.school_establish_date)).getUTCFullYear();
    }

    const handlePostNewAcademicYear = () => {
        if (academicName.trim().length === 0) {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.ERROR, 
                "Thất bại", 
                "Vui lòng nhập thông tin niên khóa đầy đủ"
            );
            return;
        }

        if (parseInt(academicName) > new Date().getUTCFullYear()) {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.ERROR, 
                "Thất bại", 
                "Niên khóa phải nhỏ hơn hoặc bằng năm hiện tại"
            );
            return;
        }

        if (parseInt(academicName.trim()) < getEstablishedYear()) {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.ERROR,
                "Thất bại",
                "Niên khóa phải lớn hơn năm thành lập"
            );
            return;
        }

        setIsAcademicPending(true);

        GeneralService
        .postAcademicYear(school.school_id, { 
            current_year: parseInt(academicName)
        })
        .then(() => {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.SUCCESS,
                "Thành công",
                "Thêm mới niên khóa thành công"
            );
            setAcademicName('');
            getAllAcademicYears();
            setIsAcademicPending(false);
        })
        .catch((error) => {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.ERROR,
                "Thất bại",
                error
            );
            setIsAcademicPending(false);
        })
    }

    const handlePostNewSemester = () => {
        if (semesterName.trim().length === 0) {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.ERROR, 
                "Thất bại", 
                "Vui lòng nhập thông tin học kỳ đầy đủ"
            );
            return;
        }

        setIsSemesterPending(true);

        GeneralService
        .postSemester(school.school_id, { semester_name: semesterName})
        .then(() => {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.SUCCESS,
                "Thành công",
                "Thêm mới học kỳ thành công"
            );
            setSemesterName('');
            getAllSemesters();
            setIsSemesterPending(false);
        })
        .catch((error) => {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.ERROR,
                "Thất bại",
                error
            );
            setIsSemesterPending(false);
        })
    }

    const handleDeleteAcademicYear = (academicYear) => {
        const yearId = academicYear?.id;

        GeneralService
        .deleteAcademicYear(school.school_id, yearId)
        .then(() => {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.SUCCESS,
                "Thành công",
                "Xóa niên khóa thành công"
            );
            getAllAcademicYears();
        })
        .catch((error) => {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.ERROR,
                "Thất bại",
                error
            );
        })
    }

    const handleDeleteSemester = (semester) => {
        const semesterId = semester?.id;

        GeneralService
        .deleteSemester(school.school_id, semesterId)
        .then(() => {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.SUCCESS,
                "Thành công",
                "Xóa học kỳ thành công"
            );
            getAllSemesters();
        })
        .catch((error) => {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.ERROR,
                "Thất bại",
                error
            );
        })
    }

    return (
        <>
            { contextHolder }
            <div className={cx("wrapper")}>
                <Header title={'Trang chủ'} icon={faHome}/>
                {
                    loadingPage ? (
                        <Loading />
                    ) : (
                        <div className={cx("categories")}>

                            <Row>
                                <div className={cx("col-xl-8 col-lg-12 col-md-12 col-sm-12 col-12")}>
                                    <Row>
                                        {
                                            MANAGEMENT_ITEMS.map((item, index) => (
                                                <Col 
                                                    xs={12}
                                                    sm={12}
                                                    md={6}
                                                    lg={6} 
                                                    xl={4}
                                                    key={index}
                                                >
                                                    <Link 
                                                        className={cx(
                                                            "category-item", 
                                                            "d-flex", 
                                                            "align-items-center",
                                                            "gap-2",
                                                            "mb-4",
                                                            "text-decoration-none", 
                                                        )} 
                                                        href={{ 
                                                            pathname: item?.path, 
                                                            query: { 'schoolId': school?.school_id } 
                                                        }}
                                                        prefetch={false}
                                                    >
                                                        <div 
                                                            className={cx(
                                                                'd-flex justify-content-center align-items-center'
                                                            )}
                                                            style={{ 
                                                                width: 50, 
                                                                height: 50, 
                                                                minWidth: 50,
                                                                borderRadius: '50%',
                                                                backgroundColor: item["icon-background-color"]
                                                            }}
                                                        >
                                                            <FontAwesomeIcon 
                                                                icon={item.icon} 
                                                                style={{fontSize: 20, color: item.color}}
                                                            />
                                                        </div>
                                                        <div className={cx("ms-3")} style={{ flex: 1 }}>
                                                            <h5 className={cx('category-item__quantity')}>
                                                                {item?.quantity}
                                                            </h5>
                                                            <h5 className={cx('category-item__title')}>
                                                                {item?.title}
                                                            </h5>
                                                            <h5 className={cx('category-item__desc', 'mt-1')}>
                                                                {item?.desc}
                                                            </h5>
                                                        </div>
                                                    </Link>
                                                </Col>
                                            ))
                                        }
                                    </Row>
                                    <ResponsiveContainer className={cx('category-item', 'mb-4')} width="100%" height={300}>
                                        <LineChart
                                            width="100%"
                                            height={500}
                                            data={data}
                                            margin={{
                                                top: 5,
                                                right: 30,
                                                left: 20,
                                                bottom: 5,
                                            }}
                                        >
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend 
                                                onMouseEnter={(e) => handleMouseEnter(e)} 
                                                onMouseLeave={(e) => handleMouseLeave(e)} 
                                            />
                                            <Line 
                                                type="monotone" 
                                                dataKey="pv" 
                                                strokeOpacity={graphState.opacity.pv} 
                                                stroke="#8884d8" 
                                                activeDot={{ r: 8 }} 
                                            />
                                            <Line 
                                                type="monotone" 
                                                dataKey="uv" 
                                                strokeOpacity={graphState.opacity.uv} 
                                                stroke="#82ca9d" 
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                                <div className={cx("col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12")}>
                                    <div className={cx("category-item", "mb-4")}>
                                        <h5 className={cx('category-item__title')}>Thông tin niên khóa</h5>
                                        <div className={cx('d-flex gap-2 mt-3')}>
                                            <Input 
                                                type="number"
                                                maxLength={50}
                                                placeholder="Niên khóa"
                                                min={0}
                                                style={{ flex: 1 }}
                                                value={academicName}
                                                onChange={(e) => setAcademicName(e.target.value)}
                                            />
                                            <button 
                                                className={cx('view-btn')}
                                                onClick={() => handlePostNewAcademicYear()}
                                            >
                                                { isAcademicPending && 
                                                    <Spin size="small" style={{ marginRight: 8 }}/> }
                                                Thêm mới
                                            </button>
                                        </div>
                                        <div className={cx('mt-3', 'academic-list')}>
                                            {
                                                academicYears.length > 0 && academicYears.map((year, index) => (
                                                    <div key={index} className={cx('mt-1 d-flex align-items-center')}>
                                                        <img 
                                                            src={school?.school_avatar} 
                                                            alt="school logo" 
                                                            style={{
                                                                width: 50,
                                                                height: 50,
                                                                borderRadius: '50%',
                                                                objectFit: 'cover'
                                                            }}
                                                        />
                                                        <span className={cx('ms-2')} style={{ fontSize: 14 }}>
                                                            K{year.current_year - getEstablishedYear() + 1} - {year.current_year}
                                                        </span>
                                                        <Popconfirm
                                                            title="Xóa niên khóa"
                                                            description="Bạn chắc chắn xóa niên khóa này chứ?"
                                                            onConfirm={() => handleDeleteAcademicYear(year)}
                                                            onCancel={() => {}}
                                                            okText="Đồng ý"
                                                            cancelText="Hủy bỏ"
                                                        >
                                                            <FontAwesomeIcon 
                                                                style={{ marginLeft: 'auto', cursor: 'pointer' }}
                                                                icon={faTrash} 
                                                                color="var(--red-4-color)"
                                                            />
                                                        </Popconfirm>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className={cx("category-item")}>
                                        <h5 className={cx('category-item__title')}>Thông tin học kỳ</h5>
                                        <div className={cx('d-flex gap-2 mt-3')}>
                                            <Input 
                                                type="text"
                                                maxLength={50}
                                                placeholder="Học kỳ"
                                                style={{ flex: 1 }}
                                                value={semesterName}
                                                onChange={(e) => setSemesterName(e.target.value)}
                                            />
                                            <button 
                                                className={cx('view-btn')}
                                                onClick={() => handlePostNewSemester()}
                                            >
                                                { isSemesterPending && 
                                                    <Spin size="small" style={{ marginRight: 8 }}/> }
                                                Thêm mới
                                            </button>
                                        </div>
                                        <div className={cx('mt-3', 'semester-list')}>
                                            {
                                                semesters.length > 0 && semesters.map((semester, index) => (
                                                    <div key={index} className={cx('mt-1 d-flex align-items-center')}>
                                                        <img 
                                                            src={school?.school_avatar} 
                                                            alt="school logo" 
                                                            style={{
                                                                width: 50,
                                                                height: 50,
                                                                borderRadius: '50%',
                                                                objectFit: 'cover'
                                                            }}
                                                        />
                                                        <span className={cx('ms-2')} style={{ fontSize: 14 }}>
                                                            {semester.semester_name}
                                                        </span>
                                                        <Popconfirm
                                                            title="Xóa học kỳ"
                                                            description="Bạn chắc chắn xóa học kỳ này chứ?"
                                                            onConfirm={() => handleDeleteSemester(semester)}
                                                            onCancel={() => {}}
                                                            okText="Đồng ý"
                                                            cancelText="Hủy bỏ"
                                                        >
                                                            <FontAwesomeIcon 
                                                                style={{ marginLeft: 'auto', cursor: 'pointer' }}
                                                                icon={faTrash} 
                                                                color="var(--red-4-color)"
                                                            />
                                                        </Popconfirm>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </Row>
                        </div>
                    )
                }
            </div>
        </>
    )
}