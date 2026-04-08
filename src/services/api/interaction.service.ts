import type { CreateInteractionReqFormData, InteractionResponseFormData } from "@/schema/interaction.schema";
import axiosInstance from "../AxiosInstance";

export const create_new_interaction = async (
  data: CreateInteractionReqFormData,
) => {
  return await axiosInstance.post("/interactions", data);
};

export const get_all_interactions = async () => {
  return await axiosInstance.get("/interactions/get-all");
};

export const get_interaction_by_id = async (id: string) => {
  return await axiosInstance.get(`/interactions/${id}`);
};

export const update_interaction = async (
  id: string,
  data: CreateInteractionReqFormData,
) => {
  return await axiosInstance.put(`/interactions/${id}`, data);
};

export const delete_interaction = async (id: string) => {
  return await axiosInstance.delete(`/interactions/${id}`);
};
export const get_interactions_by_customer = async (customerId: number) : Promise<InteractionResponseFormData[]> => {
  return await axiosInstance.get(`/interactions/customer/${customerId}`);
};
