import * as MESSAGE from '../consts/message'

const initialStatus = {
    users: undefined,
    user: undefined,
    deleteUserId: undefined,
    error: undefined,
};

export const UserReducer = (state = initialStatus, action) => {
    switch (action.type) {
        case MESSAGE.USER_LIST:
            return {
                ...state,
                users: action.payload,
                user: undefined,
                deleteUserId: undefined,
                error: action.error
            }
        case MESSAGE.USER_SAVE:
        case MESSAGE.USER_MODIFY:
            return {
                ...state,
                user: action.payload,
                users: undefined,
                deleteUserId: undefined,
                error: action.error
            }
        case MESSAGE.USER_DELETE:
            return {
                ...state,
                users: undefined,
                user: undefined,
                deleteUserId: action.payload,
                error: action.error
            }
        case MESSAGE.CLEAR:
            return {
                users: undefined,
                user: undefined,
                deleteUserId: undefined,
                error: undefined
            };
        default:
            return state;
    }
}
