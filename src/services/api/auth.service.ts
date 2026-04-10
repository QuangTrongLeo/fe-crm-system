import axiosInstance from "../AxiosInstance";
import type { LoginReqFormData, LoginResFormData } from "../../schema/login";
import type { RegisterRequestFormData } from "@/schema/register.schema";

export const login = async (
  data: LoginReqFormData,
): Promise<LoginResFormData> => {
  return await axiosInstance.post("/auth/login", data);
};

export const register = async (
  data: RegisterRequestFormData,
): Promise<boolean> => {
  return await axiosInstance.post("/auth/register", data);
};

export const logout = async (): Promise<void> => {
  return await axiosInstance.post("/auth/logout");
};

export const checkEmail = async (email: string): Promise<boolean> => {
  return await axiosInstance.post(`/users/check-email`, { email });
};