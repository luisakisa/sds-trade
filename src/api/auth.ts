import axios from "axios";

const API_URL = "http://localhost:3003/auth/signin";

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
