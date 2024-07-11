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

export const StudentService = {
    getAllStudents,
    postNewStudent
}