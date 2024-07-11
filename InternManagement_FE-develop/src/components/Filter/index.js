import SelectOption from "../Select";
import classNames from "classnames/bind";
import styles from "./Filter.module.scss";

const cx = classNames.bind(styles);

export default function Filter({ 
    academicYear, 
    setAcademicYear, 
    semester, 
    setSemester 
}) {
    
    const academicYears = [
        { label: '2019', value: 2019},
        { label: '2020', value: 2020},
        { label: '2021', value: 2021},
        { label: '2022', value: 2022},
        { label: '2023', value: 2023},
    ];
    const semesters = [
        { label: 'Học kỳ 1', value: 1 },
        { label: 'Học kỳ 2', value: 2 },
    ];

    function handleChangeAcademicYear(event) {
        setAcademicYear(event.target.value);
    };

    function handleChangeSemester(event) {
        setSemester(event.target.value);
    };

    return (
        <div className={cx('filter-options')}>
            <SelectOption 
                label='Năm học' 
                state={academicYear}
                data={academicYears}
                onChange={handleChangeAcademicYear}
            />

            <SelectOption 
                label='Học kỳ' 
                state={semester}
                data={semesters}
                onChange={handleChangeSemester}
            />
        </div>
    )
}