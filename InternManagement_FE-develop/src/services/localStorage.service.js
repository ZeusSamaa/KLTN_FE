import { ROLE } from '@/constant/role';
const ACCESS_TOKEN = 'secret_access';

const createNewToken = () => {
    localStorage.setItem(ACCESS_TOKEN, JSON.stringify({}));
}

const saveToken = (response) => {
    const access_token = response.access_token;
    const refresh_token = response.refresh_token;
    const role = response.user.permission.permission_name;
    const now = new Date();
    const expire_time = 1;  // 1 day

    const secret_token = {
        access_token,
        refresh_token,
        expire: now.setDate(now.getDate() + expire_time),
        role
    }
    return new Promise((resolve) => resolve(
        localStorage.setItem(ACCESS_TOKEN, JSON.stringify(secret_token))
    ));
}

const removeToken = () => {
    localStorage.removeItem(ACCESS_TOKEN);
}

const getToken = () => {
    return new Promise((resolve) => {
        if (typeof window !== 'undefined') {
            const secret_data = localStorage.getItem(ACCESS_TOKEN);
            if (secret_data) {
                resolve(JSON.parse(secret_data));
            }
        }
        resolve(null);
    })
}

const getSyncToken = () => {
    if (typeof window !== 'undefined') {
        const secret_data = localStorage.getItem(ACCESS_TOKEN);
        if (secret_data) {
            return JSON.parse(secret_data);
        }
    }
    return null;
}

const getRole = () => {
    if (typeof window !== 'undefined') {
        const secret_data = localStorage.getItem(ACCESS_TOKEN);
        if (secret_data) {
            return JSON.parse(secret_data).role;
        }
    }
    return ROLE.UNLOGINED;
}

export const LocalStorageService = {
    createNewToken,
    saveToken,
    removeToken,
    getToken,
    getSyncToken,
    getRole
}