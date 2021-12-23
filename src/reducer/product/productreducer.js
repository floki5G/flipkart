import { authConstants } from "../../actions/constants";

const initealcategory = {
    product: {
        id: "",
        name: "",
        price: "",
        desc: "",
        productimg: "",
        offers: "",
    },
    issuccess: false,
    isfailed: false
}


export const _createproduct = (state = initealcategory, action) => {
    
    switch (action.type) {
        case authConstants.PRODUCT_SUCCESS:
            state = {
                ...state,
                product: {
                    id: action.payload.message._id,
                    name: action.payload.message.name,
                    price: action.payload.message.price,
                    desc: action.payload.message.description,
                    productimg: action.payload.message.productPicture,
                    offers: action.payload.message.offers
                },
                issuccess: true,
                isfailed: false
            }
            break

        case authConstants.PRODUCT_FILURE:
            state = {
                ...state,
                isfailed: true,
                issuccess: false
            }
    }
    return state
}

const initealgetalldata = {
    isget: false,
    isfailed: false
}

export const _getallProduct = (state = initealgetalldata, action) => {
    switch (action.type) {
        case authConstants.GETALLPRODUCTS_SUCCESS:
            state = {
                ...state,
                ...action.payload,
                isget: true,
                isfailed: false
            }
            break

        case authConstants.GETALLPRODUCTS_FILURE:
            state = {
                ...state,
                ...action.payload,
                isget: false,
                isfailed: true
            }
            break;
    }
    return state

}