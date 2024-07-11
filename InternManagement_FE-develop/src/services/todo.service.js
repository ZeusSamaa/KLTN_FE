import axios from "axios";
import { environment } from "../environment";

import { TODO_STATUS } from "../constant/todo-status";

const todos = [
    { id: 1, title: 'Design UI', createdAt: '20/10/2023', completedAt: '26/10/2023', status: TODO_STATUS.completed},
    { id: 2, title: 'Write Product Requirements', createdAt: '25/10/2023', completedAt: '30/10/2023', status: TODO_STATUS.active},
    { id: 3, title: 'Refact file structure', createdAt: '29/10/2023', completedAt: '05/11/2023', status: TODO_STATUS.expired},
    { id: 4, title: 'Learn English', createdAt: '03/11/2023', completedAt: '07/11/2023', status: TODO_STATUS.completed},
    { id: 5, title: 'Call API check todo', createdAt: '10/11/2023', completedAt: '', status: TODO_STATUS.active},
]

const appreciations = [
    {
        todo_id: 1, 
        appreciation_items: [
            { id: 1, content: 'Bạn nên tăng kích thước font chữ', createdAt: '05/11/2023', createdBy: 'phucle' } ,           
            { id: 2, content: 'Hạn chế sử dụng Gradient', createdAt: '07/11/2023', createdBy: 'phucle' } ,           
            { id: 3, content: 'Hạn chế sử dụng Gradient', createdAt: '07/11/2023', createdBy: 'phucle' } ,           
            { id: 4, content: 'Hạn chế sử dụng Gradient', createdAt: '07/11/2023', createdBy: 'phucle' } ,           
            { id: 5, content: 'Hạn chế sử dụng Gradient', createdAt: '07/11/2023', createdBy: 'phucle' } ,           
            { id: 6, content: 'Hạn chế sử dụng Gradient', createdAt: '07/11/2023', createdBy: 'phucle' } ,           
            { id: 7, content: 'Hạn chế sử dụng Gradient', createdAt: '07/11/2023', createdBy: 'phucle' } ,           
            { id: 8, content: 'Hạn chế sử dụng Gradient', createdAt: '07/11/2023', createdBy: 'phucle' } ,           
        ]
    }, 
    {
        todo_id: 2, 
        appreciation_items: [
            { id: 1, content: 'Cần mô tả chi tiết hơn mục tiêu', createdAt: '04/11/2023', createdBy: 'phucle' } ,           
        ]
    }
]

const getTodos = () => {
    return new Promise((resolve, reject) => { resolve(todos) });
}


// Todo
const getTodoList = (studentId) => {
    let URL = environment.host;
    if (studentId) {
        URL += `/business/regular-todo/${studentId}`;
    } else {
        URL += `/student/regular-todo`;
    }
    return axios.get(URL, { headers: environment.header });
}

const saveTodo = (regularId, data) => {
    const URL = environment.host + `/business/regular-todo/${regularId}/todo`;
    return axios.post(URL, data, { headers: environment.header });
}

const completeTodo = (detailTodoId, completed_status, out_of_expire) => {
    const URL = environment.host + `/student/regular-todo/detail-todo/${detailTodoId}`;
    return axios.put(URL, { completed_status, out_of_expire }, { headers: environment.header });
}


export const TodoService = {
    getTodos,

    getTodoList,
    saveTodo,
    completeTodo
}