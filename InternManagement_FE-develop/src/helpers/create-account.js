import { useSelector } from "react-redux";
import { GeneralService } from "../services/general.service";
import { PERMISSION, ROLE } from "../constant/role";

function simplizedName(fullName) {
    let simplizedFullName = '';
    const splittedName = fullName.toLowerCase().split(' ');
    splittedName.forEach((item) => {
        simplizedFullName += item[0];
    }) 
    return simplizedFullName;
}

function simplizedRole(role) {
    if (role === ROLE.ADMIN) {
        return 'ad';
    }
    if (role === ROLE.BUSINESS) {
        return 'bu';
    }
    if (role === ROLE.TEACHER) {
        return 'te';
    }
    if (role === ROLE.STUDENT) {
        return 'st';
    }
    return 'ma';
}

function getPermission(role) {
    if (role === ROLE.ADMIN) {
        return PERMISSION.ADMIN;
    }
    if (role === ROLE.BUSINESS) {
        return PERMISSION.BUSINESS;
    }
    if (role === ROLE.TEACHER) {
        return PERMISSION.TEACHER;
    }
    if (role === ROLE.STUDENT) {
        return PERMISSION.STUDENT;
    }
    return PERMISSION.MANAGE_APP;
}

export const generateAccount = (fullName, role, isManager = false, _schoolShortName = '') => {
    if (role === ROLE.BUSINESS) {
        const converttedFullName = fullName.toLowerCase().split(' ').join('');
        const converttedRoleName = simplizedRole(role);

        return {
            username: `${converttedFullName}_${converttedRoleName}`,
            pass: '123456',
            permission_id: getPermission(role)
        }
    }

    return new Promise((resolve) => {
        const converttedFullName = simplizedName(fullName);
        const converttedRoleName = simplizedRole(role);

        if (!isManager) {
            GeneralService
                .getSchool()
                .then((res) => {
                    const schoolShortName = res.data.school_shorthand_name.toLowerCase();
                    
                    const account = {
                        username: `${schoolShortName}_${converttedFullName}_${converttedRoleName}`,
                        pass: '123456',
                        permission_id: getPermission(role)
                    }
            
                    resolve(account);
                })  
            return;  
        }

        const account = {
            username: `${_schoolShortName.toLowerCase()}_${converttedFullName}_${converttedRoleName}`,
            pass: '123456',
        }
        resolve(account);
    })
}
