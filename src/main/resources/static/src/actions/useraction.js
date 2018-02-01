import * as MESSAGE from '../consts/message'
import * as UserAPI from '../service/userapi'

export const list = () => {
    return (dispatch) => {
        UserAPI.getUsers(json => {
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