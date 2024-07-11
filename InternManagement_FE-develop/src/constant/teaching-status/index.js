export const TEACHING_STATUS = {
    RETIRE: 0,
    TEACHING: 1,
    PAUSE: 2,
    QUIT_JOB: 3,
}

export const TeachingStatusList = [
    {
        value: TEACHING_STATUS.RETIRE,
        label: 'Nghỉ hưu',
    },
    {
        value: TEACHING_STATUS.TEACHING,
        label: 'Đang dạy',
    }, 
    {
        value: TEACHING_STATUS.PAUSE,
        label: 'Tạm nghỉ',
    },
    {
        value: TEACHING_STATUS.QUIT_JOB,
        label: 'Nghỉ dạy'
    }
]

export const getTeachingStatus = (value) => {
    return TeachingStatusList.filter((item) => item.value === value)[0].label;
}