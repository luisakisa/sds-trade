import axios from "axios";
import { DOMAIN, getHeaders } from "api/configs/path";
import { Group } from "interfaces/groups";

const API_URL = DOMAIN + "/groups";

export const getGroups = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: getHeaders(),
    });
    console.log(response.data);
    return response.data as Group[];
  } catch (error) {
    throw new Error("Ошибка");
    1;
  }
};

export const createGroup = async (group: Group) => {
  try {
    const response = await axios.post(API_URL, group, {
      headers: getHeaders(),
    });
    console.log(response.data);
    return response.status === 200 ? response.data : null;
  } catch (error) {
    throw new Error("Ошибка");
    1;
  }
};

export const updateGroup = async (group: Group) => {
  try {
    const response = await axios.put(API_URL, group, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.status === 200 ? response.data : null;
  } catch (error) {
    throw new Error("Ошибка");
    1;
  }
};

export const deleteGroup = async (id: number) => {
  try {
    const response = await axios.delete(API_URL+id, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);
    return response.status === 200 ? response.data : null;
  } catch (error) {
    throw new Error("Ошибка");
    1;
  }
};
