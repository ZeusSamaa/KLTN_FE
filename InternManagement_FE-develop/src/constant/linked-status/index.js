export const LINKED_STATUS = {
    WAITING: {
        value: 'WAITING',
        name: 'Đang chờ'
    },
    APPROVED: {
        value: 'APPROVED',
        name: 'Thành công'
    },
    REJECTED: {
        value: 'REJECTED',
        name: 'Đã hủy'
    },
}

export const getLinkedStatus = (value) => {
    const findedKey = Object.keys(LINKED_STATUS).filter((key) => LINKED_STATUS[key].value === value)[0];
    return LINKED_STATUS[findedKey].name;
}