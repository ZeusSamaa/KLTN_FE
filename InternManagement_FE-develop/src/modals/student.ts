export function IStudent(
    no: number,
    id: number,
    name: string,
    admission_date: string,
    dob: string,
    sex: string,
    current_status: string,
    class_name: string,
) {
    this.no = no;
    this.id = id;
    this.name = name;
    this.admission_date = admission_date;
    this.dob = dob;
    this.sex = sex;
    this.current_status = current_status;
    this.class_name = class_name;
}