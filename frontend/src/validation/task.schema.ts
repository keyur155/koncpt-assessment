import { z } from "zod";

export const taskSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title cannot exceed 100 characters"),
    description: z
        .string()
        .min(20, "Description must be at least 20 characters")
        .max(1000, "Description cannot exceed 1000 characters"),
    priority: z.enum(["Low", "Medium", "High"]),
    status: z.enum(["Pending", "In Progress", "Completed"]),
    dueDate: z.string().min(1, "Due date is required").refine((val) => {
        const selected = new Date(val);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selected >= today;
    }, { message: "Due date cannot be in the past" }),
});

export type TaskFormData = z.infer<typeof taskSchema>;
