import authreducer from "./authreducer"
import { combineReducers } from "redux"
import { _createproduct, _getallProduct } from "./product/productreducer"
import { _createcategory } from "./category/categoryreducer"
import { _createnewpage ,_getallewpage} from "./newpage"
const rootReducer = combineReducers({
    auth: authreducer,
    createcategory: _createcategory,
    createproduct: _createproduct,
    getallproducts: _getallProduct,
    createnewpage:_createnewpage,
    getallnewpage:_getallewpage

})

export default rootReducer