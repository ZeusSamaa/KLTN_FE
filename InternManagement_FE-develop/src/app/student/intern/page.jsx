'use client';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './page.module.scss';
import Header from '../../../components/Header';
import {
  faBook,
  faCheckToSlot,
  faCloudArrowUp,
  faDownload,
  faEnvelopeOpen,
  faEye,
  faFlag,
  faPen,
  faPersonChalkboard,
  faSquarePollVertical,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Container, Row } from 'react-bootstrap';
import { Button, Modal, Popconfirm, Spin, Tooltip, notification } from 'antd';
import { InternService } from '@/services/intern.service';
import { faUnity } from '@fortawesome/free-brands-svg-icons';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import {StudentUploadService} from '@/services/student-upload.service';
import ViewJob from '@/components/ViewJob';
import { NOTIFICATION_TYPE } from '@/constant/notification-type';
import {
  getRegistStatus,
  getPassedStatus,
  REGIST_STATUS,
  COVER_LETTER_STATUS,
  PASSED_STATUS,
} from '@/constant/intern-status';
import { formattedDate } from '@/helpers/format';
import {StudentService} from '@/services/student.service';
import { JobService } from '@/services/job.service';
import { GeneralService } from '@/services/general.service';

const cx = classNames.bind(styles);

const INTERN_STATUS = {
  'REGIST-SUBJECT': 1,
  REPORT: 2,
  COMPLETED: 3,
};

function SubjectContainer({
  subjects,
  setSubject,
  setViewHistory,
  setViewCoverLetter,
  registedSubject,
}) {
  function handleOpenViewHistory() {
    if (registedSubject) {
      setSubject(registedSubject);
    } else {
      setViewHistory({});
    }
    setViewHistory(true);
  }

  return (
    <React.Fragment>
      <h5 className={cx('heading')}>Thông tin môn học đang mở</h5>
      <Row className={cx('intern-main')}>
        {subjects.length > 0 &&
          subjects.map((subject, index) => (
            <div
              className={cx('col-xl-3 col-lg-4 col-md-6 col-sm-12 col-12')}
              key={index}
            >
              <div
                className={cx('subject-item')}
                onClick={() => setSubject(subject)}
              >
                <h4
                  className={cx('subject-field', 'order', {
                    // 'full-slot': subject.availableSlots === 0
                  })}
                >
                  {index + 1}
                </h4>
                <div className={cx('subject-field')}>
                  <span className={cx('name')}>{subject.name}</span>
                </div>
                <h4 className={cx('subject-field')}>
                  <FontAwesomeIcon
                    className={cx('field-icon')}
                    icon={faUnity}
                    size="lg"
                  />
                  <span>{subject.unit} tín chỉ</span>
                </h4>
                <h4 className={cx('subject-field')}>
                  <FontAwesomeIcon
                    className={cx('field-icon')}
                    icon={faClock}
                    size="lg"
                  />
                  <span>{subject.sessions} buổi học</span>
                </h4>
                <h4 className={cx('subject-field')}>
                  <FontAwesomeIcon
                    className={cx('field-icon')}
                    icon={faPersonChalkboard}
                    size="lg"
                  />
                  <span>{subject.teacher.user_person.full_name}</span>
                </h4>
                <h4 className={cx('subject-field')}>
                  <FontAwesomeIcon
                    className={cx('field-icon')}
                    icon={faCheckToSlot}
                    size="lg"
                  />
                  <span>
                    {subject.max_students - (subject.availableSlots || 0)} /{' '}
                    {subject.max_students}
                  </span>
                </h4>
              </div>
            </div>
          ))}
      </Row>
      <div
        className={cx('d-flex gap-2 flex-wrap mt-2')}
        style={{ marginLeft: 12 }}
      >
        <button className={cx('view-btn')} onClick={handleOpenViewHistory}>
          <FontAwesomeIcon icon={faClock} style={{ marginRight: 6 }} />
          Xem lịch sử đăng ký
        </button>
        <button
          className={cx('view-btn', 'optional')}
          onClick={() => setViewCoverLetter(true)}
        >
          <FontAwesomeIcon icon={faEnvelopeOpen} style={{ marginRight: 6 }} />
          Nhận thư giới thiệu
        </button>
      </div>
    </React.Fragment>
  );
}

