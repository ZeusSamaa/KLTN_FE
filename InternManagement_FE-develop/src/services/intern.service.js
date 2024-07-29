import axios from "axios";
import { environment } from "../environment";

const openingSubjects = [
    {
        id: 1,
        name: 'Thực tập tốt nghiệp',
        unit: 4,
        sessions: 16,
        teacher: 'Nguyễn Hoàng Nam',
        department: 'Công nghệ phần mềm',
        maxStudents: 100,
        availableSlots: 20,
    },
    {
        id: 2,
        name: 'Thực tập tốt nghiệp',
        unit: 4,
        sessions: 16,
        teacher: 'Phạm Hoàng Uyên',
        department: 'Công nghệ phần mềm',
        maxStudents: 100,
        availableSlots: 40,
    },
    {
        id: 2,
        name: 'Thực tập tốt nghiệp',
        unit: 4,
        sessions: 16,
        teacher: 'Phạm Hoàng Uyên',
        department: 'Công nghệ phần mềm',
        maxStudents: 100,
        availableSlots: 40,
    },
    {
        id: 2,
        name: 'Thực tập tốt nghiệp',
        unit: 4,
        sessions: 16,
        teacher: 'Phạm Hoàng Uyên',
        department: 'Công nghệ phần mềm',
        maxStudents: 100,
        availableSlots: 0,
    },
    {
        id: 2,
        name: 'Thực tập tốt nghiệp',
        unit: 4,
        sessions: 16,
        teacher: 'Phạm Hoàng Uyên',
        department: 'Công nghệ phần mềm',
        maxStudents: 100,
        availableSlots: 0,
    },
    {
        id: 2,
        name: 'Thực tập tốt nghiệp',
        unit: 4,
        sessions: 16,
        teacher: 'Phạm Hoàng Uyên',
        department: 'Công nghệ phần mềm',
        maxStudents: 100,
        availableSlots: 0,
    },
    {
        id: 2,
        name: 'Thực tập tốt nghiệp',
        unit: 4,
        sessions: 16,
        teacher: 'Phạm Hoàng Uyên',
        department: 'Công nghệ phần mềm',
        maxStudents: 100,
        availableSlots: 0,
    },
    {
        id: 2,
        name: 'Thực tập tốt nghiệp',
        unit: 4,
        sessions: 16,
        teacher: 'Phạm Hoàng Uyên',
        department: 'Công nghệ phần mềm',
        maxStudents: 100,
        availableSlots: 0,
    },
    {
        id: 2,
        name: 'Thực tập tốt nghiệp',
        unit: 4,
        sessions: 16,
        teacher: 'Phạm Hoàng Uyên',
        department: 'Công nghệ phần mềm',
        maxStudents: 100,
        availableSlots: 0,
    },
    {
        id: 2,
        name: 'Thực tập tốt nghiệp',
        unit: 4,
        sessions: 16,
        teacher: 'Phạm Hoàng Uyên',
        department: 'Công nghệ phần mềm',
        maxStudents: 100,
        availableSlots: 0,
    },
    {
        id: 2,
        name: 'Thực tập tốt nghiệp',
        unit: 4,
        sessions: 16,
        teacher: 'Phạm Hoàng Uyên',
        department: 'Công nghệ phần mềm',
        maxStudents: 100,
        availableSlots: 0,
    },
    {
        id: 2,
        name: 'Thực tập tốt nghiệp',
        unit: 4,
        sessions: 16,
        teacher: 'Phạm Hoàng Uyên',
        department: 'Công nghệ phần mềm',
        maxStudents: 100,
        availableSlots: 0,
    },
    {
        id: 2,
        name: 'Thực tập tốt nghiệp',
        unit: 4,
        sessions: 16,
        teacher: 'Phạm Hoàng Uyên',
        department: 'Công nghệ phần mềm',
        maxStudents: 100,
        availableSlots: 0,
    },
    {
        id: 2,
        name: 'Thực tập tốt nghiệp',
        unit: 4,
        sessions: 16,
        teacher: 'Phạm Hoàng Uyên',
        department: 'Công nghệ phần mềm',
        maxStudents: 100,
        availableSlots: 0,
    },
];

const internList = [
    {
        id: 1,
        image_path: "https://t3.ftcdn.net/jpg/02/00/90/24/360_F_200902415_G4eZ9Ok3Ypd4SZZKjc8nqJyFVp1eOD6V.jpg",
        student_id: "20521764",
        full_name: "Lê Thế Phúc",
        class: "KTPM2020",
        score: null,
        status: 1,
        job: "ReactJS Intern"
    },
    {
        id: 2,
        image_path: "https://media.istockphoto.com/id/1096419446/photo/modern-cheerful-business-man-in-deep-blue-shirt-standing-with-crossed-arms-isolated-on-gray.jpg?s=612x612&w=0&k=20&c=r4f-QedoEjL9KU-H96imU5UI5594wFUj2A9PgD8JXGY=",
        student_id: "20521764",
        full_name: "Lê Sỹ Hội",
        class: "KTPM2020",
        score: null,
        status: 1,
        job: "PHP Intern"
    },
    {
        id: 3,
        image_path: "https://t3.ftcdn.net/jpg/02/00/90/24/360_F_200902415_G4eZ9Ok3Ypd4SZZKjc8nqJyFVp1eOD6V.jpg",
        student_id: "20521764",
        full_name: "Nguyễn Viết Đức",
        class: "KTPM2020",
        score: 9,
        status: 2,
        job: "C# Intern"
    },
    {
        id: 4,
        image_path: "https://media.istockphoto.com/id/1096419446/photo/modern-cheerful-business-man-in-deep-blue-shirt-standing-with-crossed-arms-isolated-on-gray.jpg?s=612x612&w=0&k=20&c=r4f-QedoEjL9KU-H96imU5UI5594wFUj2A9PgD8JXGY=",
        student_id: "20521764",
        full_name: "Nguyễn Nhật Hoàng Quân",
        class: "KTPM2020",
        score: null,
        status: 1,
        job: "NodeJS Intern"
    },
    {
        id: 5,
        image_path: "https://t3.ftcdn.net/jpg/02/00/90/24/360_F_200902415_G4eZ9Ok3Ypd4SZZKjc8nqJyFVp1eOD6V.jpg",
        student_id: "20521764",
        full_name: "Triệu Văn Kim",
        class: "KTPM2020",
        score: 8,
        status: 2,
        job: "Frontend Intern"
    },
];

