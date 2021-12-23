import { authConstants } from "../../actions/constants";
const initialcategory = {
    highlight: [],
    categories: [],
    issucces: false,
    isfailes: false,
}

const rendercategoryliat = (parentId, categories, category) => {
    const _categories = []
    if (parentId == undefined) {
        return [
            ...categories,
            {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                pagetype: category.pagetype,
                children: [],
            }
        ]
    }
    for (let cat of categories) {
        if (cat._id == parentId) {
            const newCategory = {
                _id: category._id,
                name: category.name,
                slug: category.slug,
                parentId: category.parentId,
                pagetype: category.pagetype,
                children: [],
                highlight: []
            }

            _categories.push({
                ...cat,
                children: cat.children.length > 0 ? [...cat.children, newCategory] : [newCategory]
            })
        } else {
            _categories.push({
                ...cat,
                children: cat.children ? rendercategoryliat(parentId, cat.children, category) : []
            });
        }
    }

    return _categories
}
export const _createcategory = (state = initialcategory, action) => {
    switch (action.type) {
        case authConstants.GETALLCATEGORY_SUCCESS:
            state = {
                ...state,
                specificaton: action.payload._specificationlist,
                highlight: action.payload.getall,
                categories: action.payload._categorylist,
                issucces: true,
                isfailes: false,
            }
            break
        case authConstants.CATEGORY_SUCCESS:
            const category = action.payload.category;
            const updaternder = rendercategoryliat(category.parentId, state.categories, category)
            state = {
                ...state,
                issucces: true,
                isfailes: false,
                categories: updaternder
            }
            break
        case authConstants.DELETECATEGORY_SUCCESS:

            state = {
                ...state,
                issucces: true,
                isfailes: false,
            }
            break
        case authConstants.UPDATEPRODUCTS_SUCCESS:

            state = {
                ...state,
                issucces: true,
                isfailes: false,
            }
            break

        case authConstants.GATALLHIGHLIGHT_SUCCESS:
            state = {
                ...state,

                issucces: true,
                isfailes: false,
            }
            break
    }
    return state
}