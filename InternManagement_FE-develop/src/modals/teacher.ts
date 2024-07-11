export function ITeacher(
    id: number,
    no: number,
    image: string,
    name: string,
    email: string,
    dob: string,
    start_date: number,
    education_level: string,
    experience_year: number,
    current_status: string,
    department_name: string,

) {
    this.id = id;
    this.no = no;
    this.image = image;
    this.name = name;
    this.email = email;
    this.dob = dob;
    this.start_date = start_date;
    this.education_level = education_level;
    this.experience_year = experience_year;
    this.current_status = current_status;
    this.department_name = department_name;
}