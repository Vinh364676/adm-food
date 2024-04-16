
import { AxiosResponse } from "axios";
import { deleteAsync, getAsync, postAsync, putAsync } from "../http-client";

class CategoryService {
  get = async (params: any): Promise<AxiosResponse> => {
    return await getAsync('/categories/api/get/all', {
      ...params,
    })
  }
  delete = async (id: any): Promise<AxiosResponse> => {
    return await deleteAsync(`/categories/api/delete/${id}`);
  }
  post = async (data: any): Promise<AxiosResponse> => {
    return await postAsync('/Category/Create', data);
  }
  put = async (id: any, data: any): Promise<AxiosResponse> => {
    return await putAsync('Category/Update', data); 
  }

  getById = async (id: any): Promise<AxiosResponse> => {
    return await getAsync(`/Category/GetById/${id}`)
  }

}

export default new CategoryService();
