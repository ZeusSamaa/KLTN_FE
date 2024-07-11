import { IClass } from './class';
import { IDepartment } from './department';
import { IMajor } from './major';
import { IProgram } from './program';
import { IStudent } from './student';
import { ITeacher } from './teacher';

export const IGlobal = {
    class: { ...IClass },
    department: { ...IDepartment },
    major: { ...IMajor },
    program: { ...IProgram },
    student: { ...IStudent },
    teacher: { ...ITeacher },
};