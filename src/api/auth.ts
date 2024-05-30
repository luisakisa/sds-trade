import axios from "axios";
import { DOMAIN } from "api/configs/path";

const API_URL = DOMAIN + "/auth/login";

export const signIn = async (login: string, password: string) => {
  console.log({ email: login, password: password })
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
