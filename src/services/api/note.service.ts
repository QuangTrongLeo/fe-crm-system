import type {
  CreateNoteReqFormData,
  NoteResponseFormData,
} from "@/schema/note.schema";
import axiosInstance from "../AxiosInstance";

export const get_all_notes = async () => {
  return await axiosInstance.get("/notes/get-all");
};

export const create_new_note = async (data: CreateNoteReqFormData) => {
  return await axiosInstance.post("/notes", data);
};

export const get_note_by_id = async (id: string) => {
  return await axiosInstance.get(`/notes/${id}`);
};

export const update_note = async (id: string, data: CreateNoteReqFormData) => {
  return await axiosInstance.put(`/notes/${id}`, data);
};

export const delete_note = async (id: string) => {
  return await axiosInstance.delete(`/notes/${id}`);
};
export const get_notes_by_customer = async (
  customerId: number,
): Promise<NoteResponseFormData[]> => {
  return await axiosInstance.get(`/notes/customer/${customerId}`);
};
