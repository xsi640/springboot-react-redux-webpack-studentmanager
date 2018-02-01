import * as MESSAGE from '../consts/message'

const initialStatus = {};

export const UserReducer = (state = initialStatus, action) => {
    switch (action.type) {
        case MESSAGE.USER_LIST:
            return { ...state, userList: action.payload, error: action.error }
        case MESSAGE.USER_SAVE:
            return { ...state, user: action.payload, error: action.error }
        default:
            return state;
    }
}
