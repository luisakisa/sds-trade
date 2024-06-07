import axios from "axios";
import { DOMAIN, getHeaders } from "api/configs/path";

const API_URL = DOMAIN + "/typesOfBusiness";

export const getTypesOfBusiness = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: getHeaders(),
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Ошибка");
  }
};