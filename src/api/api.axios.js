import axios from "axios";
import { apiurl } from "./api.url";

const authToken =  localStorage.getItem("token");

const axiosInstance = axios.create({
    baseURL: apiurl.URL,
    headers: {
        Authorization:`Bearer ${authToken}`
      }
})

export default axiosInstance

export const createCategoryList = (category, _options = []) => {
  for (let _category of category) {
      _options.push({
          value: _category._id,
          name: _category.name,
          parentId: _category.parentId,
      });
      if (_category.children.length > 0) {
          createCategoryList(_category.children, _options)
      }
  }
return _options
}