const getOpeningSubjects = () => {
    return new Promise((resolve) => resolve(openingSubjects));
}

const teacherGetInterningList = (data) => {
    const URL = environment.host + `/teacher/student-learn-intern`;
    return axios.get(URL, {
        headers: environment.header, params: data});
}

const teacherGetLearnInternInternJobList = (data) => {
    const URL = environment.host + `/teacher/student-learn-intern-intern-job`;
    return axios.get(URL, {
        headers: environment.header, params: data});
}

const adminGetInterningList = (data) => { 
    const URL = environment.host + `/admin/school/${data?.id}/learn-intern-all`;
    return axios.get(URL, {
        headers: environment.header, params: {
            is_report: data?.is_report
        }});
}

const updateLearnInternScore = (data) => { 
    const URL = environment.host + `/teacher/student-learn-intern/${data.learn_intern_id}`;
    return axios.put(URL, {score:data.score}, { headers: environment.header });
}

const getInternedList = () => {
    return new Promise((resolve) => resolve(internList.filter((item) => item.status === 2)));
}


// Intern Subject (STUDENT)
const createSubject = (schoolId, departmentId, data) => {
    const URL = environment.host + `/admin/school/${schoolId}/department/${departmentId}}/intern-subject`;
    return axios.post(URL, data, { headers: environment.header });
}

const getOpeningInternSubjects = (schoolId, curentAcademicYear = null, currentSemester = null) => {
    let URL = environment.host + `/admin/school/${schoolId}/intern-subject`;
    const data = {};
    if (curentAcademicYear) {
        data.academic_year = curentAcademicYear;
    }
    if (currentSemester) {
        data.semester_id = currentSemester;
    }
    return axios.get(URL, { headers: environment.header, data });
}

const registInternSubject = (subjectId) => {
    const URL = environment.host +  `/student/intern-subject/${subjectId}/learn-intern`;
    return axios.post(URL, {}, { headers: environment.header });
}

const getRegistedSubject = (studentId) => {
    const URL = environment.host +  `/student/intern-subject/learn-intern`;
    return axios.get(URL, { headers: environment.header, data: { id: studentId } });
}

const deleteRegistedSubjectRequest = (studentId, subjectId, learnId) => {
    const URL = environment.host + `/student/intern-subject/${subjectId}/learn-intern/${learnId}`;
    return axios.delete(URL, { headers: environment.header, data: { id: studentId } });
}

// Intern Subject Request List (ADMIN)
const getRegistSubjectRequestList = (schoolId) => {
    const URL = environment.host + `/admin/school/${schoolId}/learn-intern`;
    return axios.get(URL, { headers: environment.header });
}

const updateRegistSubjectRequest = ( { learnId, regist_status } ) => {
    const URL = environment.host + `/admin/school/learn-intern/${learnId}`;
    return axios.put(URL, { regist_status }, { headers: environment.header });
}

// Intern Request List (ADMIN)
const getRegistInternRequestList = (schoolId) => {
    const URL = environment.host + `/admin/introducing-letter`;
    return axios.get(URL, { headers: environment.header, data: { schoolId } });
}


// Cover letter
const postCoverLetterRequest = (data) => {
    const URL = environment.host + `/student/introducing-letter`;
    return axios.post(URL, data, { headers: environment.header });
}

const getCoverLetterRequest = (data) => {
    const URL = environment.host + `/student/introducing-letter`;
    return axios.get(URL, { headers: environment.header, data });
}

const deleteCoverLetterRequest = ({ userId, requestId }) => {
    const URL = environment.host + `/student/introducing-letter/${requestId}`;
    return axios.delete(URL, { headers: environment.header, data: { id: userId } });
}

const submitCoverLetterRequest = ({ requestId, file }) => {
    const URL = environment.host + `/admin/introducing-letter/${requestId}`;
    return axios.put(URL, { file }, { headers: environment.header });
}

// Accept Intern (STUDENT)
const submitInternProgress = ({ id, is_interning }) => {
    const URL = environment.host + `/student/intern-job/${id}`;
    return axios.put(URL, { is_interning }, { headers: environment.header });
}

export const InternService = {
    getOpeningSubjects,
    getInterningList: teacherGetInterningList,
    teacherGetLearnInternInternJobList,
    getInternedList,


    // Intern Subject (STUDENT)
    createSubject,
    getOpeningInternSubjects,
    registInternSubject,
    getRegistedSubject,
    deleteRegistedSubjectRequest,

    // Intern Subject Request List (ADMIN)
    getRegistSubjectRequestList,
    updateRegistSubjectRequest,

    // Intern Request List (ADMIN)
    getRegistInternRequestList,

    // Intern
    postCoverLetterRequest,
    getCoverLetterRequest,
    deleteCoverLetterRequest,
    submitCoverLetterRequest,

    submitInternProgress,

    updateLearnInternScore,

    adminGetInterningList
}