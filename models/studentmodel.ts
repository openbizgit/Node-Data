/// <reference path="../datatypes/mongoose.ts" />

import * as TeacherModel from './teachermodel';
import * as CourseModel from './coursemodel';
import {onetomany, manytoone, manytomany} from '../decorators/association';
import {document} from '../decorators/document';
import {field} from '../decorators/field';
import {IUser} from './user.ts';
import {Types} from 'mongoose';
import {Strict} from '../enums/document-strict';

@document({ name: 'students', strict: Strict.true })
export class StudentModel {
    @field({ primary: true, autogenerated: true })
    _id: Types.ObjectId;

    @field()
    name: string;

    @field()
    age: number;

    @field()
    gender: string;

    @manytomany({ rel: 'courses', itemType: CourseModel, embedded: true })
    course: CourseModel.CourseModel;

    @manytomany({ rel: 'courses', itemType: CourseModel, embedded: true})
    courses: Array<CourseModel.CourseModel>;

    @onetomany({ biDirectional: false, rel: 'teachers', itemType: TeacherModel, persist: true })
    teachers: Array<TeacherModel.TeacherModel>;
}

export default StudentModel;