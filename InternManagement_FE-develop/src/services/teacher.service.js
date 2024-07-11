import axios from "axios";
import { environment } from "../environment";

const getAllTeachers = () => {
    const URL = environment.host + `/admin/school/teacher`;
    return axios.get(URL, { headers: environment.header });
}

const postNewTeacher = (schoolId, body) => {
    const URL = environment.host + `/admin/school/${schoolId}/register`;
    return axios.post(URL, body, { headers: environment.header });
}

export const TeacherService = {
    getAllTeachers,
    postNewTeacher
}