import axios, {AxiosResponse} from "axios";
import {NewsArticle} from "@/types/NewsArticle";
import getConfig from "next/config";

const {serverRuntimeConfig} = getConfig();
const finnHubConfig = serverRuntimeConfig.finnHub;

export const getNews = async (
  symbol: string,
  fromDate: string,
  toDate: string
): Promise<NewsArticle[]> => {
  const {apiKey, apiEndpoint} = finnHubConfig;
  const url = `${apiEndpoint}company-news?symbol=${symbol}&from=${fromDate}&to=${toDate}&token=${apiKey}`;

  try {
    const response: AxiosResponse<NewsArticle[]> = await axios.get(url.toString());
    return response.data;
  } catch (e) {
    console.log(e);
    return [];
  }
};