function ReportContainer() {
  const [businessFile, setBusinessFile] = useState(null);
  const [reportFile, setReportFile] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    
    const openNotificationWithIcon = (type, message, description) => {
        return api[type]({
            message,
          description,
        });
    };



  const handleUploadProgress = async (cb, file) => {
    try {
      setIsPending(true);
      if (!file) {
        openNotificationWithIcon(
          NOTIFICATION_TYPE.ERROR,
          'Thất bại',
          'Vui lòng đính kèm file đánh giá trước khi xác nhận'
        );

        return;
      }
      const r = await StudentUploadService.uploadDocx(file);

      await cb(r.data.url);
      openNotificationWithIcon(
        NOTIFICATION_TYPE.SUCCESS,
        'Thành công',
        'Cập nhật thành công'
      );
    } catch (error) {
        console.log(error);
      openNotificationWithIcon(
        NOTIFICATION_TYPE.ERROR,
        'Thất bại',
        'Cập nhật thất bại'
      );
    }

    setIsPending(false);
  };

  const uploadBusiness = () => {
    handleUploadProgress(async (url) => {
      await StudentService.submitBusinessReport(url);
      setBusinessFile(null);
    }, businessFile);
  };

  const uploadReport = () => {
    handleUploadProgress(async (url) => {
      await StudentService.submitReport( url);
      setReportFile(null);
    }, reportFile);
  };

  return (
      <React.Fragment>
      { contextHolder }
      <h5 className={cx('heading')}>Thông tin báo cáo</h5>
      <Row style={{ marginTop: 30, marginLeft: 6, marginRight: 6 }}>
        <Col xs={12} md={12} lg={12} xl={12}>
          <div className={cx('upload-container')}>
            <FontAwesomeIcon icon={faCloudArrowUp} className={cx('i-upload')} />
            <span className={cx('upload-title')}>
              File đánh giá từ Doanh nghiệp
            </span>
            <input
              type="file"
              accept=".doc,.docx,.pdf"
              id="business-file"
              onChange={(e) => setBusinessFile(e.target.files[0])}
            />
            <label htmlFor="business-file" className={cx('upload-label')}>
              Tải lên
            </label>
          </div>
          <div className={cx('d-flex flex-column mt-2')}>
            <label
              className={cx('upload-link__label')}
              htmlFor="business-file__link"
            >
              Liên kết đính kèm
            </label>
            <div className={cx('d-flex')}>
              <input
                type="text"
                id="business-file__link"
                className={cx('upload-link')}
                disabled={true}
                value={businessFile?.name || ''}
              />
              {businessFile?.name && (
                <React.Fragment>
                  <button
                    className={cx('view-btn', 'btn-upload-option', 'read')}
                  >
                    <FontAwesomeIcon
                      className={cx('btn-option__icon')}
                      icon={faEye}
                      size="lg"
                      style={{ marginRight: 10 }}
                    />
                    Đọc nhanh
                  </button>
                  <button
                    className={cx('view-btn', 'btn-upload-option', 'download')}
                  >
                    <FontAwesomeIcon
                      className={cx('btn-option__icon')}
                      icon={faDownload}
                      size="lg"
                      style={{ marginRight: 10 }}
                    />
                    Tải về
                  </button>
                  <button
                    onClick={uploadBusiness}
                    className={cx('view-btn', 'btn-upload-option', 'update')}
                  >
                    <FontAwesomeIcon
                      className={cx('btn-option__icon')}
                      icon={faPen}
                      size="lg"
                      style={{ marginRight: 10 }}
                    />
                    {isPending && (
                      <Spin size="small" style={{ marginRight: 8 }} />
                    )}
                    Cập nhật
                  </button>
                  <button
                    className={cx('view-btn', 'btn-upload-option', 'delete')}
                  >
                    <FontAwesomeIcon
                      className={cx('btn-option__icon')}
                      icon={faXmark}
                      size="lg"
                      style={{ marginRight: 10 }}
                    />
                    Gỡ bỏ
                  </button>
                </React.Fragment>
              )}
            </div>
          </div>
        </Col>
        <Col xs={12} md={12} lg={12} xl={12}>
          <div className={cx('upload-container')}>
            <FontAwesomeIcon icon={faCloudArrowUp} className={cx('i-upload')} />
            <span className={cx('upload-title')}>File báo cáo đồ án</span>
            <input
              type="file"
              id="report-file"
              onChange={(e) => setReportFile(e.target.files[0])}
            />
            <label htmlFor="report-file" className={cx('upload-label')}>
              Tải lên
            </label>
          </div>
          <div className={cx('d-flex flex-column mt-2')}>
            <label
              className={cx('upload-link__label')}
              htmlFor="business-file__link"
            >
              Liên kết đính kèm
            </label>
            <div className={cx('d-flex')}>
              <input
                type="text"
                id="business-file__link"
                className={cx('upload-link')}
                disabled={true}
                value={reportFile?.name || ''}
              />
              {reportFile?.name && (
                <React.Fragment>
                  <button
                    className={cx('view-btn', 'btn-upload-option', 'read')}
                  >
                    <FontAwesomeIcon
                      className={cx('btn-option__icon')}
                      icon={faEye}
                      size="lg"
                      style={{ marginRight: 10 }}
                    />
                    Đọc nhanh
                  </button>
                  <button
                    className={cx('view-btn', 'btn-upload-option', 'download')}
                  >
                    <FontAwesomeIcon
                      className={cx('btn-option__icon')}
                      icon={faDownload}
                      size="lg"
                      style={{ marginRight: 10 }}
                    />
                    Tải về
                  </button>
                  <button
                    onClick={uploadReport}
                    className={cx('view-btn', 'btn-upload-option', 'update')}
                  >
                    <FontAwesomeIcon
                      className={cx('btn-option__icon')}
                      icon={faPen}
                      size="lg"
                      style={{ marginRight: 10 }}
                    />
                    {isPending && (
                      <Spin size="small" style={{ marginRight: 8 }} />
                    )}
                    Cập nhật
                  </button>
                  <button
                    className={cx('view-btn', 'btn-upload-option', 'delete')}
                  >
                    <FontAwesomeIcon
                      className={cx('btn-option__icon')}
                      icon={faXmark}
                      size="lg"
                      style={{ marginRight: 10 }}
                    />
                    Gỡ bỏ
                  </button>
                </React.Fragment>
              )}
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
}

function FinalResultContainer() {
  return (
    <React.Fragment>
      <h5 className={cx('heading')}>Kết quả môn học</h5>
      <div className={cx('intern-main')}></div>
    </React.Fragment>
  );
}

function ViewSubjectModal({ subject, isCancelable }) {
  return (
    <Container className={cx('mt-4')}>
      <Row>
        <Col xl={3} lg={3} md={4} xs={6} className={cx('mb-3')}>
          <p className={cx('subject-label')}>Tên môn học</p>
          <h5 className={cx('subject-content')}>
            {isCancelable ? subject.internSubject.name : subject.name}
          </h5>
        </Col>
        <Col xl={3} lg={3} md={4} xs={6} className={cx('mb-3')}>
          <p className={cx('subject-label')}>Ngày tạo</p>
          <h5 className={cx('subject-content')}>
            {formattedDate(
              isCancelable ? subject.internSubject.createdAt : subject.createdAt
            )}
          </h5>
        </Col>
        <Col xl={3} lg={3} md={4} xs={6} className={cx('mb-3')}>
          <p className={cx('subject-label')}>Giảng viên hướng dẫn</p>
          <h5 className={cx('subject-content')}>
            {isCancelable
              ? subject.internSubject.teacher.user_person.full_name
              : subject.teacher.user_person.full_name}
          </h5>
        </Col>
        <Col xl={3} lg={3} md={4} xs={6} className={cx('mb-3')}>
          <p className={cx('subject-label')}>Số tín chỉ</p>
          <h5 className={cx('subject-content')}>
            {isCancelable ? subject.internSubject.unit : subject.unit}
          </h5>
        </Col>
        <Col xl={3} lg={3} md={4} xs={6} className={cx('mb-3')}>
          <p className={cx('subject-label')}>Số buổi học</p>
          <h5 className={cx('subject-content')}>
            {isCancelable ? subject.internSubject.sessions : subject.sessions}
          </h5>
        </Col>
        <Col xl={3} lg={3} md={4} xs={6} className={cx('mb-3')}>
          <p className={cx('subject-label')}>Số lượng tối đa</p>
          <h5 className={cx('subject-content')}>
            {isCancelable
              ? subject.internSubject.max_students
              : subject.max_students}
          </h5>
        </Col>
        <Col xl={3} lg={3} md={4} xs={6} className={cx('mb-3')}>
          <p className={cx('subject-label')}>Số lượng đã đăng ký</p>
          <h5 className={cx('subject-content')}>
            {isCancelable
              ? subject.internSubject.rest_count
              : subject.rest_count}
          </h5>
        </Col>
        {isCancelable && (
          <React.Fragment>
            <Col xl={3} lg={3} md={4} xs={6} className={cx('mb-3')}>
              <p className={cx('subject-label')}>Ngày đăng ký</p>
              <h5 className={cx('subject-content')}>
                {formattedDate(subject.createdAt)}
              </h5>
            </Col>
            <Col xl={3} lg={3} md={4} xs={6} className={cx('mb-3')}>
              <p className={cx('subject-label')}>Trạng thái môn học</p>
              <span
                className={cx('subject-content', 'view-btn view-mode', {
                  sucess: subject.passed_status === PASSED_STATUS.PASSED.value,
                  error: subject.passed_status === PASSED_STATUS.FAILED.value,
                })}
              >
                {getPassedStatus(subject.passed_status)}
              </span>
            </Col>
            <Col xl={3} lg={3} md={4} xs={6} className={cx('mb-3')}>
              <p className={cx('subject-label')}>Trạng thái xác nhận đăng ký</p>
              <h5 className={cx('subject-content')}>
                {getRegistStatus(subject.regist_status)}
              </h5>
            </Col>
          </React.Fragment>
        )}
      </Row>
    </Container>
  );
}

export default function StudentIntern() {
  const [currentStatus, setCurrentStatus] = useState(
    INTERN_STATUS['REGIST-SUBJECT']
  );
  const [steps, setSteps] = useState([]);
  const [profile, setProfile] = useState(null);

  const [subjects, setSubjects] = useState([]);

  const [selectedSubject, setSelectedSubject] = useState({});
  const [viewSubjectHistory, setViewSubjectHistory] = useState(false);
  const [registedSubject, setRegistedSubject] = useState(null);

  const [selectedJob, setSelectedJob] = useState({});
  const [viewJobHistory, setViewJobHistory] = useState(false);

  const [viewCoverLetter, setViewCoverLetter] = useState(false);
  const [coverLetterRequest, setCoverLetterRequest] = useState(null);

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message, description) => {
    return api[type]({
      message,
      description,
    });
  };

  const [isLoading, setIsLoading] = useState(true);

  function getProfile() {
    GeneralService.getProfile().then((res) => {
      setProfile(res.data);
    });
  }

  function getOpeningSubjects() {
    const schoolId = profile.userData.schoolId;
    InternService.getOpeningInternSubjects(schoolId)
      .then((res) => {
        const _subjects = res.data.filter((item) => item.is_open);
        setSubjects(_subjects);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }

  function getSteps() {
    const STEPS = [
      {
        name: 'Đăng ký môn học',
        'is-submitted': currentStatus > INTERN_STATUS['REGIST-SUBJECT'],
        'is-pending': currentStatus === INTERN_STATUS['REGIST-SUBJECT'],
        icon: faBook,
      },
      {
        name: 'Báo cáo cuối kỳ',
        'is-submitted': currentStatus > INTERN_STATUS['REPORT'],
        'is-pending': currentStatus === INTERN_STATUS['REPORT'],
        icon: faFlag,
      },
      {
        name: 'Kết quả thực tập',
        'is-submitted': currentStatus > INTERN_STATUS['COMPLETED'],
        'is-pending': currentStatus === INTERN_STATUS['COMPLETED'],
        icon: faSquarePollVertical,
      },
    ];
    setSteps(STEPS);
  }

  function getCoverLetterRequest() {
    const id = profile.userData.id;
    InternService.getCoverLetterRequest({ id }).then((res) => {
      if (res.data.length > 0) {
        setCoverLetterRequest(res.data[0]);
      } else {
        setCoverLetterRequest(null);
      }
    });
  }

  function getRegistedSubject() {
    const studentId = profile.userData.id;
    InternService.getRegistedSubject(studentId).then((res) => {
      if (res.data) {
        setRegistedSubject(res.data);
      }
    });
  }

  useEffect(() => {
    getSteps();
    getProfile();
  }, []);

  useEffect(() => {
    if (profile && Object.keys(profile).length > 0) {
      getOpeningSubjects();
      getCoverLetterRequest();
      getRegistedSubject();
    }
  }, [profile]);

  const handleCancelRegistRequest = () => {
    InternService.deleteRegistedSubjectRequest(
      selectedSubject.student_id,
      selectedSubject.subject_id,
      selectedSubject.id
    )
      .then(() => {
        openNotificationWithIcon(
          NOTIFICATION_TYPE.SUCCESS,
          'Thành công',
          'Bạn đã hủy đăng ký môn học thành công'
        );
        setViewSubjectHistory(false);
        setSelectedSubject({});
      })
      .catch((err) => {
        openNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Thất bại', err);
      });
  };

  const onRegistSubject = () => {
    InternService.registInternSubject(selectedSubject.id)
      .then(() => {
        openNotificationWithIcon(
          NOTIFICATION_TYPE.SUCCESS,
          'Thành công',
          'Bạn đã đăng ký môn học thành công'
        );
        setSelectedSubject({});
      })
      .catch((err) => {
        openNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Thất bại', err);
      });
  };

  const postCoverLetterRequest = () => {
    const schoolId = profile.userData.schoolId;
    const id = profile.userData.id;
    const data = {
      id,
      schoolId,
    };

    InternService.postCoverLetterRequest(data)
      .then(() => {
        openNotificationWithIcon(
          NOTIFICATION_TYPE.SUCCESS,
          'Thành công',
          'Bạn đã gửi yêu cầu nhận giấy giới thiệu thực tập thành công'
        );
        setViewCoverLetter(false);
        getCoverLetterRequest();
      })
      .catch((err) => {
        openNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Thất bại', err);
      });
  };

  const handleCancelCoverLetterRequest = () => {
    if (coverLetterRequest) {
      const userId = profile.userData.id;
      const requestId = coverLetterRequest.id;

      InternService.deleteCoverLetterRequest({ userId, requestId })
        .then(() => {
          openNotificationWithIcon(
            NOTIFICATION_TYPE.SUCCESS,
            'Thành công',
            'Bạn đã hủy yêu cầu nhận giấy giới thiệu thực tập thành công'
          );
          setViewCoverLetter(false);
          getCoverLetterRequest();
        })
        .catch((err) => {
          openNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Thất bại', err);
        });
    }
  };

  return (
    <div className={cx('wrapper')}>
      {contextHolder}
      <Header title={'Thực tập'} icon={faPersonChalkboard} />
      <div className={cx('row')}>
        <div className={cx('col-xl-1 col-lg-2 col-md-12 col-sm-12 col-12')}>
          <div className={cx('intern-container', 'step-container-mobile')}>
            {steps.length > 0 &&
              steps.map((step, index) => (
                <Tooltip
                  key={index}
                  title={step.name}
                  color={
                    currentStatus > index + 1
                      ? 'var(--green-5-color)'
                      : 'var(--orange-4-color)'
                  }
                >
                  <div
                    className={cx('step-wrapper', {
                      submitted: currentStatus > index + 1,
                      pending: currentStatus === index + 1,
                    })}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      if (currentStatus !== index + 1) {
                        setCurrentStatus(index + 1);
                      }
                    }}
                  >
                    <FontAwesomeIcon
                      className={cx('step-icon')}
                      icon={step.icon}
                      size="xs"
                    />
                  </div>
                </Tooltip>
              ))}
          </div>
        </div>
        <div className={cx('col-xl-11 col-lg-10 col-md-12 col-sm-12 col-12')}>
          <div className={cx('intern-container', 'content-wrapper')}>
            {currentStatus === INTERN_STATUS['REGIST-SUBJECT'] &&
              (isLoading ? (
                <div
                  className={cx(
                    'd-flex align-items-center justify-content-center h-100'
                  )}
                >
                  <Spin size="small" />
                </div>
              ) : (
                <SubjectContainer
                  subjects={subjects}
                  setSubject={setSelectedSubject}
                  setViewHistory={setViewSubjectHistory}
                  setViewCoverLetter={setViewCoverLetter}
                  registedSubject={registedSubject}
                />
              ))}
            {currentStatus === INTERN_STATUS['REPORT'] && <ReportContainer />}
            {currentStatus === INTERN_STATUS['COMPLETED'] && (
              <FinalResultContainer />
            )}
          </div>
        </div>
      </div>

      <Modal
        title="Thông tin môn học"
        centered
        open={Object.keys(selectedSubject).length > 0 && !viewSubjectHistory}
        onCancel={() => setSelectedSubject({})}
        width={800}
        footer={[
          !registedSubject && (
            <button
              className={cx('view-btn')}
              onClick={() => onRegistSubject()}
            >
              Đăng ký
            </button>
          ),
          <button
            className={cx('view-btn', 'cancel')}
            onClick={() => setSelectedSubject({})}
          >
            Đóng
          </button>,
        ]}
      >
        <ViewSubjectModal subject={selectedSubject} isCancelable={false} />
      </Modal>

      <Modal
        title="Thông tin công việc"
        centered
        open={Object.keys(selectedJob).length > 0 && !viewJobHistory}
        onCancel={() => setSelectedJob({})}
        width={800}
        footer={[
          <Button type="primary" size="medium" onClick={() => {}}>
            Gửi yêu cầu
          </Button>,
          <Button size="medium" onClick={() => setSelectedJob({})}>
            Đóng
          </Button>,
        ]}
      >
        <ViewJob job={selectedJob} />
      </Modal>

      <Modal
        title={
          Object.keys(selectedSubject).length > 0
            ? 'Thông tin môn học đã đăng ký'
            : 'Thông báo'
        }
        centered
        open={viewSubjectHistory && Object.keys(selectedSubject).length >= 0}
        width={800}
        onCancel={() => {
          setViewSubjectHistory(false);
          setSelectedSubject({});
        }}
        footer={[
          Object.keys(selectedSubject).length > 0 &&
            selectedSubject.regist_status !== REGIST_STATUS.SUCCESSED.value &&
            selectedSubject.regist_status !== REGIST_STATUS.REJECTED.value && (
              <Popconfirm
                title="Hủy yêu cầu đăng ký"
                description="Bạn chắc chắn muốn hủy yêu cầu đăng ký môn học?"
                onConfirm={handleCancelRegistRequest}
                onCancel={() => {
                  setViewSubjectHistory(false);
                  setSelectedSubject({});
                }}
                okText="Đồng ý"
                cancelText="Đóng"
              >
                <button className={cx('view-btn', 'error')}>Hủy bỏ</button>,
              </Popconfirm>
            ),
          <button
            className={cx('view-btn', 'cancel')}
            onClick={() => {
              setViewSubjectHistory(false);
              setSelectedSubject({});
            }}
          >
            Đóng
          </button>,
        ]}
      >
        {Object.keys(selectedSubject).length > 0 ? (
          <ViewSubjectModal subject={selectedSubject} isCancelable={true} />
        ) : (
          <h4>Bạn chưa đăng ký môn học</h4>
        )}
      </Modal>

      <Modal
        title="Thư giới thiệu việc làm"
        centered
        open={viewCoverLetter}
        onCancel={() => {
          setViewCoverLetter(false);
        }}
        width={800}
        footer={[
          <div className={cx('d-flex gap-1 justify-content-end')}>
            <React.Fragment>
              {coverLetterRequest?.regist_submit_status ===
                COVER_LETTER_STATUS.WAITTING.value && (
                <Popconfirm
                  title="Hủy yêu cầu"
                  description="Bạn chắc chắn muốn hủy yêu cầu nhận giấy giới thiệu?"
                  onConfirm={handleCancelCoverLetterRequest}
                  onCancel={() => {
                    setViewCoverLetter(false);
                  }}
                  okText="Đồng ý"
                  cancelText="Đóng"
                >
                  <button className={cx('view-btn', 'error')}>
                    Hủy yêu cầu
                  </button>
                  ,
                </Popconfirm>
              )}
              {!coverLetterRequest && (
                <button
                  className={cx('view-btn')}
                  onClick={postCoverLetterRequest}
                >
                  Gửi yêu cầu
                </button>
              )}
            </React.Fragment>
            ,
            <button
              className={cx('view-btn', 'cancel')}
              onClick={() => setViewCoverLetter(false)}
            >
              Đóng
            </button>
          </div>,
        ]}
      >
        <React.Fragment>
          {coverLetterRequest &&
            coverLetterRequest.regist_submit_status ===
              COVER_LETTER_STATUS.SENT.value && (
              <React.Fragment>
                <div className={cx('d-flex flex-column mt-4 mb-5')}>
                  <label
                    className={cx('upload-link__label')}
                    htmlFor="business-file__link"
                  >
                    Liên kết đính kèm
                  </label>
                  <div className={cx('d-flex align-items-end gap-3')}>
                    <input
                      type="text"
                      id="business-file__link"
                      className={cx('upload-link', 'mb-0')}
                      disabled={true}
                      value={coverLetterRequest?.file || ''}
                    />
                    <a
                      href={coverLetterRequest?.file}
                      target="_blank"
                      className={cx('view-btn', 'optional')}
                      style={{ textDecoration: 'none' }}
                    >
                      <FontAwesomeIcon
                        icon={faDownload}
                        size="lg"
                        style={{ marginRight: 10 }}
                      />
                      Tải về
                    </a>
                  </div>
                </div>
              </React.Fragment>
            )}
        </React.Fragment>
      </Modal>

      <Modal
        title="Thông tin công việc đã gửi yêu cầu"
        centered
        open={Object.keys(selectedJob).length > 0 && viewJobHistory}
        onCancel={() => {
          setSelectedJob({});
          setViewJobHistory(false);
        }}
        width={800}
        footer={[
          <Button type="primary" size="medium" danger onClick={() => {}}>
            Hủy yêu cầu
          </Button>,
          <Button
            size="medium"
            onClick={() => {
              setSelectedJob({});
              setViewJobHistory(false);
            }}
          >
            Đóng
          </Button>,
        ]}
      >
        <ViewJob job={selectedJob} />
      </Modal>
    </div>
  );
}
