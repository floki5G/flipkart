import axiosInstance from "../../api/api.axios";
import { authConstants } from "../constants";

export const createnewpage =  (newpage) => {
    return async (dispatch) => {
        const res = await axiosInstance.post("/api/admin/newpage", newpage)
        if (res.status == 200) {
            console.log(res.data)
            dispatch({
                type: authConstants.NEWPAGE_SUCCESS,
                payload: {
                    ...res.data
                }
            })
        }
        else {
            dispatch({
                type: authConstants.NEWPAGE_FILURE,
                payload: {
                    error: "error newpage"
                }
            })
        }
    }
}

export const getallnewpage =  () => {
    return async (dispatch) => {
        const res = await axiosInstance.post("/api/admin/getallnewpage")
        if (res.status == 200) {
            dispatch({
                type: authConstants.GETNEWPAGE_SUCCESS,
                payload: {
                    ...res.data
                }
            })
        }
        else {
            dispatch({
                type: authConstants.GETNEWPAGE_SUCCESS,
                payload: {
                    error: "error getallnewpage"
                }
            })
        }
    }
}

