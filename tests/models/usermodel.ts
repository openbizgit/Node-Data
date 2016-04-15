import * as RM from './rolemodel';
import {onetomany, manytoone, manytomany} from '../../core/decorators';
import {field, document} from '../../mongoose/decorators'; import {IUser} from './user';
import {Types} from 'mongoose';
import {Strict} from '../../mongoose/enums/';
import * as r from './rolemodel';

@document({ name: 'users', strict: Strict.false })
export class UserModel {
    @field({ primary: true, autogenerated: true })
    _id: Types.ObjectId;

    @field()
    name: String;

    @field({ itemType: String})
    courses: Array<String>;

    @field()
    email: String;

    @field()
    accessToken: String;

    @field()
    refreshToken: String;

    @field()
    password: String;

    @field()
    age: String;

    @field({ itemType: Object })
    arr: Array<any>;
}

export default UserModel;