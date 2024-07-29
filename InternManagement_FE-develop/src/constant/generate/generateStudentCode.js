export default function generateStudentId(admissionDate, id) {
    const year = new Date(admissionDate).getFullYear().toString(); // Lấy năm từ chuỗi ngày tháng
    const yearCode = year.slice(-2); // Lấy 2 số cuối của năm
    const fixedPart = '5203';
    const idString = id.toString().padStart(2, '0'); // Chuyển id thành chuỗi và đảm bảo có ít nhất 2 số bằng cách thêm số 0 ở đầu nếu cần
    const lastTwoDigitsOfId = idString.slice(-2); // Lấy 2 số cuối của ID

    return `${yearCode}${fixedPart}${lastTwoDigitsOfId}`;
}

