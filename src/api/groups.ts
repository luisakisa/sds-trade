import axios from "axios";
import { Group } from "interfaces/groups";

const API_URL = "http://localhost:3003/groups";

export const getGroups = async () => {
  try {
    const response = await axios.get(API_URL);
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
