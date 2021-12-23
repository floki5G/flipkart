import { authConstants } from "../constants";
import axiosInstance from "../../api/api.axios";


export const createProduct = (product) => {

    return async (dispatch) => {
        let res = await axiosInstance.post('/api/admin/product/createproduct', product)

        if (res.status == 200) {
            dispatch({
                type: authConstants.PRODUCT_SUCCESS,
                payload: {
                    ...res.data
                }
            })
        }
        else {
            dispatch({
                type: authConstants.PRODUCT_FILURE,
                payload: {
                    error: "no data found in admin create product data"
                }
            })
        }
    }

}
export const getallProduct = (product) => {

    return async (dispatch) => {
        let res = await axiosInstance.post('/api/admin/product/getallproduct')

        if (res.status == 200) {
            dispatch({
                type: authConstants.GETALLPRODUCTS_SUCCESS,
                payload: {
                    ...res.data
                }
            })
        }
        else {
            dispatch({
                type: authConstants.GETALLPRODUCTS_FILURE,
                payload: {
                    message: "no data found in admin get all data"
                }
            })
        }
    }

}

export const updateproduct = (product) => {
    console.log(product)

    return async (dispatch) => {
        const res = await axiosInstance.post('/api/admin/product/updateproduct', product)
        console.log(res.data)

        if (res.status == 200) {
            dispatch({
                type: authConstants.UPDATEPRODUCTS_SUCCESS,
                payload: {
                    ...res.data
                }
            })
        }
        else {
            dispatch({
                type: authConstants.UPDATEPRODUCTS_FILURE,
                payload: {
                    message: "no data found in admin UPDATE PRODUCT"
                }
            })
        }
    }

}