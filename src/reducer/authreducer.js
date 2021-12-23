import { authConstants } from "../actions/constants";

const initialState = {
    token: null,
    user: {
        fullName: "",
        firstName: "",
        lastName: "",
        email: "",
    },
    authenticate: false,
    authenticating: false
}


export default (state = initialState, action) => {

    switch (action.type) {
        case authConstants.SIGNIN_REQUEST:
            state = {
                ...state,
                ...action.payload,
                authenticate: false,
                authenticating: true
            }
            break;
        case authConstants.SIGNIN_FILURE:
            state = {
                ...state,
                authenticate: false,
                authenticating: false
            }
            break;

        case authConstants.SIGNIN_SUCCESS:
            state = {
                ...state,
                user: {
                    firstName: action.payload.user.firstName,
                    lastName: action.payload.user.lastName,
                    fullName: action.payload.user.fullName,
                    email: action.payload.user.email,
                },
                token: action.payload.token,
                authenticate: true,
                authenticating: false
            }
            break;
        case authConstants.SIGNOUT_SUCCESS:
            state = {
                ...initialState
            }
            break;
    }


    return state
}