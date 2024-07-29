'use client';
import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './page.module.scss';
import { Input, Pagination, Select, Tooltip } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faDownload,
  faFloppyDisk,
  faPen,
  faRotateRight,
  faSpinner,
  faTableList,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

import Header from '@/components/Header';
import { label } from '@/constant/label';
import { InternService } from '@/services/intern.service';
import { GeneralService } from '@/services/general.service';
import CustomModal from '@/components/Modal';
import { INTERN_STATUS, PASSED_STATUS } from '@/constant/intern-status';
import generateStudentId from '@/constant/generate/generateStudentCode'

const cx = classNames.bind(styles);

const INTERNING_TABVIEW_INDEX = 0;
const INTERNED_TABVIEW_INDEX = 1;

const maxItemsInPage = 10;

const INTERNING_HEADERS = [
  { title: 'Ảnh', size: 'small' },
  { title: 'Mã số sinh viên', size: 'medium' },
  { title: 'Họ và tên', size: 'large' },
  { title: 'Lớp', size: 'medium' },
  { title: 'Điểm', size: 'medium' },
  { title: 'Lựa chọn', size: 'large' },
];

const INTERNED_HEADERS = [
  { title: 'Ảnh', size: 'small' },
  { title: 'Mã số sinh viên', size: 'medium' },
  { title: 'Họ và tên', size: 'large' },
  { title: 'Lớp', size: 'medium' },
  { title: 'Vị trí thực tập', size: 'medium' },
  { title: 'Điểm cuối kì', size: 'medium' },
];

