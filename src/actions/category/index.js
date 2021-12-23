import { authConstants } from "../constants";
import axiosInstance from "../../api/api.axios";

// gat all probuct 


export const getallcategory = () => {
    return async (dispatch) => {
        const res = await axiosInstance.post("api/admin/category/getallcatagory")
        if (res.status === 200) {
            const highlightres = await axiosInstance.post('/api/admin/highlight/getallhighlight')
            if (res.status === 200) {
            const specifications = await axiosInstance.post('/api/admin/specification/getallspecification')
                 
                dispatch({
                    type: authConstants.GETALLCATEGORY_SUCCESS,
                    payload: {
                        ...res.data,
                        ...highlightres.data,
                        ...specifications.data
                    }
                })
            }
        }
        else {
            dispatch({
                type: authConstants.GETALLCATEGORY_FILURE,
                payload: {
                    error: "error get all data"
                }
            })
        }

    }
}

// create product 

export const createcategory = (user) => {
    return async (dispatch) => {
        const res = await axiosInstance.post("api/admin/category/createcatagory", user)
        console.log(user)
        if (res.status == 200) {

            dispatch({
                type: authConstants.CATEGORY_SUCCESS,
                payload: {
                    category: user
                }
            })
        } else {
            dispatch({
                type: authConstants.CATEGORY_FILURE,
                payload: {
                    error: "error create category"
                }
            })

        }

    }
}

// delete category product 

export const deletecategory = (user) => {
    return async (dispatch) => {
        const res = await axiosInstance.post("api/admin/category/deleteCaterory", { _id: user })
        if (res.status == 200) {
            dispatch({
                type: authConstants.DELETECATEGORY_SUCCESS,
                payload: {
                    user
                }
            })
        } else {
            dispatch({
                type: authConstants.DELETECATEGORY_FILURE,
                payload: {
                    error: "error delete category"
                }
            })

        }
    }
}

// update category product 

export const updatecategory = (updatedata) => {
    console.log(updatedata)
    return async (dispatch) => {
        const res = await axiosInstance.post("api/admin/category/updateCaterory", updatedata)
        if (res.status == 200) {
            dispatch({
                type: authConstants.UPDATEPRODUCTS_SUCCESS,
                payload: {
                    ...res.data
                }
            })
        } else {
            dispatch({
                type: authConstants.UPDATEPRODUCTS_FILURE,
                payload: {
                    error: "error update category"
                }
            })
        }

    }
}

