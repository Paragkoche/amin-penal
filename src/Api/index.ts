import axios from "axios";
const URL = "https://api.boilerworldexpo.com/api";
export const Login = async (data: { email: string; password: string }) => {
  return axios.post(URL + "/api/admin/login", data);
};
export const getAllVisitor = async (token: string) => {
  return fetch(URL + "/visitor?query=.com&limit=50000", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Authorization",
    },
  });
};
export const getAllExhibitor = async (token: string) => {
  return fetch(URL + "/exhibitor?limit=50000", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Authorization",
    },
  });
};
