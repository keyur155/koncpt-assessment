import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Calendar, Type, AlignLeft, Flag, CheckCircle } from "lucide-react";

import { taskSchema, type TaskFormData } from "../../validation/task.schema";
import type { Task } from "../../types/task.types";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: TaskFormData) => Promise<void>;
    taskToEdit?: Task | null;
    isLoading?: boolean;
}

export default function TaskModal({ isOpen, onClose, onSubmit, taskToEdit, isLoading }: Props) {
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: "",
            description: "",
            priority: "Medium",
            status: "Pending",
            dueDate: new Date().toISOString().split("T")[0],
        },
    });

    const descriptionValue = watch("description") || "";

    useEffect(() => {
        if (taskToEdit) {
            const formattedDate = taskToEdit.dueDate
                ? new Date(taskToEdit.dueDate).toISOString().split("T")[0]
                : new Date().toISOString().split("T")[0];

            reset({
                title: taskToEdit.title,
                description: taskToEdit.description,
                priority: taskToEdit.priority,
                status: taskToEdit.status,
                dueDate: formattedDate,
            });
        } else {
            reset({
                title: "",
                description: "",
                priority: "Medium",
                status: "Pending",
                dueDate: new Date().toISOString().split("T")[0],
            });
        }
    }, [taskToEdit, isOpen, reset]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#efd5ff]/20 backdrop-blur-md animate-fade-in">
            <div className="glass-panel w-full max-w-xl rounded-3xl p-6 sm:p-8 border border-orange-500/30 shadow-2xl relative max-h-[90vh] overflow-y-auto">
               
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-xl text-orange-200/60 hover:text-white hover:bg-orange-500/20 transition-colors cursor-pointer"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Header */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white tracking-tight">
                        {taskToEdit ? "Edit Task" : "Create New Task"}
                    </h2>
                    <p className="text-orange-200/70 text-sm mt-1">
                        {taskToEdit
                            ? "Update the details of your existing task below."
                            : "Fill out the fields to add a new task to your dashboard."}
                    </p>
                </div>

                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                   
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-orange-200/80 mb-2">
                            Task Title
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-orange-400/60">
                                <Type className="w-5 h-5" />
                            </div>
                            <input
                                type="text"
                                placeholder="e.g. Design Landing Page Wireframes"
                                {...register("title")}
                                className={`w-full pl-11 pr-4 py-3 rounded-xl glass-input text-sm text-white placeholder-orange-300/40 focus:outline-none ${
                                    errors.title ? "border-rose-500" : ""
                                }`}
                            />
                        </div>
                        {errors.title && (
                            <p className="text-rose-400 text-xs mt-1.5 font-medium">{errors.title.message}</p>
                        )}
                    </div>

                    
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-orange-200/80">
                                Description
                            </label>
                            <span
                                className={`text-xs ${
                                    descriptionValue.length < 20 ? "text-amber-400" : "text-emerald-400"
                                } font-mono`}
                            >
                                {descriptionValue.length} / 20 chars min
                            </span>
                        </div>
                        <div className="relative">
                            <div className="absolute top-3.5 left-3.5 pointer-events-none text-orange-400/60">
                                <AlignLeft className="w-5 h-5" />
                            </div>
                            <textarea
                                rows={4}
                                placeholder="Describe the task specifications in detail (min 20 characters required)..."
                                {...register("description")}
                                className={`w-full pl-11 pr-4 py-3 rounded-xl glass-input text-sm text-white placeholder-orange-300/40 focus:outline-none ${
                                    errors.description ? "border-rose-500" : ""
                                }`}
                            />
                        </div>
                        {errors.description && (
                            <p className="text-rose-400 text-xs mt-1.5 font-medium">{errors.description.message}</p>
                        )}
                    </div>

                   
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-orange-200/80 mb-2">
                                Priority
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-orange-400/60">
                                    <Flag className="w-4 h-4" />
                                </div>
                                <select
                                    {...register("priority")}
                                    className="w-full pl-9 pr-3 py-2.5 rounded-xl glass-input text-sm text-white cursor-pointer focus:outline-none"
                                >
                                    <option value="Low" className="bg-amber-950 text-emerald-400">Low</option>
                                    <option value="Medium" className="bg-amber-950 text-amber-400">Medium</option>
                                    <option value="High" className="bg-amber-950 text-rose-400">High</option>
                                </select>
                            </div>
                        </div>

                      
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-orange-200/80 mb-2">
                                Status
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-orange-400/60">
                                    <CheckCircle className="w-4 h-4" />
                                </div>
                                <select
                                    {...register("status")}
                                    className="w-full pl-9 pr-3 py-2.5 rounded-xl glass-input text-sm text-white cursor-pointer focus:outline-none"
                                >
                                    <option value="Pending" className="bg-amber-950 text-amber-400">Pending</option>
                                    <option value="In Progress" className="bg-amber-950 text-orange-400">In Progress</option>
                                    <option value="Completed" className="bg-amber-950 text-emerald-400">Completed</option>
                                </select>
                            </div>
                        </div>

                        {/* Due Date */}
                        <div onClick={(e) => {
      // Finds the input inside this wrapper and triggers the picker
                                const input = e.currentTarget.querySelector('input[type="date"]');
                                if (input) input.showPicker();
                                }}>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-orange-200/80 mb-2">
                                Due Date
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-orange-400/60">
                                    <Calendar className="w-4 h-4" />
                                </div>
                                <input
                                
                                    type="date"
                                    {...register("dueDate")}
                                    className={`w-full pl-9 pr-3 py-2.5 rounded-xl glass-input text-sm text-white focus:outline-none ${
                                        errors.dueDate ? "border-rose-500" : ""
                                    }`}
                                />
                            </div>
                            {errors.dueDate && (
                                <p className="text-rose-400 text-[10px] mt-1 font-medium">{errors.dueDate.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex items-center justify-end gap-3 pt-6 border-t border-orange-500/15 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5 rounded-xl text-orange-200/80 hover:text-white hover:bg-orange-500/15 text-sm font-medium transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 text-slate-950 text-sm font-bold shadow-lg shadow-orange-500/25 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                        >
                            {isLoading ? (
                                <div className="w-4 h-4 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                            ) : taskToEdit ? (
                                "Update Task"
                            ) : (
                                "Save Task"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
