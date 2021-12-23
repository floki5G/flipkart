import { authConstants } from "./constants";

import axiosInstance from "../api/api.axios";
import { compose } from "redux";

export const authactionsignin = (signupdata) => {
    return async (dispatch) => {
        const res = await axiosInstance.post('/api/admin/adminsignup', { ...signupdata })


        if (res.status == 200) {
            dispatch({
                type: authConstants.SIGNUP_SUCCESS,
                payload: {
                    payload: { signupsucces: "your account was succesfully created" }
                }
            })
        }
        else {

            dispatch({
                type: authConstants.SIGNUP_FILURE,
                payload: {
                    payload: { signupsucces: "your account was succesfully created" }
                }
            })

        }
    }

}
