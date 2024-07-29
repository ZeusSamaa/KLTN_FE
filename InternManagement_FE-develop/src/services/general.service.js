import axios from "axios";
import { environment } from "../environment";
import { PASSED_STATUS } from "@/constant/intern-status";

const academic_years = [ 
    { value: 1, label: "2018" }, 
    { value: 2, label: "2019" }, 
    { value: 3, label: "2020" }, 
    { value: 4, label: "2021" }, 
    { value: 5, label: "2022" }, 
    { value: 6, label: "2023" }, 
];

const semesters = [
    { value: 1, label: "Học kỳ 1" },
    { value: 2, label: "Học kỳ 2" },
];

// AUTHEN ACCOUNT 
const getProfile = () => {
    const URL = environment.host + `/user/profile`;
    return axios.get(URL, { headers: environment.header });
}

// SCHOOL
const createAccount = (data) => {
    const URL = environment.host + '/admin/admin-school';
    return axios.post(URL, data, { headers: environment.header });
}

const getAllSchools = () => {
    const URL = environment.host + '/admin/manage-school';
    return axios.get(URL, { headers: environment.header });
}

const getSchool = () => {
    const URL = environment.host + '/admin/school';
    return axios.get(URL, { headers: environment.header });
}

const postSchool = (data) => {
    const URL = environment.host + '/admin/school';
    return axios.post(URL, data, { headers: environment.header });
}

// PROGRAM
const getAllPrograms = (schoolId) => { 
    const URL = environment.host + `/admin/school/${schoolId}/program`;
    return axios.get(URL, { headers: environment.header });
}

const postProgram = (program, type) => {
    let URL = environment.host + `/admin/school/${program.school_id}/program`;
    if (type === 'create') {
        return axios.post(URL, program, { headers: environment.header });
    }
    URL += `/${program.id}`
    return axios.put(URL, program, { headers: environment.header });
}

// DEPARTMENT
const getAllDepartments = (schoolId) => {
    const URL = environment.host + `/admin/school/${schoolId}/department`;
    return axios.get(URL, { headers: environment.header });
}

const postDepartment = (department, type) => {
    let URL = environment.host + `/admin/school/${department.school_id}/department`;

    let request = {
        URL,
        body: { department_name: department.department_name },
        header: { headers: environment.header }
    }
    if (type === 'create') {
        return axios.post(request.URL, request.body, request.header);
    }

    request.URL += `/${department.id}`;
    if (department?.department_head) {
        request.body.department_head = department.department_head;
    }
    return axios.put(request.URL, request.body, request.header);
}


// MAJOR
const getAllMajors = (schoolId) => {
    const URL = environment.host + `/admin/school/${schoolId}/major`;
    return axios.get(URL, { headers: environment.header });
}

const postMajor = (major, schoolId) => {
    const URL = environment.host + `/admin/school/${schoolId}/major`;

    return axios.post(URL, major, { headers: environment.header });
}

// CLASS
const getAllClasses = (schoolId) => {
    const URL = environment.host + `/admin/school/${schoolId}/class`;
    return axios.get(URL, { headers: environment.header });
}

const postClass = (body, schoolId, departmentId, type) => {
    let URL = environment.host + `/admin/school/${schoolId}/department/${departmentId}/class`;

    if (type === 'create') {
        return axios.post(URL, body, { headers: environment.header });
    }

    URL += `/class/${body.id}`;
    return axios.put(URL, body, { headers: environment.header });
}


// BUSINESS
const postBusiness = (data) => {
    const URL = environment.host + '/admin/business';
    return axios.post(URL, data, { headers: environment.header });
}

const getBusinesses = () => {
    const URL = environment.host + '/admin/business';
    return axios.get(URL, { headers: environment.header });
}

// ACADEMIC YEAR
const getAcademicYears = (schoolId) => {
    const URL = environment.host + `/admin/school/${schoolId}/academic-year`;
    return axios.get(URL, { headers: environment.header });
}

const postAcademicYear = (schoolId, data) => {
    const URL = environment.host + `/admin/school/${schoolId}/academic-year`;
    return axios.post(URL, data, { headers: environment.header});
}

const deleteAcademicYear = (schoolId, yearId) => {
    const URL = environment.host + `/admin/school/${schoolId}/academic-year/${yearId}`;
    return axios.delete(URL, { headers: environment.header });
}

// SEMESTER
const getAllSemesters = (schoolId) => {
    const URL = environment.host + `/admin/school/${schoolId}/semester`;
    return axios.get(URL, { headers: environment.header });
}

const postSemester = (schoolId, data) => {
    const URL = environment.host + `/admin/school/${schoolId}/semester`;
    return axios.post(URL, data, { headers: environment.header});
}

const deleteSemester = (schoolId, semesterId) => {
    const URL = environment.host + `/admin/school/${schoolId}/semester/${semesterId}`;
    return axios.delete(URL, { headers: environment.header });
}


// STATUS
const getStatuses = () => {
    return new Promise((resolve) => resolve(PASSED_STATUS));
}



// LINKED BUSINESS AND SCHOOL (ADMIN)
const getUnLinkedBusinesses = () => {
    const URL = environment.host + `/admin/school-linked-business`;
    return axios.post(URL, { is_linked: false }, { headers: environment.header });
}

const getLinkedBusiness = () => {
    const URL = environment.host + `/admin/school-linked-business`;
    return axios.post(URL, { is_linked: true }, { headers: environment.header });
}

const postLinkedBusiness = (business_id) => {
    const URL = environment.host + `/admin/create-school-linked-business`;
    return axios.post(URL, { business_id }, { headers: environment.header });
}


// LINKED BUSINESS AND SCHOOL (BUSINESS)
const getLinkedSchool = () => {
    const URL = environment.host + `/business/linked-school`;
    return axios.get(URL, { headers: environment.header });
}

const updateLinkedStatus = (status, id) => {
    const URL = environment.host + `/business/linked-school/${id}`;
    return axios.put(URL, { status }, { headers: environment.header });
}

export const GeneralService = {
    getProfile,

    // School
    createAccount,
    getAllSchools,
    getSchool,
    postSchool,

    // Program
    getAllPrograms,
    postProgram,

    // Department
    getAllDepartments,
    postDepartment,

    // Major
    getAllMajors,
    postMajor,

    // Class
    getAllClasses,
    postClass,

    // Business
    postBusiness,
    getBusinesses,
    
    // Academic year
    getAcademicYears,
    postAcademicYear,
    deleteAcademicYear,

    // Semester
    getAllSemesters,
    postSemester,
    deleteSemester,

    getStatuses,

    // Linked business and school
    getUnLinkedBusinesses,
    getLinkedBusiness,
    postLinkedBusiness,
    getLinkedSchool,
    updateLinkedStatus
}