import axiosInstance from "./AxiosInstance";
import type { LoginReqFormData, LoginResFormData } from "../schema/login";

export const login = async (data: LoginReqFormData): Promise<LoginResFormData> => {
    const response = await axiosInstance.post('/auth/login', data);
    return response.data.data;
}