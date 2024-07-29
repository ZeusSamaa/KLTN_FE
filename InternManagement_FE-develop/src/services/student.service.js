import axios from "axios";
import { environment } from "../environment";

const getAllStudents = () => {
    const URL = environment.host + `/admin/school/student`;
    return axios.get(URL, { headers: environment.header });
}

const postNewStudent = (schoolId, body) => {
    const URL = environment.host + `/admin/school/${schoolId}/register`;
    return axios.post(URL, body, { headers: environment.header });
}

const submitBusinessReport = (result_business_file) => {
    const URL = environment.host + `/student/report-business`;

    return axios.post(URL, { result_business_file }, { headers: environment.header });
}

const submitReport = (report_file) => {
    const URL = environment.host + `/student/report`;

    return axios.post(URL, { report_file },{ headers: environment.header  });
}

export const StudentService = {
    getAllStudents,
    postNewStudent,
    submitBusinessReport,
    submitReport
}