'use client'
import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./page.module.scss";
import { faBriefcase, faCheck, faEllipsis, faEye, faThumbsUp, faXmark } from "@fortawesome/free-solid-svg-icons";
import Header from "@/components/Header";
import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Row, Col } from "react-bootstrap";
import { DatePicker, Select, Input, Button, Modal, Tooltip, Spin, Empty, notification } from "antd";

// import FieldSet from "@/components/FieldSet";
// import { label } from "@/constant/label";
// import { COMPLETED_STATUS, FINISHED_STATUS, TODO_STATUS } from "@/constant/todo-status";
// import { formattedDate } from "@/helpers/format";

// import { TodoService } from "@/services/todo.service";

// const { Search } = Input;

const cx = classNames.bind(styles);




export default function StudentTodo() {
    const [skills, setSkills] = useState('');
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [api, contextHolder] = notification.useNotification();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setError('');
      try {
        const response = await axios.post('http://127.0.0.1:8000/recommend/', { skills });
        setJobs(response.data.recommended_jobs);
      } catch (error) {
        console.error('Error fetching recommended jobs:', error);
        setError('Đã xảy ra lỗi khi lấy danh sách công việc. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className={cx('wrapper')}>
         { contextHolder }
        <Header title={'Gợi ý công việc'} icon={faBriefcase} />
        <div className={cx('contact-container')}>
          <form  onSubmit={handleSubmit} style={{ paddingLeft: '20px' }} >
            <label style={{ marginTop: '20px' }}>
              Nhập kỹ năng của bạn:
              <input
                type="text"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
                className={cx('input')}
              />
            </label>
            <button type="submit" className={cx('button')}>
              Get Recommend
            </button>
          </form>
          <div className={cx('result-container')}>
          {loading ? (
            <p>Đang tải...</p>
          ) : error ? (
            <p className={cx('error')}>{error}</p>
          ) : (
            <div>
              <h5>Công việc được gợi ý:</h5>
              <ul>
                {jobs.map((job, index) => (
                  <li key={index}>{job}</li>
                ))}
              </ul>
            </div>
          )}
          </div>
        </div>
      </div>
    );
  }