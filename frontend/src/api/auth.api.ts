import api from "./axios";
import type { LoginRequest, RegisterRequest } from "../types/auth.type";

export const loginApi = async (data: LoginRequest) => {
    const res = await api.post("/auth/login", data);
    return res.data;
};

export const registerApi = async (data: RegisterRequest) => {
    const res = await api.post("/auth/register", data);
    return res.data;
};