import * as MESSAGE from '../consts/message'
import * as UserAPI from '../service/userapi'

export const list = (pageIndex, pageSize) => {
    return (dispatch) => {
        UserAPI.getUsers(pageIndex, pageSize, json => {
            dispatch({
                type: MESSAGE.USER_LIST,
                payload: json
            });
        }, err => {
            dispatch({
                type: MESSAGE.USER_LIST,
                error: err
            });
        });
    }
}

export const save = (user) => {
    return (dispatch) => {
        UserAPI.saveUser(user,
            json => {
                dispatch({
                    type: MESSAGE.USER_SAVE,
                    payload: json
                })
            },
            err => {
                dispatch({
                    type: MESSAGE.USER_SAVE,
                    error: err
                });
            }
        );
    }
}

export const modify = (user) => {
    return (dispatch) => {
        UserAPI.modifyUser(user,
            json => {
                dispatch({
                    type: MESSAGE.USER_MODIFY,
                    payload: json
                })
            },
            err => {
                dispatch({
                    type: MESSAGE.USER_MODIFY,
                    error: err
                });
            }
        );
    }
}

export const del = (id) => {
    return (dispatch) => {
        UserAPI.deleteUser(id,
            json => {
                dispatch({
                    type: MESSAGE.USER_DELETE,
                    payload: id
                })
            },
            err => {
                dispatch({
                    type: MESSAGE.USER_DELETE,
                    error: err
                });
            }
        );
    }
}