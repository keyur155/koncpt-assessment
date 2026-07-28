
export interface GetTasksParams {
    page: number;
    limit: number;
    sort: string;
    status?: string;
    priority?: string;
}