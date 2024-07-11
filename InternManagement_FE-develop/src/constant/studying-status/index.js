export const STUDYING_STATUS = [
    { value: 0, label: 'Đình chỉ' },
    { value: 1, label: 'Đang học' },
    { value: 2, label: 'Tạm hoãn' },
    { value: 3, label: 'Đã tốt nghiệp' },
];

export const getStudyingStatus = (value) => {
    return STUDYING_STATUS.filter((item) => item.value === value)[0].label;
}