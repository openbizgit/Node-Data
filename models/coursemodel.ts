import * as TM from './teachermodel';
import * as SM from './studentmodel';
import {field, document, onetomany, manytoone, manytomany} from '../decorators'; 
import {Types} from 'mongoose';
import {Strict} from '../enums';

@document({ name: 'courses', strict: Strict.throw })
export class CourseModel {
    @field({ primary: true, autogenerated: true })
    _id: Types.ObjectId;

    @field()
    name: String;
}

export default CourseModel;