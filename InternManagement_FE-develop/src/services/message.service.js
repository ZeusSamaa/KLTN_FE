import axios from "axios";
import { environment } from "../environment";

const usersInMessages = [
    {
        chat_id: 1,
        avatar_path: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHx8MHx8fDA%3D",
        full_name: "John",
        last_message: "Hello guys",
        is_me: false,
        user_id: 1,
    },
    {
        chat_id: 2,
        avatar_path: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHx8MHx8fDA%3D",
        full_name: "Tonny",
        last_message: "Nice to meet you",
        is_me: false,
        user_id: 2,
    },
    {
        chat_id: 3,
        avatar_path: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHx8MHx8fDA%3D",
        full_name: "Jack",
        last_message: "Where are you from?",
        is_me: true,
        user_id: 3
    },
];

const messages = [
    {
        id: 1,
        participants: [
            { user_id: 1 },
            { user_id: 3 },
        ],
        contents: [
            { id: 1, message_content: "Nice to meet you", sent_by: 1 },
            { id: 2, message_content: "Hello", sent_by: 3 },
            { id: 3, message_content: "What is your name?", sent_by: 3 },
            { id: 4, message_content: "I'm John", sent_by: 1 },

        ]
    }
];

const getConversationsInBusiness = () => {
    const URL = environment.host + '/chat/business/conversations';
    return axios.get(URL, { headers: environment.header });
}

const getConversationDetailInBusiness = (channelId) => {
    const URL = environment.host + `/chat/business/conversations/${channelId}`;
    return axios.get(URL, { headers: environment.header });
}

const getConversationsInStudent = () => {
    const URL = environment.host + '/chat/student/conversations';
    return axios.get(URL, { headers: environment.header });
}

const getConversationDetailInStudent = (channelId) => {
    const URL = environment.host + `/chat/student/conversations/${channelId}`;
    return axios.get(URL, { headers: environment.header });
}


export const MessageService = {
    getConversationsInBusiness,
    getConversationDetailInBusiness,

    getConversationsInStudent,
    getConversationDetailInStudent
}