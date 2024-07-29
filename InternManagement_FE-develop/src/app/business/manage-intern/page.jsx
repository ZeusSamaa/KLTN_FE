'use client';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './page.module.scss';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { BusinessUploadService } from '@/services/business-upload.service';
import {
  faCheck,
  faCloudArrowUp,
  faDownload,
  faEllipsisVertical,
  faPen,
  faPersonChalkboard,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { faCalendarCheck, faEye } from '@fortawesome/free-regular-svg-icons';
import { Calendar, Empty, Modal, Skeleton, Spin, notification } from 'antd';
import dayjs from 'dayjs';

import Header from '@/components/Header';
import { label } from '@/constant/label';
import { APPLY_STATUS, getApplyStatus } from '@/constant/intern-status';
import { NOTIFICATION_TYPE } from '@/constant/notification-type';

import { JobService } from '@/services/job.service';
import { faAirbnb } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import { GeneralService } from '@/services/general.service';
import { LINKED_STATUS, getLinkedStatus } from '@/constant/linked-status';

const cx = classNames.bind(styles);

function RequestItem({ student, reload }) {
  const [showOptions, setShowOptions] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message, description) => {
    return api[type]({
      message,
      description,
    });
  };

  const handleSubmitApply = (status) => {
    const applyId = student.apply_id;
    const apply_status = status.value;

    JobService.submitApplyRequest({ applyId, apply_status })
      .then(() => {
        openNotificationWithIcon(
          NOTIFICATION_TYPE.SUCCESS,
          'Thành công',
          status === APPLY_STATUS.APPROVED
            ? 'Xác nhận yêu cầu thành công'
            : 'Hủy yêu cầu thành công'
        );
        setShowOptions(false);
        reload();
      })
      .catch((error) => {
        openNotificationWithIcon(NOTIFICATION_TYPE.SUCCESS, 'Thất bại', error);
      });
  };

  return (
    <div className={cx('list-item', 'row mb-3 align-items-center')}>
      {contextHolder}
      {Object.keys(student).map((key, _index) => (
        <React.Fragment>
          {key !== 'cv_file' && key !== 'apply_id' && (
            <div
              className={cx({
                'col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3': key !== 'idx',
                'col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1': key === 'idx',
              })}
              key={_index}
            >
              <span
                className={cx('sub-content', {
                  'text-center': key === 'status',
                  order: key === 'idx',
                  'success-status':
                    key === 'status' &&
                    student[key] === APPLY_STATUS.FINISHED.name,
                  'fail-status':
                    key === 'status' &&
                    student[key] === APPLY_STATUS.FAILED.name,
                  'applying-status':
                    key === 'status' &&
                    student[key] === APPLY_STATUS.APPLYING.name,
                  'interviewing-status':
                    key === 'status' &&
                    student[key] === APPLY_STATUS.INTERVIEWING.name,
                  'onboard-status':
                    key === 'status' &&
                    student[key] === APPLY_STATUS.ONBOARD.name,
                })}
              >
                {student[key]}{' '}
              </span>
            </div>
          )}
        </React.Fragment>
      ))}
      <div
        className={cx('col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2', 'options')}
        onClick={() => setShowOptions((prev) => !prev)}
      >
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          size="lg"
          color="var(--gray-7-color)"
        />
      </div>

      {showOptions && (
        <div className={cx('option-list')}>
          <a
            href={student.cv_file}
            target="_blank"
            className={cx('sub-content')}
            style={{ fontWeight: 400, textDecoration: 'none' }}
          >
            <FontAwesomeIcon
              icon={faEye}
              size="sm"
              style={{ marginRight: 8 }}
            />
            Xem CV
          </a>
          {student.status === APPLY_STATUS.APPLYING.name && (
            <React.Fragment>
              <span
                className={cx('sub-content', 'mt-2')}
                style={{ fontWeight: 400 }}
                onClick={() => handleSubmitApply(APPLY_STATUS.APPROVED)}
              >
                <FontAwesomeIcon
                  icon={faCheck}
                  size="sm"
                  style={{ marginRight: 8 }}
                />
                Xác nhận
              </span>
              <span
                className={cx('sub-content', 'mt-2')}
                style={{ fontWeight: 400 }}
                onClick={() => handleSubmitApply(APPLY_STATUS.FAILED)}
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  size="sm"
                  style={{ marginRight: 8 }}
                />
                Hủy bỏ
              </span>
              <span
                className={cx('sub-content', 'mt-2')}
                style={{ fontWeight: 400 }}
              >
                <FontAwesomeIcon
                  icon={faCalendarCheck}
                  size="sm"
                  style={{ marginRight: 8 }}
                />
                Phỏng vấn
              </span>
            </React.Fragment>
          )}

          {/* {
                            student.status === APPLY_STATUS.ONBOARD.name && (
                                <span 
                                    className={cx('sub-content', 'mt-2')} 
                                    style={{ fontWeight: 400 }}
                                    onClick={() => handleSubmitApply(APPLY_STATUS.FINISHED)}
                                >
                                    <FontAwesomeIcon icon={faCheck} size="sm" style={{ marginRight: 8 }}/>
                                    Hoàn thành
                                </span>
                            )
                        } */}
        </div>
      )}
    </div>
  );
}

