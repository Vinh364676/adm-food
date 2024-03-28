
import { AxiosResponse } from "axios";
import { deleteAsync, getAsync, postAsync, putAsync } from "../http-client";

class UserService {
  get = async (params: any): Promise<AxiosResponse> => {
    return await getAsync('/Account/GetAll', {
      ...params,
      isPublish: true
    })
  }
  putLocked = async (id: any, data: any): Promise<AxiosResponse> => {
    return await putAsync('Account/UnlockAccount', data); 
  }
  put = async (id: any, data: any): Promise<AxiosResponse> => {
    return await putAsync('Account/Update', data); 
  }
}

export default new UserService();
