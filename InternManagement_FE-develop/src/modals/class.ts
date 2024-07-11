export function IClass(
    no: number,
    id: number, 
    name: string, 
    number_of_students: number, 
    head_teacher: string, 
    department_name: string,
    department_id: number
) {
    this.no = no;
    this.id = id;
    this.name = name;
    this.number_of_students = number_of_students;
    this.head_teacher = head_teacher;
    this.department_name = department_name;
    this.department_id = department_id;
}