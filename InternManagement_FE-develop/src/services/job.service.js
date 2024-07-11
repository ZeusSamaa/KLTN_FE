import { WORK_TYPE, WORK_SPACE, JOB_LEVEL } from "@/constant/job";
import axios from "axios";
import { environment } from "../environment";

const jobs = [ 
    {
        id: 1,
        job_name: "iOS Developer",
        image: "https://images.careerbuilder.vn/content/images/IOS-developer-careerbuilder.png",
        salary: '10.000.000 VNĐ',
        rate_point: 3,
        viewers: 10,
        candidates: 4,
        appliers: 1,
        work_type: WORK_TYPE.FULL_TIME,
        work_space: WORK_SPACE.ONLINE,
        expire_date: '31-12-2023',
        level: JOB_LEVEL.INTERN,
        experience_years: 0,
        vacancies: 3,
        job_desc: "Phát triển ứng dụng di động trên hệ điều hành iOS",
        another_information: "Trụ sở công ty: TPHCM",
        requirements: "Có các kỹ năng về phát triển ứng dụng di động. Kiến thức CSDL, OOP",
        address: "TP Hồ Chí Minh",
        skills: [
            {
                id: 1,
                skill_name: "Java",
            },
            {
                id: 2,
                skill_name: "iOS",
            },
        ],
        company: "VNG"
    },
    {
        id: 2,
        job_name: "iOS Developer",
        image: "https://images.careerbuilder.vn/content/images/IOS-developer-careerbuilder.png",
        salary: '10.000.000 VNĐ',
        rate_point: 3,
        viewers: 10,
        candidates: 4,
        appliers: 1,
        work_type: WORK_TYPE.FULL_TIME,
        work_space: WORK_SPACE.ONLINE,
        expire_date: '31-12-2023',
        level: JOB_LEVEL.INTERN,
        experience_years: 0,
        vacancies: 3,
        job_desc: "Phát triển ứng dụng di động trên hệ điều hành iOS",
        another_information: "Trụ sở công ty: TPHCM",
        requirements: "Có các kỹ năng về phát triển ứng dụng di động. Kiến thức CSDL, OOP",
        address: "TP Hồ Chí Minh",
        skills: [
            {
                id: 1,
                skill_name: "Java",
            },
            {
                id: 2,
                skill_name: "iOS",
            },
        ],
        company: "VNG"
    },
    {
        id: 3,
        job_name: "iOS Developer",
        image: "https://images.careerbuilder.vn/content/images/IOS-developer-careerbuilder.png",
        salary: '10.000.000 VNĐ',
        rate_point: 3,
        viewers: 10,
        candidates: 4,
        appliers: 1,
        work_type: WORK_TYPE.FULL_TIME,
        work_space: WORK_SPACE.ONLINE,
        expire_date: '31-12-2023',
        level: JOB_LEVEL.INTERN,
        experience_years: 0,
        vacancies: 3,
        job_desc: "Phát triển ứng dụng di động trên hệ điều hành iOS",
        another_information: "Trụ sở công ty: TPHCM",
        requirements: "Có các kỹ năng về phát triển ứng dụng di động. Kiến thức CSDL, OOP",
        address: "TP Hồ Chí Minh",
        skills: [
            {
                id: 1,
                skill_name: "Java",
            },
            {
                id: 2,
                skill_name: "iOS",
            },
        ],
        company: "VNG"
    },
    {
        id: 3,
        job_name: "iOS Developer",
        image: "https://images.careerbuilder.vn/content/images/IOS-developer-careerbuilder.png",
        salary: '10.000.000 VNĐ',
        rate_point: 3,
        viewers: 10,
        candidates: 4,
        appliers: 1,
        work_type: WORK_TYPE.FULL_TIME,
        work_space: WORK_SPACE.ONLINE,
        expire_date: '31-12-2023',
        level: JOB_LEVEL.INTERN,
        experience_years: 0,
        vacancies: 3,
        job_desc: "Phát triển ứng dụng di động trên hệ điều hành iOS",
        another_information: "Trụ sở công ty: TPHCM",
        requirements: "Có các kỹ năng về phát triển ứng dụng di động. Kiến thức CSDL, OOP",
        address: "TP Hồ Chí Minh",
        skills: [
            {
                id: 1,
                skill_name: "Java",
            },
            {
                id: 2,
                skill_name: "iOS",
            },
        ],
        company: "VNG"
    },
    {
        id: 3,
        job_name: "iOS Developer",
        image: "https://images.careerbuilder.vn/content/images/IOS-developer-careerbuilder.png",
        salary: '10.000.000 VNĐ',
        rate_point: 3,
        viewers: 10,
        candidates: 4,
        appliers: 1,
        work_type: WORK_TYPE.FULL_TIME,
        work_space: WORK_SPACE.ONLINE,
        expire_date: '31-12-2023',
        level: JOB_LEVEL.INTERN,
        experience_years: 0,
        vacancies: 3,
        job_desc: "Phát triển ứng dụng di động trên hệ điều hành iOS",
        another_information: "Trụ sở công ty: TPHCM",
        requirements: "Có các kỹ năng về phát triển ứng dụng di động. Kiến thức CSDL, OOP",
        address: "TP Hồ Chí Minh",
        skills: [
            {
                id: 1,
                skill_name: "Java",
            },
            {
                id: 2,
                skill_name: "iOS",
            },
        ],
        company: "VNG"
    },
    {
        id: 3,
        job_name: "iOS Developer",
        image: "https://images.careerbuilder.vn/content/images/IOS-developer-careerbuilder.png",
        salary: '10.000.000 VNĐ',
        rate_point: 3,
        viewers: 10,
        candidates: 4,
        appliers: 1,
        work_type: WORK_TYPE.FULL_TIME,
        work_space: WORK_SPACE.ONLINE,
        expire_date: '31-12-2023',
        level: JOB_LEVEL.INTERN,
        experience_years: 0,
        vacancies: 3,
        job_desc: "Phát triển ứng dụng di động trên hệ điều hành iOS",
        another_information: "Trụ sở công ty: TPHCM",
        requirements: "Có các kỹ năng về phát triển ứng dụng di động. Kiến thức CSDL, OOP",
        address: "TP Hồ Chí Minh",
        skills: [
            {
                id: 1,
                skill_name: "Java",
            },
            {
                id: 2,
                skill_name: "iOS",
            },
        ],
        company: "VNG"
    },
    {
        id: 3,
        job_name: "iOS Developer",
        image: "https://images.careerbuilder.vn/content/images/IOS-developer-careerbuilder.png",
        salary: '10.000.000 VNĐ',
        rate_point: 3,
        viewers: 10,
        candidates: 4,
        appliers: 1,
        work_type: WORK_TYPE.FULL_TIME,
        work_space: WORK_SPACE.ONLINE,
        expire_date: '31-12-2023',
        level: JOB_LEVEL.INTERN,
        experience_years: 0,
        vacancies: 3,
        job_desc: "Phát triển ứng dụng di động trên hệ điều hành iOS",
        another_information: "Trụ sở công ty: TPHCM",
        requirements: "Có các kỹ năng về phát triển ứng dụng di động. Kiến thức CSDL, OOP",
        address: "TP Hồ Chí Minh",
        skills: [
            {
                id: 1,
                skill_name: "Java",
            },
            {
                id: 2,
                skill_name: "iOS",
            },
        ],
        company: "VNG"
    },
];

