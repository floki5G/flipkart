import { authConstants } from "../../actions/constants"
import { createnewpage } from "../../actions/newpage"

const initealstate = {
    newpage: {
        id: "",
        title: "",
        description: "",
        banners: "",
        products: "",
        category: ""
    },
    issuccess: false,
    isfailed: false
}

export const _createnewpage = (state = initealstate, action) => {
    switch (action.type) {

        case authConstants.NEWPAGE_SUCCESS:
            state = {
                ...state,
                newpage: {
                    id: action.payload.message._id,
                    title: action.payload.message.title,
                    description: action.payload.message.description,
                    banners: action.payload.message.banners,
                    products: action.payload.message.products,
                    category: action.payload.message.category
                },
                issuccess: true,
                isfailed: false
            }
    }
    return state
}

export const _getallewpage = (state = initealstate, action) => {
    switch (action.type) {

        case authConstants.GETNEWPAGE_SUCCESS:
            state = {
                ...state,
                newpage: action.payload.message,
                issuccess: true,
                isfailed: false
            }
    }
    return state
}
