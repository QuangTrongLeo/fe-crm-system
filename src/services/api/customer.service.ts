import axiosInstance from "../AxiosInstance";
import {
  type CreateCustomerReqFormData,
  type CustomerResponseFormData,
} from "@/schema/customer.schema";

export const create_new_customer = async (
  data: CreateCustomerReqFormData,
): Promise<CustomerResponseFormData> => {
  return await axiosInstance.post("/customers", data);
};

export const get_all_customer = async (): Promise<
  CustomerResponseFormData[]
> => {
  return await axiosInstance.get("/customers");
};

export const get_customer = async (
  id: string,
): Promise<CustomerResponseFormData> => {
  return await axiosInstance.get(`/customers/${id}`);
};

export const update_customer = async (
  id: string,
  data: CustomerResponseFormData,
): Promise<CustomerResponseFormData> => {
  return await axiosInstance.put(`/customers/${id}`, data);
};

export const search_customer = async (
  keyword: string,
): Promise<CustomerResponseFormData[]> => {
  return await axiosInstance.get(`/customers/search?keyword=${keyword}`);
};

export const delete_customer = async (id: string) => {
  return await axiosInstance.delete(`/customers/${id}`);
}