const recommending_jobs = [
    {
        id: 1,
        job_name: "ReactJS Developer",
        image: "https://images.surferseo.art/ab2827f1-a2ea-469f-874f-de59c41af595.jpeg",
        vacancies: 3,
        job_desc: "",
        another_information: "",
        requirements: "",
        skills: [
            {
                id: 1,
                skill_name: "HTML",
            },
            {
                id: 2,
                skill_name: "CSS",
            },
            {
                id: 3,
                skill_name: "Javascript",
            },
            {
                id: 4,
                skill_name: "ReactJS",
            },
        ],
        company: "FPT"
    }, 
    {
        id: 2,
        job_name: "iOS Developer",
        image: "https://images.careerbuilder.vn/content/images/IOS-developer-careerbuilder.png",
        vacancies: 3,
        job_desc: "Phát triển ứng dụng di động trên hệ điều hành iOS",
        another_information: "Trụ sở công ty: TPHCM",
        requirements: "Có các kỹ năng về phát triển ứng dụng di động. Kiến thức CSDL, OOP",
        skills: [
            {
                id: 1,
                skill_name: "Java",
            },
            {
                id: 2,
                skill_name: "iOS",
            },
        ],
        company: "VNG"
    },
];

const saved_jobs = [
    {
        id: 1,
        job_name: "ReactJS Developer",
        image: "https://images.surferseo.art/ab2827f1-a2ea-469f-874f-de59c41af595.jpeg",
        vacancies: 3,
        job_desc: "",
        another_information: "",
        requirements: "",
        skills: [
            {
                id: 1,
                skill_name: "HTML",
            },
            {
                id: 2,
                skill_name: "CSS",
            },
            {
                id: 3,
                skill_name: "Javascript",
            },
            {
                id: 4,
                skill_name: "ReactJS",
            },
        ],
        company: "FPT"
    }, 
    {
        id: 2,
        job_name: "iOS Developer",
        image: "https://images.careerbuilder.vn/content/images/IOS-developer-careerbuilder.png",
        vacancies: 3,
        job_desc: "Phát triển ứng dụng di động trên hệ điều hành iOS",
        another_information: "Trụ sở công ty: TPHCM",
        requirements: "Có các kỹ năng về phát triển ứng dụng di động. Kiến thức CSDL, OOP",
        skills: [
            {
                id: 1,
                skill_name: "Java",
            },
            {
                id: 2,
                skill_name: "iOS",
            },
        ],
        company: "VNG"
    },
];



