import api from "./axios";
import type { TaskQueryParams, CreateTaskPayload, UpdateTaskPayload } from "../types/task.types";

export const getTasksApi = async (params?: TaskQueryParams) => {
    const res = await api.get("/task/get-tasks", { params });
    return res.data;
};

export const addTaskApi = async (data: CreateTaskPayload) => {
    const res = await api.post("/task/add-task", data);
    return res.data;
};

export const editTaskApi = async (taskId: string, data: UpdateTaskPayload) => {
    const res = await api.put(`/task/edit-task/${taskId}`, data);
    return res.data;
};

export const deleteTaskApi = async (taskId: string) => {
    const res = await api.delete(`/task/delete-task/${taskId}`);
    return res.data;
};
