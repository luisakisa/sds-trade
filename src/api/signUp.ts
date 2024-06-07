import axios from "axios";
import { DOMAIN, getHeaders } from "api/configs/path";

const API_URL = DOMAIN + "/auth/reg";

interface UserData {
    firstName?: string;
    lastName?: string;
    middleName?: string;
    typeOfBusiness: string;
    company: string;
    email: string;
    password: string;
    role: string;
    additionalData: {
      phone?: string;
      address?: string;
      nds: boolean;
      inn?: string;
      kpp?: string;
      website?: string;
    };
  }
  

export const signUp = async (userData: any) => {
  try {
    const response = await axios.post(API_URL, userData, {
      headers: getHeaders(),
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Ошибка регистрации");
  }
};