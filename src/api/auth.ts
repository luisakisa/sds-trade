import axios from "axios";
import { DOMAIN } from "configs/path";

const API_URL = DOMAIN + "/auth/signin";

export const signIn = async (login: string, password: string) => {
  try {
    const response = await axios.post(
      API_URL,
      { email: login, password: password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Ошибка авторизации");
  }
};