// Job
const getJobs = ({ filterParams }) => {
    const URL = environment.host + '/business/job-list';
   
    const data = {
        search_text: filterParams.searchValue,
        skill_id: filterParams.skill,
        work_space: filterParams.workingSpace,
        work_type: filterParams.workingTime,
        position_id: filterParams.workingPosition
    }
    return axios.post(URL, data, { headers: environment.header });
};

const getJobById = (id) => {
    const URL = environment.host + '/business/job/' + id;
    return axios.get(URL, { headers: environment.header });
}

const postJob = (data) => {
    const URL = environment.host + '/business/job';
    return axios.post(URL, data, { headers: environment.header });
}

const deleteJob = (data) => {
    const URL = environment.host + '/business/job';
    return axios.delete(URL, { headers: environment.header, data });
}


const getSavedJobsInLibrary = () => {
    return new Promise((resolve) => resolve(saved_jobs));
}

// Position
const getAllPositions = () => {
    const URL = environment.host + `/business/position`;
    return axios.get(URL, { headers: environment.header });
}

const postPosition = (data) => {
    const URL = environment.host + `/business/position`;
    return axios.post(URL, data, { headers: environment.header });
}

// Skill
const getAllSkills = () => {
    const URL = environment.host + `/business/skill`;
    return axios.get(URL, { headers: environment.header });
}

const postSkill = (data) => {
    const URL = environment.host + `/business/skill`;
    return axios.post(URL, data, { headers: environment.header });
}

// Vieweres in job
const updateViewers = (jobId) => {
    const URL = environment.host + `/student/job/${jobId}/add_view`;
    return axios.put(URL, {}, { headers: environment.header });
}

const rateJob = (jobId, rate_point) => {
    const URL = environment.host + `/student/job/${jobId}/rate_point`;
    return axios.put(URL, { rate_point }, { headers: environment.header });
}


// Apply job
const applyJob = (data) => {
    const URL = environment.host + `/student/apply`;
    return axios.post(URL, data, { headers: environment.header });
}

const getAppliedJob = () => {
    const URL = environment.host + `/student/apply`;
    return axios.get(URL, { headers: environment.header });
}

const getApplyList = () => {
    const URL = environment.host + `/business/apply`;
    return axios.get(URL, { headers: environment.header });
}

const submitApplyRequest = ({ applyId, apply_status }) => {
    const URL = environment.host + `/business/apply/${applyId}`;
    return axios.post(URL, { apply_status }, { headers: environment.header });
}


// Trending jobs
const getTrendingJobs = () => {
    const URL = environment.host + `/student/job/trending`;
    return axios.get(URL, { headers: environment.header });
};

const getRecommendingJobs = () => { 
    const URL = environment.host + `/student/job/recommend`;
    return axios.get(URL, { headers: environment.header });
}

export const JobService = {
    getJobs,
    getJobById,
    postJob,
    deleteJob,
    
    // getRecommendingJobs,
    getSavedJobsInLibrary,

    getAllPositions,
    postPosition,

    getAllSkills,
    postSkill,

    updateViewers,
    rateJob,
    
    applyJob,
    getAppliedJob,
    getApplyList,
    submitApplyRequest,

    // Trending jobs
    getTrendingJobs,
    getRecommendingJobs
};