import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { EXPORT_TYPE } from '../constant/export-type';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const formattedStudentDataInToPDF = (student) => {
    return [
        {
            text: student.no,
            width: 40,
            height: 40,
            marginBottom: 10,
        },
        {
            text: student.name,
            marginTop: 25,
            marginBottom: 25,
            fontSize: 10,
            textAlign: 'center',
        },
        {
            text: student.admission_date,
            marginTop: 25,
            marginBottom: 25,
            fontSize: 10,
        },
        {
            text: student.dob,
            marginTop: 25,
            marginBottom: 25,
            fontSize: 10,
        },
        {
            text: student.class_name,
            marginTop: 25,
            marginBottom: 25,
            fontSize: 10,
        },
        {
            text: student.current_status,
            marginTop: 25,
            marginBottom: 25,
            fontSize: 10,
            bold: true,
            fontStyle: 'italic',
        },
    ];
}

const formattedTeacherDataIntoPDF = (teacher) => {
    return [
        {
            text: teacher.no,
            width: 40,
            height: 40,
            marginTop: 10,
            marginBottom: 10,
        },
        {
            text: teacher.name,
            marginTop: 25,
            marginBottom: 25,
            fontSize: 10,
        },
        {
            text: teacher.email,
            marginTop: 25,
            marginBottom: 25,
            fontSize: 10,
        },
        {
            // department
            text: teacher.department_name,
            marginTop: 25,
            marginBottom: 25,
            fontSize: 10,
        },
        {
            text: teacher.current_status,
            marginTop: 25,
            marginBottom: 25,
            fontSize: 10,
            bold: true,
            fontStyle: 'italic',
        },
    ];
}

export const exportData = (data, type) => {
    const newData = data.map((item) => {
        let rowData = [];
        if (type === EXPORT_TYPE.STUDENT) {
            rowData.push(rowData = formattedStudentDataInToPDF(item));
            return rowData;
        } 
        if (type === EXPORT_TYPE.TEACHER) {
            rowData.push(rowData = formattedTeacherDataIntoPDF(item));
            return rowData;
        }
    });

    let headers = [];
    if (type === EXPORT_TYPE.STUDENT) {
        headers = ['STT', 'Họ và tên', 'Email', 'Ngày sinh', 'Lớp', 'Tình trạng'];
    } else if (type === EXPORT_TYPE.TEACHER) {
        headers = ['STT', 'Họ và tên', 'Email', 'Khoa', 'Tình trạng'];
    }

    const mergedBody = () => {
        const initBody = [];
        initBody.push(headers.map((heading) => ({ text: heading, bold: true })));
        newData.forEach((data) => {
            const item = data.map((cell) => ({ 
                text: cell.text, 
                style: 'cellStyle'
            }));
            initBody.push(item);
        });
        return initBody;
    };

    let widths = [];

    if (type === EXPORT_TYPE.STUDENT) {
        widths = [50, 90, '*', 70, 'auto', '*'];

    } else if (type === EXPORT_TYPE.TEACHER) {
        widths = [50, 90, '*', 'auto', '*'];
    }


    const docDefinition = {
        content: [
            {
                table: {
                    headerRows: 1,
                    widths,
                    body: mergedBody(),
                },
                layout: 'lightHorizontalLines', 
            },
        ],
        styles: {
            cellStyle: {
                marginTop: 10,
                marginBottom: 10,
                fontSize: 10,
                width: 50,
                height: 50,
            }
        }
    };

    console.log(docDefinition)

    if (type === EXPORT_TYPE.STUDENT) {
        pdfMake.createPdf(docDefinition).download('Danh sách sinh viên');
    } else if (type === EXPORT_TYPE.TEACHER) {
        pdfMake.createPdf(docDefinition).download('Danh sách giảng viên');
    }
}