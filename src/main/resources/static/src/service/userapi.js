import { Request, Method } from './webapi';
import * as API from '../consts/api';

export const getUsers = (pageIndex, pageSize, resolve, reject) => {
    Request(API.getUsers, Method.GET, {
        pageIndex,
        pageSize
    }, resolve, reject);
}

export const saveUser = (user, resolve, reject) => {
    return Request(API.saveUser, Method.POST, {
        name: user.name,
        sex: user.sex,
        birthday: user.birthday,
        address: user.address
    }, resolve, reject);
}

export const modifyUser = (user, resolve, reject) => {
    return Request(API.saveUser, Method.PUT, {
        id: user.id,
        name: user.name,
        sex: user.sex,
        birthday: user.birthday,
        address: user.address
    }, resolve, reject)
}

export const deleteUser = (id, resolve, reject) => {
    let url = API.deleteUser.replace(/{id}/g, id);
    return Request(url, Method.DELETE, {}, resolve, reject)
}