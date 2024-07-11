export const handleNavigate = (currentRole, acceptedRole) => {
    return new Promise((resolve, reject) => {
        if (currentRole !== acceptedRole) {
            reject({
                status: 403,
                message: "You are not allowed to access this page"
            })
        } else {
            resolve();
        }
    })
}