
import { AxiosResponse } from "axios";
import { deleteAsync, getAsync, postAsync, putAsync } from "../http-client";

class BrandService {
  get = async (params: any): Promise<AxiosResponse> => {
    return await getAsync('/Brand/GetAll', {
      ...params,
      isPublish: true
    })
  }
  delete = async (id: any): Promise<AxiosResponse> => {
    return await deleteAsync(`/Brand/Delete/${id}`);
  }
  post = async (data: any): Promise<AxiosResponse> => {
    return await postAsync('/Brand/Create', data);
  }
  put = async (id: any, data: any): Promise<AxiosResponse> => {
    return await putAsync('/Brand/Update', data); 
  }

  getById = async (id: any): Promise<AxiosResponse> => {
    return await getAsync(`/Brand/GetById/${id}`)
  }
  deleteAll= async (data: number[] | string[]) => {
    return  await deleteAsync(`/Brand/delete-multiple`, data);
  }
}

export default new BrandService();
