'use client'
import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { Row, Col } from "react-bootstrap";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { 
    faBriefcase, 
    faCheck, 
    faEllipsis, 
    faEye, 
    faPlus, 
    faThumbsUp, 
    faXmark 
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { 
    DatePicker, 
    Select, 
    Input, 
    Button, 
    Modal, 
    Tooltip, 
    Empty,
    Spin,
    notification
} from "antd";
import Link from "next/link";
import dayjs from "dayjs";

import Header from "@/components/Header";
import FieldSet from "@/components/FieldSet";
import { COMPLETED_STATUS, FINISHED_STATUS, TODO_STATUS } from "@/constant/todo-status";
import { label } from "@/constant/label";
import { NOTIFICATION_TYPE } from "@/constant/notification-type";
import { formattedDate } from "@/helpers/format";

import { TodoService } from "@/services/todo.service";

const { Search } = Input;
const { TextArea } = Input;
const cx = classNames.bind(styles);

const STATUSES = Object.keys(TODO_STATUS).map(item => {
    if (item === 'all') {
        return {
            label: 'Tất cả',
            value: null
        }
    }
    if (item === 'active') {
        return {
            label: 'Đang thực hiện',
            value: 0
        }
    }
    if (item === 'completed') {
        return {
            label: 'Hoàn thành',
            value: 1
        }
    }
    return {
        label: 'Quá hạn',
        value: 2
    }
});

function ViewTodo({ regularId, todo, openNotificationWithIcon, reRender }) {
    const [appreciation, setAppreciation] = useState('');
    const [isPending, setIsPending] = useState(false);

    const handleSendAppreciation = () => {
        if (appreciation.trim() === '') {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.ERROR,
                "Thất bại",
                "Vui lòng nhập thông tin đánh giá trước khi gửi"
            );
            return;
        }
        setIsPending(true);

        const _currentAppreciations = [];
        if (todo?.todoAppreciation.length > 0) {
            todo.todoAppreciation.forEach((item) => _currentAppreciations.push(item.content));
        }
        _currentAppreciations.push(appreciation);

        const data = {
            id: todo.id,
            todo_name: todo.todo_name,
            start_date: todo.start_date,
            end_date: todo.end_date,
            todoAppreciation: _currentAppreciations
        }

        TodoService
            .saveTodo(regularId, data)
            .then(() => {
                openNotificationWithIcon(
                    NOTIFICATION_TYPE.SUCCESS,
                    "Thành công",
                    "Bạn đã gửi đánh giá thành công"
                );
                reRender();
                setAppreciation('');
                setIsPending(false);
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
        <div className={cx('todo-wrapper')}>
            <div className={cx('d-flex justify-content-between')}>
                <div style={{ marginRight: '20px' }}>
                    <p className={cx("todo-label")}>Tên công việc</p>
                    <h5 className={cx("todo-content")}>{ todo.todo_name }</h5>
                </div>
                <div style={{ marginRight: '20px' }}>
                    <p className={cx("todo-label")}>Ngày bắt đầu</p>
                    <h5 className={cx("todo-content")}>{ formattedDate(todo.start_date) }</h5>
                </div>
                <div style={{ marginRight: '20px' }}>
                    <p className={cx("todo-label")}>Ngày hết hạn</p>
                    <h5 className={cx("todo-content")}>{ formattedDate(todo.end_date) }</h5>
                </div>
            </div>
            <div className={cx('mt-5')}>
                <FieldSet heading={"Đánh giá công việc"}>
                    {
                        todo?.todoAppreciation?.length > 0 ? (
                            todo?.todoAppreciation.map((item, index) => (
                                <Row className={cx("appreciation-item")} key={index}>
                                    <Col xs={12} md={9} lg={8} xl={8}>
                                        <p className={cx("todo-label")}>Đánh giá</p>
                                        <p className={cx("todo-content")}>{ item?.content }</p>
                                    </Col>
                                    <Col xs={12} md={3} lg={4} xl={4}>
                                        <p className={cx("todo-label")}>Ngày tạo</p>
                                        <p className={cx("todo-content")}>{ formattedDate(item?.createdAt) }</p>
                                    </Col>
                                </Row>
                            ))
                        ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                    }
                </FieldSet>
            </div>
            <div className={cx('mt-3 mb-3')}>
                <p className={cx("todo-label", "mb-2")}>Nội dung đánh giá mới</p>
                <TextArea
                    showCount
                    maxLength={1000}
                    value={appreciation}
                    onChange={(e) => setAppreciation(e.target.value)}
                    placeholder="Nhập đánh giá"
                    style={{ height: 80, resize: 'none' }}
                />
                <button className={cx('view-btn', 'optional', 'mt-2')} onClick={handleSendAppreciation}>
                    { 
                        isPending ? 
                            <Spin size="small" style={{ marginRight: 8, color: 'var(--purple-5-color)' }} /> : 
                            <FontAwesomeIcon icon={faPaperPlane} size="sm" style={{ marginRight: 8 }}/>
                    }
                    Gửi đánh giá
                </button>
            </div>
        </div>
    )
}

function CreateTodo({ setTodo, setStartDate, setEndDate }) {
    return (
        <div className={cx('row')}>
            <div className={cx("col-12 mb-3")}>
                <p className={cx("todo-label")}>Tên công việc</p>   
                <Input 
                    type="text" 
                    onChange={(e) => setTodo((prev) => ({ ...prev, todo_name: e.target.value }))}
                />
            </div>
            <div className={cx("col-12 mb-3")}>
                <p className={cx("todo-label")}>Ngày bắt đầu</p>   
                <DatePicker 
                    format={"DD-MM-YYYY"} 
                    placeholder="Chọn ngày" 
                    className={cx('w-100')}
                    onChange={(date, dateString) => {
                        setTodo((prev) => ({ ...prev, start_date: date }));
                        setStartDate(dateString);
                    }}
                />
            </div>
            <div className={cx("col-12 mb-3")}>
                <p className={cx("todo-label")}>Ngày kết thúc</p>   
                <DatePicker 
                    format={"DD-MM-YYYY"} 
                    placeholder="Chọn ngày" 
                    className={cx('w-100')}
                    onChange={(date, dateString) => {
                        setTodo((prev) => ({ ...prev, end_date: date }));
                        setEndDate(dateString);
                    }}
                />
            </div>
        </div>
    )
}

export default function BusinessTodo() {
    const router = useRouter();
    const role = useSelector(state => state.role);
    const searchParams = useSearchParams();
    const studentId = searchParams.get('studentId');

    const INIT_TODO_DATA = {
        todo_name: '',
        start_date: dayjs(),
        end_date: dayjs(),
    }
    const [regularId, setRegularId] = useState(null);
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState(INIT_TODO_DATA);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Filter
    const [currentDate, setCurrentDate] = useState({ date: null, dateString: ''});
    const [currentSelectedStatus, setCurrentSelectedStatus] = useState(STATUSES[0]);
    const [searchInput, setSearchInput] = useState('');
    const [selectedTodo, setSelectedTodo] = useState({});

    const [isLoading, setIsLoading] = useState(true);

    const [showCreateNewTodo, setShowCreateNewTodo] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (type, message, description) => {
        return api[type]({
          message,
          description,
        });
    };


    function getTodoList() {
        TodoService
            .getTodoList(studentId)
            .then((res) => {
                setRegularId(res.data.id);
                setTodos(res.data.detailTodo);
                setIsLoading(false);
            })
    }

    useEffect(() => {
        if (studentId) {
            getTodoList();
        }
    }, [studentId])

    useEffect(() => {
        if (todos && Object.keys(selectedTodo).length > 0) {
            const todo = todos.filter((_todo) => _todo.id === selectedTodo.id)[0];
            setSelectedTodo(todo);
        }
    }, [todos])

    function onChangeDate(date, dateString) {
        setCurrentDate({
            date, 
            dateString
        });
    }

    function filterTodo() {
        if (currentSelectedStatus === null) {

        } else {

        }
    }

    useEffect(() => {
        filterTodo();
    }, [currentSelectedStatus])

    function onSearch(value) {

    }

    function onClear() {
        setSearchInput('');
    }

    function handleCreateTodo() {
        if (
                todo.todo_name.trim() === '' || 
                startDate === '' || 
                endDate === ''
        ) {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.ERROR,
                "Thất bại",
                "Vui lòng điền đầy đủ thông tin trước khi tạo công việc"
            );
            return;
        }

        if (todo.start_date > todo.end_date) {
            openNotificationWithIcon(
                NOTIFICATION_TYPE.ERROR,
                "Thất bại",
                "Ngày bắt đầu phải nhỏ hơn hoặc bằng ngày kết thúc"
            );
            return;
        }

        TodoService
            .saveTodo(
                regularId, 
                { 
                    todo_name: todo.todo_name, 
                    start_date: todo.start_date, 
                    end_date: todo.end_date,
                    completed_status: COMPLETED_STATUS.PROCESSING
                })
            .then(() => {
                openNotificationWithIcon(
                    NOTIFICATION_TYPE.SUCCESS,
                    "Thành công",
                    "Tạo mới công việc thành công"
                );
                setShowCreateNewTodo(false);
                setTodo(INIT_TODO_DATA);
                getTodoList();
            })
            .catch((error) => {
                openNotificationWithIcon(
                    NOTIFICATION_TYPE.SUCCESS,
                    "Thất bại",
                    error
                );
            })
    }

    return (
        <div className={cx('wrapper')}>
            { contextHolder }
            <Header title={'Nhiệm vụ'} icon={faBriefcase}/>
            <div className={cx('contact-container')}>
                <div className={cx('d-flex justify-content-between align-items-center')}>
                    <h4 className={cx('category-heading')}>{label.todo["todo-label"]}</h4>
                    <Link
                        href={"/business/manage-intern"}
                        className={cx('view-btn', 'warn')}
                        style={{ marginRight: 15, textDecoration: 'none' }}
                    >
                        Quay lại
                    </Link>
                </div>
                <div className={("d-flex align-items-end flex-wrap gap-2")} style={{ marginLeft: 15}}>
                    <div>
                        <p 
                            className={cx("todo-label")} 
                            style={{ marginBottom: '4px', marginRight: '10px', fontSize: '14px' }}
                        >Chọn ngày</p>
                        <DatePicker 
                            value={currentDate?.date} 
                            onChange={onChangeDate} 
                            placeholder="Lựa chọn ngày"
                        />
                    </div>
                    <div>
                        <p 
                            className={cx("todo-label")} 
                            style={{ marginBottom: '4px', marginRight: '10px', fontSize: '14px' }}
                        >Trạng thái</p>
                        <Select
                            defaultValue={currentSelectedStatus}
                            style={{ width: 150 }}
                            options={STATUSES}
                            onChange={(status) => setCurrentSelectedStatus(status)}
                        />
                    </div>
                    <div style={{ width: '300px' }}>
                        <p 
                            className={cx("todo-label")} 
                            style={{ marginBottom: '4px', marginRight: '10px', fontSize: '14px' }}
                        >Tên công việc</p>
                        <Search
                            value={searchInput}
                            placeholder="Tìm kiếm"
                            allowClear
                            onSearch={onSearch}
                            onChange={(e) => setSearchInput(e.target.value)}
                            onReset={onClear}
                            className={cx('w-100')}
                        />
                    </div>
                    <button 
                        className={cx('view-btn')}
                        onClick={() => setShowCreateNewTodo(true)}
                    >
                        <FontAwesomeIcon icon={faPlus} size="sm" style={{ marginRight: 8 }}/>
                        Thêm mới
                    </button>
                </div>
                <div className={cx('intern-main')}>
                    {
                        isLoading ? (
                            <div className={cx('w-100 text-center mt-4')}>
                                <Spin size="small" className={cx('mt-4')}/>
                            </div>
                        ) : (
                            todos.length > 0 ? (
                                todos.map((todo, index) => (
                                    <Row key={index} className={cx("todo-item", {
                                        "expired": todo.out_of_expire === FINISHED_STATUS.OUT_OF_EXPIRE,
                                        "completed": todo.completed_status === COMPLETED_STATUS.FINISHED && todo.out_of_expire === FINISHED_STATUS.ON_TIME,
                                        "active": todo.completed_status === COMPLETED_STATUS.PROCESSING && !todo.out_of_expire
                                    })}>
                                        <Col xl={1} lg={1} md={1} xs={1}>
                                            <div className={cx("status", {
                                                "expired": todo.out_of_expire === FINISHED_STATUS.OUT_OF_EXPIRE,
                                                "completed": todo.completed_status === COMPLETED_STATUS.FINISHED && todo.out_of_expire === FINISHED_STATUS.ON_TIME,
                                                "active": todo.completed_status === COMPLETED_STATUS.PROCESSING && !todo.out_of_expire
                                            })}>
                                                <FontAwesomeIcon icon={
                                                    todo.completed_status === COMPLETED_STATUS.FINISHED ? faCheck : (
                                                        todo.completed_status === COMPLETED_STATUS.FAILED ? faXmark : faEllipsis
                                                    )
                                                }/>
                                            </div>
                                        </Col>
                                        <Col xl={5} lg={5} md={8} xs={8}>
                                            <p className={cx("todo-label")}>Tên công việc</p>
                                            <h5 className={cx("todo-content")}>{ todo.todo_name }</h5>
                                        </Col>
                                        <Col xl={2} lg={2} md={0} xs={0}>
                                            <p className={cx("todo-label")}>Ngày bắt đầu</p>
                                            <h5 className={cx("todo-content")}>{ formattedDate(todo.start_date) }</h5>
                                        </Col>
                                        <Col xl={2} lg={2} md={0} xs={0}>
                                            <p className={cx("todo-label")}>Ngày hết hạn</p>
                                            <h5 className={cx("todo-content")}>
                                                { formattedDate(todo.end_date) }
                                            </h5>
                                        </Col>
                                        <Col xl={2} lg={2} md={3} xs={3} className="d-flex">
                                            <Tooltip title="Theo dõi" color='#531dab'>
                                                <button 
                                                    className={cx("follow-btn")} 
                                                    onClick={() => setSelectedTodo(todo)}
                                                >
                                                    <FontAwesomeIcon icon={faEye} size="lg"/>
                                                </button>
                                            </Tooltip>
                                        </Col>
                                    </Row>
                                ))
                            ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                        )
                    }
                </div>
            </div>
            <Modal
                title="Chi tiết công việc"
                centered
                open={Object.keys(selectedTodo).length > 0}
                onOk={() => setSelectedTodo({})}
                onCancel={() => setSelectedTodo({})}
                width={800}
                footer={[
                    <button 
                        className={cx('view-btn', 'cancel')}
                        onClick={() => setSelectedTodo({})}
                    >
                        Đóng
                    </button>
                ]}
            >
                <ViewTodo 
                    regularId={regularId} 
                    todo={selectedTodo} 
                    openNotificationWithIcon={openNotificationWithIcon}
                    reRender={getTodoList}
                />
            </Modal>
            <Modal
                title="Thông tin nhiệm vụ"
                centered
                open={showCreateNewTodo}
                onOk={() => {}}
                onCancel={() => {
                    setShowCreateNewTodo(false);
                    setTodo(INIT_TODO_DATA);
                }}
                width={600}
                footer={[
                    <div className={cx('d-flex justify-content-end gap-2')}>
                        <button 
                            className={cx('view-btn')}
                            onClick={handleCreateTodo}
                        >
                            Tạo công việc
                        </button>
                        <button 
                            className={cx('view-btn', 'cancel')}
                            onClick={() => {
                                setShowCreateNewTodo(false);
                                setTodo(INIT_TODO_DATA);
                            }}
                        >
                            Đóng
                        </button>
                    </div>
                ]}
            >
                <CreateTodo 
                    setTodo={setTodo} 
                    setStartDate={setStartDate}
                    setEndDate={setEndDate}
                />
            </Modal>
        </div>
    )
}