function InternedStudents() {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [students, setStudents] = useState([]);
  const [academicYears, setAcademicYears] = useState([]);
  const [semesters, setSemesters] = useState([]);
  const [currentAcademicYear, setCurrentAcademicYear] = useState(null);
  const [currentSemester, setCurrentSemester] = useState(null);
  const [loaded, setLoaded] = useState(false);

  async function getAcademicYears() {
    GeneralService.getAcademicYears()
      .then((_academicYears) => {
        setAcademicYears(_academicYears.data.items);
        setCurrentAcademicYear(_academicYears.data.items[0].id);
      })
      .catch((err) => console.log('err: ', err));
  }

  async function getSemesters() {
    GeneralService.getAllSemesters()
      .then((_semesters) => {
        setSemesters(_semesters.data);
        setCurrentSemester(_semesters.data[1].id);
      })
      .catch((err) => console.log('err: ', err));
  }

  async function getInterningList() {
    InternService.teacherGetLearnInternInternJobList({
      academic_year: currentAcademicYear,
      semester_id: currentSemester,
      intern_job_status: INTERN_STATUS.FINISHED.value,
    })
      .then((_students) => setStudents(_students.data))
      .catch((err) => console.log('err: ', err));
  }

  useEffect(() => {
    const f = async () => {
      await Promise.all([getAcademicYears(), getSemesters()]);
      setLoaded(true);
    };
    f();
  }, []);

  useEffect(() => {
    if (currentAcademicYear && currentSemester) {
      getInterningList();
    }
  }, [currentAcademicYear, currentSemester]);

  return (
    <React.Fragment>
      {loaded && (
        <React.Fragment>
          <h4 className={cx('category-heading')}>
            {label.score['interned-list']}
          </h4>
          <div className={cx('d-flex mt-1 mb-4')} style={{ marginLeft: 15 }}>
            <div className={cx('select-item')}>
              <span className={cx('select-label')}>
                {label.intern['academic-year']}
              </span>
              <Select
                value={currentAcademicYear}
                style={{ width: 150 }}
                options={academicYears.map((year) => ({
                  value: year.id,
                  label: year.current_year,
                }))}
                onChange={(value) => setCurrentAcademicYear(value)}
              />
            </div>
            <div className={cx('select-item')}>
              <span className={cx('select-label')}>
                {label.intern['semester']}
              </span>
              <Select
                value={currentSemester}
                style={{ width: 150 }}
                options={semesters.map((semester) => ({
                  value: semester.id,
                  label: semester.semester_name,
                }))}
                onChange={(value) => {
                  setCurrentSemester(value);
                }}
              />
            </div>
          </div>
          <table className={cx('intern-main', 'interned')}>
            <thead>
              {INTERNED_HEADERS.map((header, index) => (
                <th key={index} className={cx('field-item', header.size)}>
                  {header.title}
                </th>
              ))}
            </thead>
            <tbody>
              {students.length > 0 &&
                students.map((student, index) => (
                  <tr className={cx('student-item')} key={index}>
                    <td
                      className={cx('field-item', INTERNING_HEADERS[0]?.size)}
                    >
                      <img
                        className={cx('avatar')}
                        src={student.student.user_person.image}
                        alt=""
                      />
                    </td>
                    <td
                      className={cx('field-item', INTERNING_HEADERS[1]?.size)}
                    >
                      {generateStudentId(student.student.admission_date, student.student_id)}
                    </td>
                    <td
                      className={cx('field-item', INTERNING_HEADERS[2]?.size)}
                    >
                      {student.student.user_person.full_name}
                    </td>
                    <td
                      className={cx('field-item', INTERNING_HEADERS[3]?.size)}
                    >
                      {student.student.class.class_name}
                    </td>
                    <td
                      className={cx('field-item', INTERNING_HEADERS[4]?.size)}
                    >
                      {student.student.Intern_job[0]?.apply?.job?.job_name}
                    </td>
                    <td
                      className={cx('field-item', INTERNING_HEADERS[5]?.size)}
                    >
                      {student.score}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          <Pagination
            className={cx(
              'd-flex align-items-center justify-content-center mt-3'
            )}
            defaultCurrent={currentPageNumber}
            total={(students.length / maxItemsInPage) * 10}
            onChange={(pageNumber) => setCurrentPageNumber(pageNumber)}
          />
          <button className={cx('save-btn', 'export')}>
            <FontAwesomeIcon
              icon={faDownload}
              size="lg"
              style={{ marginRight: 10 }}
            />
            Xuất bảng điểm
          </button>
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

const UpdateScoreModal = ({ student, onSave, onHide }) => {
  const [score, setScore] = useState(student.score);

  return (
    <CustomModal
      heading={'Nhập điểm'}
      onHide={onHide}
      onSave={() => onSave(score, student.id)}
      saveButtonLabel={'Lưu'}
    >
      <div>
        <p className={cx('todo-label')}>Điểm</p>
        <Input
          className={cx('todo-content')}
          placeholder="Điểm"
          onChange={(e) => setScore(e.target.value)}
        />
      </div>
    </CustomModal>
  );
};

const StudentScoreRow = ({ student, onSave }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {showModal && (
        <UpdateScoreModal
          student={student}
          onSave={(score, learn_intern_id) => {
            onSave(score, learn_intern_id);
            setShowModal(false);
          }}
          onHide={() => setShowModal(false)}
        />
      )}
      <tr className={cx('student-item')}>
        <td className={cx('field-item', INTERNING_HEADERS[0]?.size)}>
          <img
            className={cx('avatar')}
            src={student.student.user_person.image}
            alt=""
          />
        </td>
        <td className={cx('field-item', INTERNING_HEADERS[1]?.size)}>
          {generateStudentId(student.student.admission_date, student.student_id)}

        </td>
        <td className={cx('field-item', INTERNING_HEADERS[2]?.size)}>
          {student.student.user_person.full_name}
        </td>
        <td className={cx('field-item', INTERNING_HEADERS[3]?.size)}>
          {student.student.class.class_name}
        </td>
        <td className={cx('field-item', INTERNING_HEADERS[4]?.size)}>
          {student.score}
        </td>
        <td className={cx('field-item', INTERNING_HEADERS[5]?.size, 'action')}>
          <Tooltip
            color="var(--purple-5-color)"
            title="Cập nhật"
            onClick={() => {
              console.log('update');
              setShowModal(true);
            }}
          >
            <div className={cx('action-item', 'update')}>
              <FontAwesomeIcon icon={faPen} size="lg" />
            </div>
          </Tooltip>
          <Tooltip color="var(--red-5-color)" title="Xóa">
            <div className={cx('action-item', 'delete')}>
              <FontAwesomeIcon icon={faTrash} size="lg" />
            </div>
          </Tooltip>
        </td>
      </tr>
    </>
  );
};

function InterningStudents() {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);
  const [students, setStudents] = useState([]);

  function teacherGetLearnInternInternJobList(intern_job_status) {
    InternService.teacherGetLearnInternInternJobList({ intern_job_status })
      .then((_students) => setStudents(_students.data))
      .catch((err) => console.log('err: ', err));
  }

  const onSave = async (score, learn_intern_id) => {
    await InternService.updateLearnInternScore({ score, learn_intern_id });
    teacherGetLearnInternInternJobList(INTERN_STATUS.IN_PROGRESS.value);
  };

  useEffect(() => {
    teacherGetLearnInternInternJobList(INTERN_STATUS.IN_PROGRESS.value);
  }, []);

  return (
    <React.Fragment>
      <h4 className={cx('category-heading')}>
        {label.score['interning-list']}
      </h4>
      <table className={cx('intern-main')}>
        <thead>
          {INTERNING_HEADERS.map((header, index) => (
            <th key={index} className={cx('field-item', header.size)}>
              {header.title}
            </th>
          ))}
        </thead>
        <tbody>
          {students.length > 0 &&
            students.map((student, index) => (
              <StudentScoreRow key={index} student={student} onSave={onSave} />
            ))}
        </tbody>
      </table>
      <Pagination
        className={cx('d-flex align-items-center justify-content-center mt-3')}
        defaultCurrent={currentPageNumber}
        total={(students.length / maxItemsInPage) * 10}
        onChange={(pageNumber) => setCurrentPageNumber(pageNumber)}
      />
      <button className={cx('save-btn')}>Lưu bảng điểm</button>
    </React.Fragment>
  );
}

export default function TeacherScore() {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  function handleNavigateTabView(index) {
    if (currentTabIndex !== index) {
      setCurrentTabIndex(index);
    }
  }

  return (
    <div className={cx('wrapper')}>
      <Header title={'Bảng điểm'} icon={faTableList} />
      <div className={cx('intern-container')}>
        <div className={cx('tab-view')}>
          <div
            className={cx('tab-view__item', {
              active: currentTabIndex === INTERNING_TABVIEW_INDEX,
            })}
            onClick={() => handleNavigateTabView(INTERNING_TABVIEW_INDEX)}
          >
            <FontAwesomeIcon icon={faSpinner} size="lg" />
            <span>Đang thực tập</span>
          </div>
          <div
            className={cx('tab-view__item', {
              active: currentTabIndex === INTERNED_TABVIEW_INDEX,
            })}
            onClick={() => handleNavigateTabView(INTERNED_TABVIEW_INDEX)}
          >
            <FontAwesomeIcon icon={faCheck} size="lg" />
            <span>Đã hoàn thành</span>
          </div>
        </div>
        {currentTabIndex === INTERNING_TABVIEW_INDEX ? (
          <InterningStudents />
        ) : (
          <InternedStudents />
        )}
      </div>
    </div>
  );
}
