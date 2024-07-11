export const PASSED_STATUS = {
    STUDYING: {
        value: 'STUDYING',
        name: 'Đang học'
    },
    FAILED: {
        value: 'FAILED',
        name: 'Thất bại'
    },
    PASSED: {
        value: 'PASSED',
        name: 'Thành công'
    },
}

export const REGIST_STATUS = {
    REGISTERING: {
        value: 'REGISTERING',
        name: 'Đang chờ'
    },
    REJECTED: {
        value: 'REJECTED',
        name: 'Thất bại'
    },
    SUCCESSED: {
        value: 'SUCCESSED',
        name: 'Thành công'
    }
}

export const COVER_LETTER_STATUS = {
    WAITTING: {
        value: 'WAITTING',
        name: 'Đang chờ'
    },
    REJECTED: {
        value: 'REJECTED',
        name: 'Thất bại'
    },
    SENT: {
        value: 'SENT',
        name: 'Đã xác nhận'
    }
}

export const APPLY_STATUS = {
    APPLYING: {
        value: 'APPLYING',
        name: 'Chờ xác nhận'
    },
    INTERVIEWING: {
        value: 'INTERVIEWING',
        name: 'Chờ phỏng vấn'
    },
    FAILED: {
        value: 'FAILED',
        name: 'Trượt'
    },
    ONBOARD: {
        value: 'ONBOARD',
        name: 'Đang thực tập'
    },
    APPROVED: {
        value: 'APPROVED',
        name: 'Đã được duyệt'
    },
    FINISHED: {
        value: 'FINISHED',
        name: 'Đã hoàn thành'
    }
}

export const INTERN_STATUS = {
    WAITTING: {
        value: 'WAITTING',
        name: 'Đang chờ'
    },
    IN_PROGRESS: {
        value: 'IN_PROGRESS',
        name: 'Đang thực tập'
    },
    FINISHED: {
        value: 'FINISHED',
        name: 'Hoàn thành'
    },
    REJECTED: {
        value: 'REJECTED',
        name: 'Đã hủy'
    },
}

export const getPassedStatus = (value) => {
    const findedKey = Object.keys(PASSED_STATUS).filter((key) => PASSED_STATUS[key].value === value)[0];
    return PASSED_STATUS[findedKey].name;
}

export const getRegistStatus = (value) => {
    const findedKey = Object.keys(REGIST_STATUS).filter((key) => REGIST_STATUS[key].value === value)[0];
    return REGIST_STATUS[findedKey].name;
}

export const getCoverLetterStatus = (value) => {
    const findedKey = Object.keys(COVER_LETTER_STATUS).filter((key) => COVER_LETTER_STATUS[key].value === value)[0];
    return COVER_LETTER_STATUS[findedKey].name;
}

export const getApplyStatus = (value) => {
    const findedKey = Object.keys(APPLY_STATUS).filter((key) => APPLY_STATUS[key].value === value)[0];
    return APPLY_STATUS[findedKey].name;
}