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
export const refreshToken = async (token: string) => {
  return fetch(URL + "/api/admin/refreshToken", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Authorization",
    },
  });
};

export const deleteVisitor = async (token: string, id: string) => {
  return fetch(URL + "/visitor/delete/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Authorization",
    },
  });
};
export const deleteExhibitor = async (token: string, id: string) => {
  return fetch(URL + "/exhibitor/delete/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Authorization",
    },
  });
};

export const ConformExhibitor = async (token: string, id: string) => {
  return fetch(URL + "/exhibitor/confirm/exhibitor/" + id, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Authorization",
    },
  });
};
export const disapproveExhibitor = async (token: string, id: string) => {
  return fetch(URL + "/exhibitor/disapprove/exhibitor/" + id, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "Authorization",
    },
  });
};
