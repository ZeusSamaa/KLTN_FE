'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faEye } from '@fortawesome/free-regular-svg-icons';

import {
  faBookBookmark,
  faCloudArrowUp,
  faDownload,
  faEllipsisVertical,
  faPenToSquare,
  faPersonChalkboard,
  faPlus,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './page.module.scss';
import {
  Empty,
  Input,
  Modal,
  Select,
  Skeleton,
  Spin,
  Table,
  Tabs,
  notification,
} from 'antd';
import dayjs from 'dayjs';

import { label } from '@/constant/label';
import { NOTIFICATION_TYPE } from '@/constant/notification-type';
import { formattedDate } from '@/helpers/format';
import generateSubjectCode from '@/constant/generate/generateSubjecCode'

import Header from '@/components/Header';
import CustomModal from '@/components/Modal';
import CreateSubject from './create-subject';
import {
  COVER_LETTER_STATUS,
  INTERN_STATUS,
  PASSED_STATUS,
  REGIST_STATUS,
  getCoverLetterStatus,
  getRegistStatus,
} from '@/constant/intern-status';
import { UPLOAD_FILE_TYPE } from '@/constant/upload-file';

import { GeneralService } from '@/services/general.service';
import { InternService } from '@/services/intern.service';
import { GoogleService } from '@/services/google.service';
import Link from 'next/link';

const cx = classNames.bind(styles);
const { TabPane } = Tabs;

const RequestTabView = ({
  data,
  reload,
  openNotificationWithIcon,
  isLoading,
}) => {
  const { subjectRequestList, internRequestList } = data;
  const [subjectRequests, setSubjectRequests] = useState([]);
  const [internRequests, setInternRequests] = useState([]);

  const [coverLetterFile, setCoverLetterFile] = useState(null);
  const [showCoverLetterModal, setShowCoverLetterModal] = useState(false);
  const [selectedCoverLetterRequestId, setSelectedCoverLetterRequestId] =
    useState(null);

  const [isPendingRequest, setIsPendingRequest] = useState(false);

  const subjectRequestColumns = {
    idx: 'STT',
    id: 'Mã số sinh viên',
    full_name: 'Họ và tên',
    regist_stauts: 'Trạng thái',
    department: 'Phòng ban',
    options: 'Lựa chọn',
  };

  const internRequestColumns = {
    idx: 'STT',
    id: 'Mã số sinh viên',
    full_name: 'Họ và tên',
    regist_stauts: 'Trạng thái',
    department: 'Ngày tạo',
    options: 'Lựa chọn',
  };

  const checkStudent = (item) => {
    if (!item?.student) {
      return false;
    }
    return true;
  };

  const getSubjectRequests = () => {
    const _requests = [];
    subjectRequestList?.items.forEach((item, index) => {
      if (!checkStudent(item)) {
        // Skip nếu student không hợp lệ
        return false;
      }
      _requests.push({
        idx: index + 1,
        id: item.student_id,
        full_name: item.student.user_person.full_name,
        regist_status: getRegistStatus(item.regist_status),
        department: item.internSubject.department.department_name,
      });
    });
    setSubjectRequests(_requests);
  };

  const getInternRequests = () => {
    const _requests = [];
    internRequestList?.items.forEach((item, index) => {
      if (!checkStudent(item)) {
        // Skip nếu student không hợp lệ
        return false;
      }
      _requests.push({
        idx: index + 1,
        id: item.student_id,
        full_name: item.student.user_person.full_name,
        regist_submit_status: getCoverLetterStatus(item.regist_submit_status),
        createdAt: formattedDate(item.createdAt),
      });
    });
    setInternRequests(_requests);
  };

  const setRequestData = () => {
    if (subjectRequestList?.items && subjectRequestList?.items.length > 0) {
      getSubjectRequests();
    }
    if (internRequestList?.items && internRequestList?.items.length > 0) {
      getInternRequests();
    }
  };

  useEffect(() => {
    setRequestData();
  }, [data]);

  const handleUpdateRegistSubjectStatus = (status, learnId) => {
    const data = {
      learnId,
      regist_status: status.value,
    };

    InternService.updateRegistSubjectRequest(data)
      .then(() => {
        openNotificationWithIcon(
          NOTIFICATION_TYPE.SUCCESS,
          'Thành công',
          'Cập nhật trạng thái đăng ký thành công'
        );
        reload();
      })
      .catch((err) => {
        openNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Thất bại', err);
      });
  };

  const handleSubmitCoverLetterRequest = () => {
    if (!coverLetterFile) {
      openNotificationWithIcon(
        NOTIFICATION_TYPE.ERROR,
        'Thất bại',
        'Vui lòng đính kèm file trước khi xác nhận'
      );
      return;
    }

    setIsPendingRequest(true);

    GoogleService.uploadFile(coverLetterFile, UPLOAD_FILE_TYPE.DOCS).then(
      (coverLink) => {
        InternService.submitCoverLetterRequest({
          requestId: selectedCoverLetterRequestId,
          file: coverLink,
        })
          .then(() => {
            openNotificationWithIcon(
              NOTIFICATION_TYPE.SUCCESS,
              'Thành công',
              'Xác nhận đăng ký thực tập thành công'
            );
            setIsPendingRequest(false);
            setShowCoverLetterModal(false);
            setSelectedCoverLetterRequestId(null);
            reload();
          })
          .catch((err) => {
            openNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Thất bại', err);
          });
      }
    );
  };

  return (
    <React.Fragment>
      <div>
        <h4 className={cx('category-heading', 'mb-4')}>
          {label.intern['regist-subject-request']}
        </h4>
        {isLoading ? (
          <div className={cx('mt-4')}>
            <Skeleton.Button
              className={cx('mb-2')}
              active={true}
              size={'large'}
              shape={'square'}
              block={true}
            />
            <Skeleton.Button
              className={cx('mb-2')}
              active={true}
              size={'large'}
              shape={'square'}
              block={true}
            />
            <Skeleton.Button
              className={cx('mb-2')}
              active={true}
              size={'large'}
              shape={'square'}
              block={true}
            />
          </div>
        ) : (
          <React.Fragment>
            {subjectRequests.length === 0 ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              <React.Fragment>
                <div
                  className={cx('list-item', 'row mb-3 align-items-center')}
                  style={{ backgroundColor: 'var(--gray-2-color)' }}
                >
                  {Object.keys(subjectRequestColumns).map((key, idx) => (
                    <div
                      className={cx({
                        'col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1':
                          key === 'idx',
                        'col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2':
                          key !== 'idx',
                      })}
                      key={idx}
                    >
                      <span className={cx('sub-content', 'semibold', {})}>
                        {subjectRequestColumns[key]}{' '}
                      </span>
                    </div>
                  ))}
                </div>
                {subjectRequests.map((request, index) => (
                  <div
                    key={index}
                    className={cx('list-item', 'row mb-3 align-items-center')}
                  >
                    {Object.keys(request).map((key, _index) => (
                      <div
                        className={cx({
                          'col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1':
                            key === 'idx',
                          'col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2':
                            key !== 'idx',
                        })}
                        key={_index}
                      >
                        <span
                          className={cx('sub-content', {
                            order: key === 'idx',
                            'success-status':
                              key === 'regist_status' &&
                              request[key] === REGIST_STATUS.SUCCESSED.name,
                            'fail-status':
                              key === 'regist_status' &&
                              request[key] === REGIST_STATUS.REJECTED.name,
                            'pending-status':
                              key === 'regist_status' &&
                              request[key] === REGIST_STATUS.REGISTERING.name,
                          })}
                        >
                          {request[key]}{' '}
                        </span>
                      </div>
                    ))}
                    {subjectRequestList?.items[index].regist_status ===
                      REGIST_STATUS.REGISTERING.value && (
                        <div
                          className={cx(
                            'col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3',
                            'd-flex gap-2'
                          )}
                        >
                          <button
                            className={cx('view-btn', 'optional')}
                            onClick={() =>
                              handleUpdateRegistSubjectStatus(
                                REGIST_STATUS.SUCCESSED,
                                subjectRequestList?.items[index].id
                              )
                            }
                          >
                            Xác nhận
                          </button>
                          <button className={cx('view-btn', 'error')}>
                            Hủy bỏ
                          </button>
                        </div>
                      )}
                  </div>
                ))}
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </div>

      <div className={cx('mt-5')}>
        <h4 className={cx('category-heading', 'mb-4')}>
          {label.intern['regist-intern-request']}
        </h4>
        {isLoading ? (
          <div className={cx('mt-4')}>
            <Skeleton.Button
              className={cx('mb-2')}
              active={true}
              size={'large'}
              shape={'square'}
              block={true}
            />
            <Skeleton.Button
              className={cx('mb-2')}
              active={true}
              size={'large'}
              shape={'square'}
              block={true}
            />
            <Skeleton.Button
              className={cx('mb-2')}
              active={true}
              size={'large'}
              shape={'square'}
              block={true}
            />
          </div>
        ) : (
          <React.Fragment>
            {internRequests.length === 0 ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              <React.Fragment>
                <div
                  className={cx('list-item', 'row mb-3 align-items-center')}
                  style={{ backgroundColor: 'var(--gray-2-color)' }}
                >
                  {Object.keys(internRequestColumns).map((key, idx) => (
                    <div
                      className={cx({
                        'col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1':
                          key === 'idx',
                        'col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2':
                          key !== 'idx',
                      })}
                      key={idx}
                    >
                      <span className={cx('sub-content', 'semibold', {})}>
                        {internRequestColumns[key]}{' '}
                      </span>
                    </div>
                  ))}
                </div>
                {internRequests.map((request, index) => (
                  <div
                    key={index}
                    className={cx('list-item', 'row mb-3 align-items-center')}
                  >
                    {Object.keys(request).map((key, _index) => (
                      <div
                        className={cx({
                          'col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1':
                            key === 'idx',
                          'col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2':
                            key !== 'idx',
                        })}
                        key={_index}
                      >
                        <span
                          className={cx('sub-content', {
                            order: key === 'idx',
                            'success-status':
                              key === 'regist_submit_status' &&
                              request[key] === COVER_LETTER_STATUS.SENT.name,
                            'fail-status':
                              key === 'regist_submit_status' &&
                              request[key] ===
                              COVER_LETTER_STATUS.REJECTED.name,
                            'pending-status':
                              key === 'regist_submit_status' &&
                              request[key] ===
                              COVER_LETTER_STATUS.WAITTING.name,
                          })}
                        >
                          {request[key]}{' '}
                        </span>
                      </div>
                    ))}
                    {internRequestList?.items[index].regist_submit_status ===
                      COVER_LETTER_STATUS.WAITTING.value && (
                        <div
                          className={cx(
                            'col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3',
                            'd-flex gap-2'
                          )}
                        >
                          <button
                            className={cx('view-btn', 'optional')}
                            onClick={() => {
                              setShowCoverLetterModal(true);
                              setSelectedCoverLetterRequestId(
                                internRequestList?.items[index].id
                              );
                            }}
                          >
                            {isPendingRequest && (
                              <Spin size="small" style={{ marginRight: 8 }} />
                            )}
                            Xác nhận
                          </button>
                          <button className={cx('view-btn', 'error')}>
                            Hủy bỏ
                          </button>
                        </div>
                      )}
                  </div>
                ))}
              </React.Fragment>
            )}
          </React.Fragment>
        )}
      </div>
      <Modal
        title="Thông tin thư giới thiệu"
        centered
        open={showCoverLetterModal}
        onCancel={() => {
          setShowCoverLetterModal(false);
          setSelectedCoverLetterRequestId(null);
          setCoverLetterFile(null);
        }}
        width={800}
        footer={[
          <div className={cx('d-flex justify-content-end gap-1')}>
            <button
              className={cx('view-btn')}
              onClick={() => handleSubmitCoverLetterRequest()}
            >
              Xác nhận
            </button>
            <button className={cx('view-btn', 'error')}>Hủy bỏ</button>
          </div>,
        ]}
      >
        <CoverLetterContainer
          coverLetterFile={coverLetterFile}
          setCoverLetterFile={setCoverLetterFile}
        />
      </Modal>
    </React.Fragment>
  );
};

const InternReportTabView = () => {
  const [students, setStudents] = useState([]);

  const checkStudent = (item) => {
    if (!item?.student) {
      return false;
    }
    return true;
  };
  const getLearnInternStudents = () => {
    InternService.adminGetInterningList({ is_report: true }).then((res) => {
      console.log("data student: ", res.data)
      const filterNull = res.data.filter(checkStudent)
      setStudents(filterNull);
    });
  };


  useEffect(() => {
    getLearnInternStudents();
  }, [])
  const headers = [
    { title: 'STT', size: 'large' },
    { title: 'Mã số sinh viên', size: 'large' },
    { title: 'Họ và tên', size: 'large' },
    { title: 'Lớp', size: 'large' },
    { title: 'Giảng viên hướng dẫn', size: 'large' },
    { title: 'Kết quả báo cáo', size: 'large' },
  ];
  return (
    <React.Fragment>
      <h4 className={cx('category-heading')}>{label.intern['intern-report']}</h4>
      <table className={cx('intern-main')}>
        <thead>
          {headers.map((header, index) => (
            <th key={index} className={cx('field-item', header.size)}>
              {header.title}
            </th>
          ))}
        </thead>
        <tbody>
          {students &&
            students.length > 0 &&
            students.map((student, index) => (
              <tr className={cx('student-item')} key={index}>
                <td className={cx('field-item', headers[0]?.size)}>
                  {index + 1}
                </td>
                <td className={cx('field-item', headers[1]?.size)}>
                  {student.student_id}
                </td>
                <td className={cx('field-item', headers[2]?.size)}>
                  {student.student.user_person.full_name}
                </td>
                <td className={cx('field-item', headers[3]?.size)}>
                  {generateSubjectCode(student.internSubject.id)}
                </td>
                <td className={cx('field-item', headers[4]?.size)}>
                  {
                    student.internSubject.teacher.user_person.full_name
                  }
                </td>
                <td className={cx('field-item', headers[5]?.size)}>
                  {/* <Link href={student.student.report.sort((a, b) => Date(b.createdAt) - new Date(a.createdAt))[0]?.report_file}>
                    {student.student.report.sort((a, b) => Date(b.createdAt) - new Date(a.createdAt))[0]?.report_file}
                  </Link> */}
                  <a
                    href={student.student.report.sort((a, b) => Date(b.createdAt) - new Date(a.createdAt))[0]?.report_file}
                    target="_blank"
                    className={cx('sub-content')}
                    style={{ fontWeight: 400, textDecoration: 'none' }}
                  >
                    <FontAwesomeIcon
                      icon={faEye}
                      size="sm"
                      style={{ marginRight: 8 }}
                    />
                    Xem File
                  </a>

                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </React.Fragment>
  );
};

const InternListTabView = () => {
  const [students, setStudents] = useState([]);


  const checkStudent = (item) => {
    if (!item?.student) {
      return false;
    }
    return true;
  };
  const getLearnInternStudents = () => {
    InternService.adminGetInterningList({ is_report: false }).then((res) => {
      console.log("data student: ", res.data);
      const filteredStudents = res.data.filter(checkStudent);
      setStudents(filteredStudents);
    });
  };


  useEffect(() => {
    getLearnInternStudents();
  }, [])

  const headers = [
    { title: 'STT', size: 'large' },
    { title: 'Mã số sinh viên', size: 'large' },
    { title: 'Họ và tên', size: 'large' },
    { title: 'Tên doanh nghiệp', size: 'large' },
    { title: 'Trạng thái', size: 'large' },
    { title: 'Ngày bắt đầu', size: 'large' },
    { title: 'Ngày kết thúc', size: 'large' },


  ];
  return (
    <React.Fragment>
      <h4 className={cx('category-heading')}>{label.intern['intern-list']}</h4>
      <table className={cx('intern-main')}>
        <thead>
          {headers.map((header, index) => (
            <th key={index} className={cx('field-item', header.size)}>
              {header.title}
            </th>
          ))}
        </thead>
        <tbody>
          {students &&
            students.length > 0 &&
            students.map((student, index) => {
              const internJob = student.student.Intern_job.sort((a, b) => Date(b.createdAt) - new Date(a.createdAt))[0]
              return <tr className={cx('student-item')} key={index}>
                <td className={cx('field-item', headers[0]?.size)}>
                  {index + 1}
                </td>
                <td className={cx('field-item', headers[1]?.size)}>
                  {student.student_id}
                </td>
                <td className={cx('field-item', headers[2]?.size)}>
                  {student.student.user_person.full_name}
                </td>
                <td className={cx('field-item', headers[4]?.size)}>
                  {
                    internJob ? internJob.apply.job.business.user_person.full_name : 'Chưa có'
                  }
                </td>
                <td className={cx('field-item', headers[5]?.size)}>
                  {internJob ? INTERN_STATUS[internJob?.is_interning]?.name : 'Chưa có'}
                </td>
                <td className={cx('field-item', headers[6]?.size)}>
                  {internJob?.start_date ? internJob.start_date.split('T')[0]?.split('-').reverse().join('-') : 'Chưa có'}
                </td>
                <td className={cx('field-item', headers[7]?.size)}>
                  {internJob?.finished_date ? internJob.finished_date.split('T')[0]?.split('-').reverse().join('-') : 'Chưa có'}
                </td>
              </tr>
            })}
        </tbody>
      </table>
    </React.Fragment>
  );
};

const CoverLetterContainer = ({ coverLetterFile, setCoverLetterFile }) => {
  return (
    <div style={{ marginTop: 30, marginLeft: 6, marginRight: 6 }}>
      <div>
        <div className={cx('upload-container')}>
          <FontAwesomeIcon icon={faCloudArrowUp} className={cx('i-upload')} />
          <span className={cx('upload-title')}>File CV</span>
          <input
            type="file"
            id="teacher-file"
            onChange={(e) => setCoverLetterFile(e.target.files[0])}
          />
          <label htmlFor="teacher-file" className={cx('upload-label')}>
            Tải lên
          </label>
        </div>
        <div className={cx('d-flex flex-column mt-2 w-100')}>
          <label className={cx('upload-link__label')} htmlFor="cv-file__link">
            Liên kết đính kèm
          </label>
          <div className={cx('d-flex flex-wrap gap-2')}>
            <input
              type="text"
              id="cv-file__link"
              className={cx('upload-link')}
              disabled={true}
              value={coverLetterFile?.name || ''}
            />
            {/* {
                            cvFile?.name && (
                                <React.Fragment>
                                    <button className={cx("view-btn")}>
                                        <FontAwesomeIcon 
                                            icon={faEye} 
                                            size="lg" 
                                            style={{marginRight: 10}}
                                        />
                                        Xem CV
                                    </button>
                                    
                                    {
                                        !apply && (
                                            <button className={cx("view-btn", "error")}>
                                                <FontAwesomeIcon 
                                                    icon={faXmark} 
                                                    size="lg" 
                                                    style={{marginRight: 10}}
                                                />
                                                Gỡ bỏ
                                            </button>
                                        )
                                    }

                                    { 
                                        apply && (
                                            <button className={cx("view-btn", "optional")}>
                                                <FontAwesomeIcon 
                                                    icon={faDownload} 
                                                    size="lg" 
                                                    style={{marginRight: 10}}
                                                />
                                                Tải về
                                            </button>
                                        )
                                    }
                                </React.Fragment>
                            )
                        } */}
          </div>
        </div>
      </div>
    </div>
  );
};

const OpenSubject = ({ schoolId, setShow, setSubject }) => {
  const [academicYears, setAcademicYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [curentAcademicYear, setCurrentAcademicYear] = useState(null);
  const [currentSemester, setCurrentSemester] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  const getAllAcademicYears = () => {
    GeneralService.getAcademicYears(schoolId).then((res) => {
      const _years = [];
      res.data.items.forEach((year) => {
        _years.push({
          value: year.id,
          label: year.current_year,
        });
      });
      const sortedYears = _years.sort((a, b) => a.label - b.label);
      setAcademicYears(sortedYears);
      setCurrentAcademicYear(sortedYears[sortedYears.length - 1].value);
    });
  };

  const getAllSemesters = () => {
    GeneralService.getAllSemesters(schoolId).then((res) => {
      const _semesters = [];
      res.data.forEach((semester) => {
        _semesters.push({
          value: semester.id,
          label: semester.semester_name,
        });
      });
      setSemesters(_semesters);
      setCurrentSemester(_semesters[0].value);
    });
  };

  useEffect(() => {
    if (schoolId) {
      getAllAcademicYears();
      getAllSemesters();
    }
  }, [schoolId]);

  useEffect(() => {
    if (schoolId) {
      getOpeningInternSubjects();
    }
  }, [curentAcademicYear, currentSemester]);

  const getOpeningInternSubjects = () => {
    InternService.getOpeningInternSubjects(
      schoolId,
      curentAcademicYear,
      currentSemester
    ).then((res) => {
      setSubjects(res.data);
      setIsLoading(false);
    });
  };

  return (
    <React.Fragment>
      <h4 className={cx('category-heading')}>
        {label.intern['intern-subject']}
      </h4>
      <div className={cx('row mb-4')}>
        <div className={cx('col-xl-6 col-lg-6 col-md-12 col-12 mt-2')}>
          <div className={cx('select-item')}>
            <span className={cx('select-label')}>
              {label.intern['academic-year']}
            </span>
            <Select
              className={cx('w-100')}
              options={academicYears}
              value={curentAcademicYear}
              onChange={(value) => setCurrentAcademicYear(value)}
            />
          </div>
        </div>
        <div className={cx('col-xl-6 col-lg-6 col-md-12 col-12 mt-2')}>
          <div className={cx('select-item')}>
            <span className={cx('select-label')}>
              {label.intern['semester']}
            </span>
            <Select
              className={cx('w-100')}
              options={semesters}
              value={currentSemester}
              onChange={(value) => setCurrentSemester(value)}
            />
          </div>
        </div>
      </div>

      <div>
        {isLoading ? (
          <div className={cx('mt-4')}>
            <Skeleton.Button
              className={cx('mb-2')}
              active={true}
              size={'small'}
              shape={'square'}
              block={true}
            />
          </div>
        ) : (
          <React.Fragment>
            {subjects.length === 0 ? (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            ) : (
              subjects.map((subject, index) => (
                <div className={cx('row align-items-center m-2')} key={index}>
                  <div style={{ width: 'fit-content' }}>
                    <div className={cx('i-block')}>
                      <FontAwesomeIcon icon={faBookBookmark} size="sm" />
                    </div>
                  </div>
                  <div className={cx('col')}>
                    <span
                      className={cx('item-content')}
                      style={{ fontWeight: 600 }}
                    >
                      {subject.name}
                    </span>
                  </div>
                  <div className={cx('col')}>
                    <span className={cx('item-content')}>
                      {formattedDate(subject.createdAt)}
                    </span>
                  </div>
                  <div
                    style={{ width: 50, cursor: 'pointer' }}
                    onClick={() => {
                      setSubject(subject);
                      setShow();
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      size="sm"
                      color="var(--red-5-color)"
                    />
                  </div>
                </div>
              ))
            )}
            <div className={cx('w-100')} style={{ textAlign: 'right' }}>
              <button className={cx('view-btn')} onClick={setShow}>
                <FontAwesomeIcon
                  icon={faPlus}
                  size="sm"
                  style={{ marginRight: 8 }}
                />
                Thêm mới
              </button>
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

const Examination = ({ schoolId, setShow }) => {
  const [academicYears, setAcademicYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [examinations, setExaminations] = useState([]);

  const [currentDepartment, setCurrentDepartment] = useState(null);
  const [curentAcademicYear, setCurrentAcademicYear] = useState(null);
  const [currentSemester, setCurrentSemester] = useState(null);

  const getAllDepartments = () => {
    GeneralService.getAllDepartments(schoolId).then((res) => {
      const _departments = [];
      res.data.forEach((department) => {
        _departments.push({
          value: department.id,
          label: department.department_name,
        });
      });
      setDepartments(_departments);
    });
  };

  const getAllAcademicYears = () => {
    GeneralService.getAcademicYears(schoolId).then((res) => {
      const _years = [];
      res.data.items.forEach((year) => {
        _years.push({
          value: year.id,
          label: year.current_year,
        });
      });
      setAcademicYears(_years.sort((a, b) => a.label - b.label));
    });
  };

  const getAllSemesters = () => {
    GeneralService.getAllSemesters(schoolId).then((res) => {
      const _semesters = [];
      res.data.forEach((semester) => {
        _semesters.push({
          value: semester.id,
          label: semester.semester_name,
        });
      });
      setSemesters(_semesters);
    });
  };

  useEffect(() => {
    if (schoolId) {
      getAllDepartments();
      getAllAcademicYears();
      getAllSemesters();
    }
  }, [schoolId]);

  return (
    <React.Fragment>
      <h4 className={cx('category-heading')}>
        {label.intern['examination-board']}
      </h4>
      <div className={cx('row')}>
        <div className={cx('col-xl-6 col-lg-6 col-md-12 col-12 mt-2')}>
          <div className={cx('select-item')}>
            <span className={cx('select-label')}>
              {label.intern['academic-year']}
            </span>
            <Select
              className={cx('w-100')}
              defaultValue={''}
              options={academicYears}
              onChange={(value) => setCurrentAcademicYear(value)}
            />
          </div>
        </div>
        <div className={cx('col-xl-6 col-lg-6 col-md-12 col-12 mt-2')}>
          <div className={cx('select-item')}>
            <span className={cx('select-label')}>
              {label.intern['semester']}
            </span>
            <Select
              className={cx('w-100')}
              defaultValue={''}
              options={semesters}
              onChange={(value) => setCurrentSemester(value)}
            />
          </div>
        </div>
        <div className={cx('col-xl-12 col-lg-12 col-md-12 col-12 mt-2')}>
          <div className={cx('select-item')}>
            <span className={cx('select-label')}>Khoa</span>
            <Select
              className={cx('w-100')}
              defaultValue={''}
              options={departments}
              onChange={(value) => setCurrentDepartment(value)}
            />
          </div>
        </div>
      </div>
      <div>
        {examinations.length === 0 ? (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        ) : (
          <></>
        )}
      </div>
      <div className={cx('w-100')} style={{ textAlign: 'right' }}>
        <button className={cx('view-btn')} onClick={setShow}>
          <FontAwesomeIcon icon={faPlus} size="sm" style={{ marginRight: 8 }} />
          Thêm mới
        </button>
      </div>
    </React.Fragment>
  );
};

export default function AdminIntern() {
  const INIT_SUBJECT_DATA = {
    id: null,
    name: 'Thực tập tốt nghiệp',
    unit: null,
    sessions: null,
    max_students: null,
    teacher_id: null,
    academic_year: null,
    semester_id: null,
    start_date: dayjs(),
    end_date: dayjs(),
  };
  const [subject, setSubject] = useState(INIT_SUBJECT_DATA);
  const [school, setSchool] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [subjectRequestList, setSubjectRequestList] = useState([]);
  const [internRequestList, setInternRequestList] = useState([]);

  const [showedInternModal, setShowedInternModal] = useState(false);
  const [showedOpenSubjectModal, setShowedOpenSubjectModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message, description) => {
    return api[type]({
      message,
      description,
    });
  };

  const getSchool = () => {
    GeneralService.getProfile().then((res) => {
      setSchool(res.data.user.administrator);

      setSchool(res.data.user.administrator);
      const schoolId = res.data.user.administrator.school_id;
      if (schoolId) {
        getRegistSubjectRequestList(schoolId);
        getRegistInternRequestList(schoolId);
      }
    });
  };

  useEffect(() => {
    getSchool();
  }, []);

  const getRegistSubjectRequestList = (schoolId) => {
    InternService.getRegistSubjectRequestList(schoolId).then((res) => {
      console.log("data SubjectRequest:", res.data);
      setSubjectRequestList(res.data)
    }
    );
  };

  const getRegistInternRequestList = (schoolId) => {
    InternService.getRegistInternRequestList(schoolId).then((res) => {
      setInternRequestList(res.data);
      setIsLoading(false);
    });
  };

  const postSubject = () => {
    if (!subject.id) {
      delete subject.id;
    }

    InternService.createSubject(school.school_id, selectedDepartment, subject)
      .then(() => {
        openNotificationWithIcon(
          NOTIFICATION_TYPE.SUCCESS,
          'Thành công',
          'Mở môn học mới thành công'
        );
        setSubject(INIT_SUBJECT_DATA);
        setShowedOpenSubjectModal(false);
      })
      .catch((error) => {
        openNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Thất bại', error);
      });
  };

  const onCreateSubject = () => {
    const isFullFields = Object.keys(subject).every((key) => {
      if (key === 'id') {
        return true;
      }
      if (
        subject[key] === null ||
        (typeof subject[key] === 'string' && subject[key]?.trim().length === 0)
      ) {
        return false;
      }
      return true;
    });

    if (!isFullFields) {
      openNotificationWithIcon(
        NOTIFICATION_TYPE.ERROR,
        'Thất bại',
        'Vui lòng nhập đầy đủ thông tin môn học'
      );
      return;
    }

    if (subject.unit <= 0) {
      openNotificationWithIcon(
        NOTIFICATION_TYPE.ERROR,
        'Thất bại',
        'Số tín chỉ phải lớn hơn 0'
      );
      return;
    }

    if (subject.sessions <= 0) {
      openNotificationWithIcon(
        NOTIFICATION_TYPE.ERROR,
        'Thất bại',
        'Số buổi học phải lớn hơn 0'
      );
      return;
    }

    if (subject.end_date < dayjs()) {
      openNotificationWithIcon(
        NOTIFICATION_TYPE.ERROR,
        'Thất bại',
        'Ngày kết thúc phải lớn hơn hoặc bằng ngày hiện tại'
      );
      return;
    }

    if (subject.start_date > subject.end_date) {
      openNotificationWithIcon(
        NOTIFICATION_TYPE.ERROR,
        'Thất bại',
        'Ngày bắt đầu phải nhỏ hơn ngày kết thúc'
      );
      return;
    }

    postSubject();
  };

  return (
    <div className={cx('wrapper')}>
      {contextHolder}
      <Header title={'Thực tập'} icon={faPersonChalkboard} />
      <div className={cx('row')}>
        <div
          className={cx(
            'col-xl-8 col-lg-7 col-md-12 col-sm-12 col-12',
            'main-view'
          )}
        >
          <div className={cx('intern-container', 'fit-content')}>
            <div className={cx('intern-main')}>
              <Tabs defaultActiveKey="1" tabPosition="top">
                <TabPane tab={label.intern['request']} key="1">
                  <RequestTabView
                    data={{ subjectRequestList, internRequestList }}
                    reload={() => {
                      getRegistSubjectRequestList(school.school_id);
                      getRegistInternRequestList(school.school_id);
                    }}
                    openNotificationWithIcon={openNotificationWithIcon}
                    isLoading={isLoading}
                  />
                </TabPane>
                <TabPane tab={label.intern['intern-list']} key="2">
                  <InternListTabView />
                </TabPane>

                <TabPane tab={label.intern['intern-report']} key="3">
                  <InternReportTabView />
                </TabPane>
                {/* Add more TabPanes as needed */}
              </Tabs>
            </div>
          </div>
        </div>
        <div className={cx('col-xl-4 col-lg-5 col-md-12 col-sm-12 col-12')}>
          <div className={cx('intern-container', 'fit-content')}>
            <div className={cx('intern-main')}>
              <OpenSubject
                schoolId={school?.school_id}
                setShow={() => setShowedOpenSubjectModal(true)}
                setSubject={setSubject}
              />
            </div>
          </div>

          <div className={cx('intern-container', 'fit-content')}>
            <div className={cx('intern-main')}>
              <Examination
                schoolId={school?.school_id}
                setShow={() => setShowedInternModal(true)}
              />
            </div>
          </div>
        </div>
      </div>

      <Modal
        centered
        width={'900px'}
        title={'Mở môn học thực tập'}
        open={showedOpenSubjectModal}
        onCancel={() => {
          setShowedOpenSubjectModal(false);
          setSubject(INIT_SUBJECT_DATA);
        }}
        closeIcon={null}
        footer={[
          <div className={cx('d-flex justify-content-end gap-2')}>
            <button
              className={cx('view-btn')}
              onClick={() => onCreateSubject()}
            >
              Tạo mới
            </button>
            <button
              className={cx('view-btn', 'cancel')}
              onClick={() => {
                setShowedOpenSubjectModal(false);
                setSubject(INIT_SUBJECT_DATA);
              }}
            >
              Đóng
            </button>
          </div>,
        ]}
      >
        <CreateSubject
          schoolId={school?.school_id}
          currentSubject={subject}
          setSubject={setSubject}
          setDepartment={setSelectedDepartment}
        />
      </Modal>

      {showedInternModal && (
        <CustomModal
          heading={'Mở hội đồng chấm thi'}
          onSave={() => setShowedInternModal(false)}
          onHide={() => setShowedInternModal(false)}
          saveButtonLabel={'Tạo mới'}
        ></CustomModal>
      )}
    </div>
  );
}
