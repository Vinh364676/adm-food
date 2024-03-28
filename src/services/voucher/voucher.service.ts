
import { AxiosResponse } from "axios";
import { deleteAsync, getAsync, postAsync, putAsync } from "../http-client";

class VoucherService {
  get = async (params: any): Promise<AxiosResponse> => {
    return await getAsync('/Voucher/GetAll', {
      ...params,
      isPublish: true
    })
  }
  delete = async (id: any): Promise<AxiosResponse> => {
    return await deleteAsync(`/Voucher/Delete/${id}`);
  }
  post = async (data: any): Promise<AxiosResponse> => {
    return await postAsync('/Voucher/Create', data);
  }
  put = async (id: any, data: any): Promise<AxiosResponse> => {
    return await putAsync('/Voucher/Update', data); 
  }

  getById = async (id: any): Promise<AxiosResponse> => {
    return await getAsync(`/Voucher/GetById/${id}`)
  }
  deleteAll= async (data: number[] | string[]) => {
    return  await deleteAsync(`/Voucher/delete-multiple`, data);
  }
}

export default new VoucherService();
