import store from "store";

export const DOMAIN = "http://localhost:8080/proj-1/api/v1";

export const getHeaders = () => ({
  "Content-Type": "application/json",
  Token: store.getState().auth.token,
  Role: store.getState().auth.role,
});
