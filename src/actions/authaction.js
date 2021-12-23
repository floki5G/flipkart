import { authConstants } from "./constants"
import axiosInstance from "../api/api.axios"

export const signin = (user) => {

    return async (dispatch) => {
        const res = await axiosInstance.post(`/api/admin/adminsignin`, {
            ...user
        });
        if (res.status === 200){
            const { token, user } = res.data;
            localStorage.setItem("token", token);
            localStorage.setItem("user",JSON.stringify(user));
            dispatch({
                type: authConstants.SIGNIN_SUCCESS,
                payload: {
                    token, user
                }
            })
        } else {
            dispatch({
                type: authConstants.SIGNIN_FILURE,
                payload: { error:"error invalid login" }
            })
        }

    
    }
}

export const isadminsignin = (user) => {

    return  (dispatch) => {

      const token =  localStorage.getItem("token");
      const user =  localStorage.getItem("user");
      if (token){
            dispatch({
                type: authConstants.SIGNIN_SUCCESS,
                payload: {
                    token, user
                }
            })
        } else {
            dispatch({
                type: authConstants.SIGNIN_FILURE,
                payload: { error:"error invalid login" }
            })
        }

    
    }
}
export const adminsingout = (user) => {
    return  (dispatch) => {
        const token =  localStorage.getItem("token");
  
        if (token){
           localStorage.clear()
            dispatch({
                type: authConstants.SIGNOUT_SUCCESS,
                payload: {
                    signout:"signout succesfull" 
                }
            })
        }
    
    }
}