function InterningItem({ student, reload }) {
  const [showOptions, setShowOptions] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [appreciationFile, setAppreciationFile] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message, description) => {
    return api[type]({
      message,
      description,
    });
  };

  // const handleSubmitApply = (status) => {
  //     const applyId = student.apply_id;
  //     const apply_status = status.value;

  //     JobService
  //         .submitApplyRequest({ applyId, apply_status })
  //         .then(() => {
  //             openNotificationWithIcon(
  //                 NOTIFICATION_TYPE.SUCCESS,
  //                 "Thành công",
  //                 status === APPLY_STATUS.ONBOARD ?
  //                             'Xác nhận yêu cầu thành công' :
  //                             'Hủy yêu cầu thành công'
  //             );
  //             setShowOptions(false);
  //             reload();
  //         })
  //         .catch((error) => {
  //             openNotificationWithIcon(
  //                 NOTIFICATION_TYPE.SUCCESS,
  //                 "Thất bại",
  //                 error
  //             );
  //         })
  // }

  const handleCompletedInternshipProgress = async () => {
    try {
      setIsPending(true);
      if (!appreciationFile) {
        openNotificationWithIcon(
          NOTIFICATION_TYPE.ERROR,
          'Thất bại',
          'Vui lòng đính kèm file đánh giá trước khi xác nhận'
        );

        return;
      }
      const r = await BusinessUploadService.uploadDocx(appreciationFile);

      await JobService.submitFinishRequest({ applyId: student.apply_id, file_url: r.data.url })
      setShowCompletedModal(false);
      setAppreciationFile(null);
      openNotificationWithIcon(
        NOTIFICATION_TYPE.SUCCESS,
        'Thành công',
        'Xác nhận hoàn thành thành công'
      );
      reload();
    } catch (error) {
      openNotificationWithIcon(
        NOTIFICATION_TYPE.ERROR,
        'Thất bại',
        'Xác nhận hoàn thành thất bại'
      );
    }

    setIsPending(false);
  };

  return (
    <div className={cx('list-item', 'row mb-3 align-items-center')}>
      {contextHolder}
      {Object.keys(student).map((key, _index) => (
        <React.Fragment>
          {key !== 'cv_file' && key !== 'student_id' && key !== 'apply_id' && (
            <div
              className={cx({
                'col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3': key !== 'idx',
                'col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1': key === 'idx',
              })}
              key={_index}
            >
              <span
                className={cx('sub-content', {
                  'text-center': key === 'status',
                  order: key === 'idx',
                  'success-status':
                    key === 'status' &&
                    student[key] === APPLY_STATUS.FINISHED.name,
                  'fail-status':
                    key === 'status' &&
                    student[key] === APPLY_STATUS.FAILED.name,
                  'applying-status':
                    key === 'status' &&
                    student[key] === APPLY_STATUS.APPLYING.name,
                  'interviewing-status':
                    key === 'status' &&
                    student[key] === APPLY_STATUS.INTERVIEWING.name,
                  'onboard-status':
                    key === 'status' &&
                    student[key] === APPLY_STATUS.ONBOARD.name,
                })}
              >
                {' '}
                {student[key]}{' '}
              </span>
            </div>
          )}
        </React.Fragment>
      ))}
      <div
        className={cx('col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2', 'options')}
        onClick={() => setShowOptions((prev) => !prev)}
      >
        <FontAwesomeIcon
          icon={faEllipsisVertical}
          size="lg"
          color="var(--gray-7-color)"
        />
      </div>

      {showOptions && (
        <div className={cx('option-list')}>
          <a
            href={student.cv_file}
            target="_blank"
            className={cx('sub-content')}
            style={{ fontWeight: 400, textDecoration: 'none' }}
          >
            <FontAwesomeIcon
              icon={faEye}
              size="sm"
              style={{ marginRight: 8 }}
            />
            Xem CV
          </a>
          {student.status === APPLY_STATUS.ONBOARD.name && (
            <span
              className={cx('sub-content', 'mt-2')}
              style={{ fontWeight: 400 }}
              onClick={() => setShowCompletedModal(true)}
            >
              <FontAwesomeIcon
                icon={faCheck}
                size="sm"
                style={{ marginRight: 8 }}
              />
              Hoàn thành
            </span>
          )
          }
          {(student.status === APPLY_STATUS.ONBOARD.name || student.status === APPLY_STATUS.FINISHED.name)
            && (
              <Link
                href={{
                  pathname: '/business/todo',
                  query: { studentId: student.student_id },
                }}
                className={cx('sub-content', 'mt-2')}
                style={{
                  fontWeight: 400,
                  textDecoration: 'none',
                  fontSize: '15px !important',
                }}
              >
                <FontAwesomeIcon
                  icon={faAirbnb}
                  size="sm"
                  style={{ marginRight: 8 }}
                />
                Theo dõi
              </Link>
            )}
        </div>
      )}
      <Modal
        centered
        title="Xác nhận hoàn thành thực tập"
        width={'800px'}
        open={showCompletedModal}
        onCancel={() => setShowCompletedModal(false)}
        footer={[
          <div className={cx('d-flex gap-2 justify-content-end')}>
            <button
              className={cx('view-btn')}
              onClick={handleCompletedInternshipProgress}
            >
              {isPending &&
                <Spin size="small" style={{ marginRight: 8 }} />}
              Xác nhận
            </button>
            <button
              className={cx('view-btn', 'cancel')}
              onClick={() => setShowCompletedModal(false)}
            >
              Đóng
            </button>
          </div>,
        ]}
        style={{ zIndex: 100000 }}
      >
        <div className={cx('mt-4')}>
          <div className={cx('upload-container')}>
            <FontAwesomeIcon icon={faCloudArrowUp} className={cx('i-upload')} />
            <span className={cx('upload-title')}>File đánh giá thực tập</span>
            <input
              type="file"
              accept=".doc,.docx,.pdf"
              id="business-file"
              onChange={(e) => setAppreciationFile(e.target.files[0])}
            />
            <label htmlFor="business-file" className={cx('upload-label')}>
              Tải lên
            </label>
          </div>
          <div className={cx('d-flex flex-column mt-2 mb-5')}>
            <label
              className={cx('upload-link__label')}
              htmlFor="business-file__link"
            >
              Liên kết đính kèm
            </label>
            <div className={cx('d-flex align-items-end gap-3 flex-wrap')}>
              <input
                type="text"
                id="business-file__link"
                className={cx('upload-link')}
                disabled={true}
                value={appreciationFile?.name || ''}
              />
              {appreciationFile?.name && (
                <React.Fragment>
                  <button
                    className={cx('view-btn', 'error')}
                    onClick={() => {
                      setAppreciationFile(null);
                    }}
                  >
                    <FontAwesomeIcon
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
        </div>
      </Modal>
    </div>
  );
}

export default function BusinessIntern() {
  const role = useSelector((state) => state.role);

  const [applyList, setApplyList] = useState([]);
  const [interningList, setInterningList] = useState([]);
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type, message, description) => {
    return api[type]({
      message,
      description,
    });
  };

  const columns = {
    idx: 'STT',
    fullName: 'Họ và tên',
    jobName: 'Tên công việc',
    status: 'Trạng thái',
    options: 'Lựa chọn',
  };

  const checkStudent = (item) => {
    if (!item?.student) {
      return false;
    }
    return true;
  };


  const getInternManagementList = async () => {
    return JobService.getApplyList()
      .then((res) => {
        const _applyList = [];
        const _interningList = [];
        const fillterNull = res.data.items.filter(checkStudent)

        if (fillterNull.length > 0) {
          fillterNull.forEach((item, index) => {
            if (
              item.apply_status === APPLY_STATUS.APPLYING.value ||
              item.apply_status === APPLY_STATUS.FAILED.value ||
              item.apply_status === APPLY_STATUS.INTERVIEWING.value
            ) {
              _applyList.push({
                idx: index + 1,
                apply_id: item.id,
                fullName: item.student.user_person.full_name,
                jobName: item.job.job_name,
                status: getApplyStatus(item.apply_status),
                cv_file: item.cv_file,
              });
            } else {
              _interningList.push({
                idx: index + 1,
                apply_id: item.id,
                fullName: item.student.user_person.full_name,
                student_id: item.student.id,
                jobName: item.job.job_name,
                status: getApplyStatus(item.apply_status),
                cv_file: item.cv_file,
              });
            }
          });
          setApplyList(_applyList);
          setInterningList(_interningList);
        }
      });
  };

  const getLinkedSchool = () => {
    GeneralService.getLinkedSchool().then((res) => {
      setSchools(res.data.items);
      setLoading(false);
    });
  };

  const getData = async () => {
    await getInternManagementList();
    getLinkedSchool();
  };

  useEffect(() => {
    getData();
  }, []);

  const handleSubmitLinkedSchool = (status, linkId) => {
    GeneralService.updateLinkedStatus(status, linkId)
      .then(() => {
        openNotificationWithIcon(
          NOTIFICATION_TYPE.SUCCESS,
          'Thông báo',
          'Xác nhận liên kết thành công'
        );
        getData();
      })
      .catch((error) => {
        openNotificationWithIcon(NOTIFICATION_TYPE.ERROR, 'Thất bại', error);
      });
  };

  return (
    <div className={cx('wrapper')}>
      {contextHolder}
      <Header title={'Thực tập'} icon={faPersonChalkboard} />
      {/* APPLY LIST */}
      <div className={cx('intern-container')}>
        <div className={cx('intern-main')}>
          <h4 className={cx('category-heading')}>
            {label.business['request-list']}
          </h4>
          <div className={cx('mt-5')}>
            {loading ? (
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
              </div>
            ) : applyList.length > 0 ? (
              applyList.map((student, index) => (
                <RequestItem
                  student={student}
                  key={index}
                  reload={getInternManagementList}
                />
              ))
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </div>
        </div>
      </div>

      {/* INTERNING LIST */}
      <div className={cx('intern-container')}>
        <div className={cx('intern-main')}>
          <h4 className={cx('category-heading')}>
            {label.business['intern-list']}
          </h4>
          <div className={cx('mt-5')}>
            {loading ? (
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
              </div>
            ) : interningList.length > 0 ? (
              <React.Fragment>
                {/* <div 
                                            className={
                                                cx('list-item','row mb-3 align-items-center')
                                            } 
                                            style={{ backgroundColor: 'var(--gray-2-color)' }}
                                        >
                                            {
                                                Object.keys(columns).map((key, idx) => (
                                                    <div 
                                                        className={cx({
                                                            'col-xl-3 col-lg-3 col-md-3 col-sm-3 col-3': key !== 'idx',
                                                            'col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1': key === 'idx',
                                                            'col-xl-1 col-lg-1 col-md-1 col-sm-1 col-1': key === 'options',
                                                        })} 
                                                        key={idx}
                                                    >
                                                        <span className={cx('sub-content', 'semibold', {
                                                        })}>{ columns[key] } </span>
                                                    </div>
                                                ))
                                            }
                                        </div> */}
                {interningList.map((student, index) => (
                  <InterningItem
                    student={student}
                    key={index}
                    reload={getInternManagementList}
                  />
                ))}
              </React.Fragment>
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </div>
        </div>
      </div>

      {/* LINKED SCHOOL */}
      <div className={cx('intern-container')}>
        <div className={cx('intern-main')}>
          <h4 className={cx('category-heading')}>
            {label.business['linked-school']}
          </h4>
          <div className={cx('mt-4')}>
            {loading ? (
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
              </div>
            ) : schools.length > 0 ? (
              schools.map((item, index) => (
                <div className={cx('row mb-3')} key={index}>
                  <div className={cx('col-xl-4 col-lg-3 col-md-4 col-sm-6')}>
                    <div className={cx('d-flex gap-4')}>
                      <img className={cx('logo')} src={item.school?.avatar} />
                      <div
                        className={cx(
                          'ms-2 d-flex flex-column justify-content-center'
                        )}
                      >
                        <span className={cx('sub-content', 'mb-1', 'semibold')}>
                          {item.school.school_name}
                        </span>
                        <span className={cx('sub-content')}>
                          {item.school.shorthand_name}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={cx(
                      'col-xl-4 col-lg-6 col-md-4 col-sm-2 align-items-center'
                    )}
                  >
                    <div
                      className={cx('view-btn view-mode', {
                        warn: item.is_linked === LINKED_STATUS.WAITING.value,
                        sucess: item.is_linked === LINKED_STATUS.APPROVED.value,
                        error: item.is_linked === LINKED_STATUS.REJECTED.value,
                      })}
                      style={{ width: 'fit-content' }}
                    >
                      {getLinkedStatus(item.is_linked)}
                    </div>
                  </div>

                  <div className={cx('col-xl-4 col-lg-3 col-md-4 col-sm-4')}>
                    <div className={cx('d-flex gap-3')}>
                      <button className={cx('view-btn', 'optional')}>
                        <FontAwesomeIcon
                          icon={faEye}
                          size="sm"
                          style={{ marginRight: 8 }}
                        />
                        Xem hồ sơ
                      </button>
                      {item.is_linked === LINKED_STATUS.WAITING.value && (
                        <React.Fragment>
                          <button
                            className={cx('view-btn')}
                            onClick={() =>
                              handleSubmitLinkedSchool(
                                LINKED_STATUS.APPROVED.value,
                                item.id
                              )
                            }
                          >
                            <FontAwesomeIcon
                              icon={faCheck}
                              size="sm"
                              style={{ marginRight: 8 }}
                            />
                            Xác nhận
                          </button>
                          <button
                            className={cx('view-btn', 'error')}
                            onClick={() =>
                              handleSubmitLinkedSchool(
                                LINKED_STATUS.REJECTED.value,
                                item.id
                              )
                            }
                          >
                            <FontAwesomeIcon
                              icon={faXmark}
                              size="sm"
                              style={{ marginRight: 8 }}
                            />
                            Từ chối
                          </button>
                        </React.Fragment>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
