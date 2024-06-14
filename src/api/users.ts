import axios from "axios";
import { DOMAIN, getHeaders } from "api/configs/path";

const API_URL = DOMAIN + "/users";

export const getUsers = async () => {
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

export const getUser = async (userId: number,role: string) => {
  try {
    const response = await axios.get(API_URL + `${userId}/roles/${role}`, {
      headers: getHeaders(),
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Ошибка");
  }
};

export const updateUser = async (
  id: number,
  userData: SupplierFullData | SupplySpecialistFullData | undefined
) => {
  try {
    const response = await axios.put(API_URL + id, userData, {
      headers: getHeaders(),
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Ошибка");
  }
};

export const deleteUser = async (userId: number, roleName: string) => {
  try {
    const response = await axios.delete(API_URL + `/users/${userId}/roles/${roleName}`,{
      headers: getHeaders(),
    }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error("Ошибка");
  }
};
