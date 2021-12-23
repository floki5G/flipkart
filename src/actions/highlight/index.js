// import { authConstants } from "../constants";
// import axiosInstance from "../../api/api.axios";

// export const getallhighlight = () => {
//     return async (dispatch) => {
//         const res = await axiosInstance.post('/api/admin/highlight/getallhighlight')
//         if (res.status === 200) {
//             dispatch({
//                 type: authConstants.GATALLHIGHLIGHT_SUCCESS,
//                 payload: {
//                     ...res.data
//                 }
//             })
//         } else {
//             dispatch({
//                 type: authConstants.GATALLHIGHLIGHT_FILURE,
//                 payload: {
//                     error: "something went wrong in getallHighlight"
//                 }
//             })
//         }
//     }
// }