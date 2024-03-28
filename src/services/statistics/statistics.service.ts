
import { AxiosResponse } from "axios";
import { deleteAsync, getAsync, postAsync, putAsync } from "../http-client";

class StatisticsService {
  get = async (params: any): Promise<AxiosResponse> => {
    return await getAsync('/Statistics/GetTopSellingProducts', {
      ...params,
      isPublish: true
    })
  }
 
}

export default new StatisticsService();