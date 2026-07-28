export type TaskPriority = "Low" | "Medium" | "High";
export type TaskStatus = "Pending" | "In Progress" | "Completed";

export interface Task {
    _id: string;
    user?: string;
    title: string;
    description: string;
    priority: TaskPriority;
    status: TaskStatus;
    dueDate: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface TaskQueryParams {
    status?: string;
    priority?: string;
    sort?: string;
    page?: number;
    limit?: number;
}

export interface CreateTaskPayload {
    title: string;
    description: string;
    priority?: TaskPriority;
    status?: TaskStatus;
    dueDate: string;
}

export interface UpdateTaskPayload {
    title?: string;
    description?: string;
    priority?: TaskPriority;
    status?: TaskStatus;
    dueDate?: string;
}

export interface TaskListResponseData {
    tasks: Task[];
    totalTasks: number;
    currentPage: number;
    totalPages: number;
}