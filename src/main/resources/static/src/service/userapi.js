import * as WebAPI from './webapi';
import * as API from '../consts/api';

export const getUsers = (resolve, reject) => {
    WebAPI.get(API.getUsers, {}, resolve, reject);
}

export const saveUser = (user, resolve, reject) => {
    return WebAPI.post(API.saveUser, {
        name: user.name,
        sex: user.sex,
        birthday: user.birthday,
        address: user.address
    }, resolve, reject);
}