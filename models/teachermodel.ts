import {StudentModel} from './studentmodel';
import * as CourseModel from './coursemodel';
import {field, document, onetomany, manytoone, manytomany} from '../decorators'; 
import {IUser} from './user';
import {Types} from 'mongoose';
import {Strict} from '../enums';

@document({ name: 'teachers', strict: Strict.true })
export class TeacherModel {
    @field({ primary: true, autogenerated: true })
    _id: Types.ObjectId;

    @field()
    name: string;

    @field()
    age: number;

    @field()
    gender: string;

    @manytomany({ rel: 'courses', itemType: CourseModel, embedded: true })
    courses: Array<CourseModel.CourseModel>;

    @onetomany({ rel: 'courses', itemType: CourseModel, embedded: true })
    preferredCourse: CourseModel.CourseModel;

}

export default TeacherModel;