import axios from "axios";

const API_URL = "http://localhost:3003/auth/signup";

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
  

export const signUp = async (userData: UserData) => {
  try {
    const response = await axios.post(API_URL, userData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Ошибка регистрации");
  }
};