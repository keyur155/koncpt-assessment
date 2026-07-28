import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    Plus,
    Search,
    LogOut,
    CheckSquare,
    Flame,
    User as UserIcon,
    RefreshCw,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import DashboardHeader from '../../components/dashboard/DashboardHeader';
import { useAuth } from "../../context/AuthContext";
import { getTasksApi, addTaskApi, editTaskApi, deleteTaskApi } from "../../api/task.api";
import type { Task, TaskStatus } from "../../types/task.types";
import type { TaskFormData } from "../../validation/task.schema";

import TaskStatsCards from "../../components/task/TaskStatsCards";
import TaskCard from "../../components/task/TaskCard";
import TaskModal from "../../components/task/TaskModal";
import TaskViewModal from "../../components/task/TaskViewModal";
import DeleteConfirmModal from "../../components/task/DeleteConfirmModal";

export default function Dashboard() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();

    // task state and pagination
    const [tasks, setTasks] = useState<Task[]>([]);
    const [totalTasks, setTotalTasks] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Filters and Controls state
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [statusFilter, setStatusFilter] = useState<string>("");
    const [priorityFilter, setPriorityFilter] = useState<string>("");
    const [sortBy, setSortBy] = useState<string>("-createdAt");

    // Modal States
    const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
    const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
    const [taskToView, setTaskToView] = useState<Task | null>(null);
    const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Fetch Tasks data
    const fetchTasks = useCallback(async () => {
        setIsLoading(true);
        try {
            const params: any = {
                page: currentPage,
                limit: 9,
                sort: sortBy,
            };
            if (statusFilter) params.status = statusFilter;
            if (priorityFilter) params.priority = priorityFilter;

            const response = await getTasksApi(params);

            if (response.success || response.statusCode === 200) {
                const data = response.data;
                if (Array.isArray(data)) {
                    setTasks(data);
                    setTotalTasks(data.length);
                    setTotalPages(1);
                } else if (data && typeof data === "object") {
                    setTasks(data.tasks || []);
                    setTotalTasks(data.totalTasks || 0);
                    setTotalPages(data.totalPages || 1);
                }
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to load tasks");
        } finally {
            setIsLoading(false);
        }
    }, [currentPage, statusFilter, priorityFilter, sortBy]);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleFormSubmit = async (formData: TaskFormData) => {
        setIsSubmitting(true);
        try {
            if (taskToEdit) {
                const response = await editTaskApi(taskToEdit._id, formData);
                if (response.success || response.statusCode === 200) {
                    toast.success("Task updated successfully!");
                    setTaskToEdit(null);
                    fetchTasks();
                } else {
                    toast.error(response.message || "Failed to update task");
                }
            } else {
                const response = await addTaskApi(formData);
                if (response.success || response.statusCode === 201) {
                    toast.success("New task created successfully!");
                    setIsCreateModalOpen(false);
                    fetchTasks();
                } else {
                    toast.error(response.message || "Failed to create task");
                }
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Error processing request");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleQuickStatusChange = async (task: Task, newStatus: TaskStatus) => {
        try {
            const updatedPayload = {
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: newStatus,
                dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : new Date().toISOString().split("T")[0],
            };
            const response = await editTaskApi(task._id, updatedPayload);
            if (response.success || response.statusCode === 200) {
                toast.success(`Status updated to ${newStatus}`);
                fetchTasks();
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to update status");
        }
    };

    const handleDeleteTask = async () => {
        if (!taskToDelete) return;
        setIsSubmitting(true);
        try {
            const response = await deleteTaskApi(taskToDelete._id);
            if (response.success || response.statusCode === 200) {
                toast.success("Task deleted successfully");
                setTaskToDelete(null);
                fetchTasks();
            } else {
                toast.error(response.message || "Failed to delete task");
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Error deleting task");
        } finally {
            setIsSubmitting(false);
        }
    };

    const filteredTasks = tasks.filter((task) => {
        if (!searchQuery.trim()) return true;
        const q = searchQuery.toLowerCase();
        return (
            task.title.toLowerCase().includes(q) ||
            task.description.toLowerCase().includes(q)
        );
    });

    const handleLogout = () => {
        logout();
        toast.success("Logged out successfully");
        navigate("/login");
    };

    return (
        <div className="min-h-screen bg-[#efd5ff] text-white p-4 sm:p-6 lg:p-8 relative overflow-y-hidden">
            {/* Ambient Warm Glow */}
            <div className="fixed top-0 left-1/3 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none" />
            <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
               
                <DashboardHeader
                    user={user}
                    onLogout={handleLogout}
                />

                {/* Task Stats Section */}
                <TaskStatsCards tasks={tasks} totalTasksCount={totalTasks} />

                {/* Controls Bar */}
                <div className="glass-panel rounded-2xl p-4 mb-6 border border-orange-500/20 flex flex-col lg:flex-row items-center justify-between gap-4">
                    {/* Search input */}
                    <div className="relative w-full lg:w-80">
                        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-orange-400/60" />
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-xl glass-input text-xs text-white placeholder-orange-300/40 focus:outline-none"
                        />
                    </div>

                    {/* Filters & Sorting */}
                    <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-start lg:justify-end">
                        <div className="relative flex-1 sm:flex-initial">
                            <select
                                value={statusFilter}
                                onChange={(e) => {
                                    setStatusFilter(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full pl-3 pr-8 py-2 rounded-xl glass-input text-xs text-white cursor-pointer focus:outline-none"
                            >
                                <option value="" className="bg-amber-950 text-orange-200">All Statuses</option>
                                <option value="Pending" className="bg-amber-950 text-amber-400">Pending</option>
                                <option value="In Progress" className="bg-amber-950 text-orange-400">In Progress</option>
                                <option value="Completed" className="bg-amber-950 text-emerald-400">Completed</option>
                            </select>
                        </div>

                        <div className="relative flex-1 sm:flex-initial">
                            <select
                                value={priorityFilter}
                                onChange={(e) => {
                                    setPriorityFilter(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full pl-3 pr-8 py-2 rounded-xl glass-input text-xs text-white cursor-pointer focus:outline-none"
                            >
                                <option value="" className="bg-amber-950 text-orange-200">All Priorities</option>
                                <option value="Low" className="bg-amber-950 text-emerald-400">Low Priority</option>
                                <option value="Medium" className="bg-amber-950 text-amber-400">Medium Priority</option>
                                <option value="High" className="bg-amber-950 text-rose-400">High Priority</option>
                            </select>
                        </div>

                        <div className="relative flex-1 sm:flex-initial">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full pl-3 pr-8 py-2 rounded-xl glass-input text-xs text-white cursor-pointer focus:outline-none"
                            >
                                <option value="-createdAt" className="bg-amber-950 text-orange-200">Newest First</option>
                                <option value="createdAt" className="bg-amber-950 text-orange-200">Oldest First</option>
                                <option value="dueDate" className="bg-amber-950 text-orange-200">Due Date (Earliest)</option>
                                <option value="-dueDate" className="bg-amber-950 text-orange-200">Due Date (Latest)</option>
                            </select>
                        </div>

                        <button
                            onClick={fetchTasks}
                            className="p-2 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-300 transition-colors border border-orange-500/20 cursor-pointer"
                            title="Refresh Tasks"
                        >
                            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>

                    {/* Add New Task Button */}
                    <button
                        onClick={() => {
                            setTaskToEdit(null);
                            setIsCreateModalOpen(true);
                        }}
                        className="w-full lg:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-600 hover:via-amber-600 hover:to-yellow-600 text-slate-950 font-bold text-xs shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                    >
                        <Plus className="w-4 h-4 stroke-[3]" />
                        <span>Create New Task</span>
                    </button>
                </div>

                {/* Task Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                            <div key={n} className="glass-panel rounded-2xl p-6 h-48 animate-pulse flex flex-col justify-between border border-orange-500/10">
                                <div className="space-y-3">
                                    <div className="h-4 bg-orange-500/20 rounded w-1/3" />
                                    <div className="h-6 bg-orange-500/20 rounded w-3/4" />
                                    <div className="h-4 bg-orange-500/20 rounded w-full" />
                                </div>
                                <div className="h-4 bg-orange-500/20 rounded w-1/2" />
                            </div>
                        ))}
                    </div>
                ) : filteredTasks.length === 0 ? (
                    <div className="glass-panel rounded-3xl p-12 text-center my-8 border border-orange-500/20">
                        <div className="w-16 h-16 rounded-2xl bg-orange-500/15 border border-orange-500/30 text-orange-400 flex items-center justify-center mx-auto mb-4">
                            <CheckSquare className="w-8 h-8" />
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No Tasks Found</h3>
                        <p className="text-orange-200/60 text-sm max-w-md mx-auto mb-6">
                            {searchQuery || statusFilter || priorityFilter
                                ? "No tasks matched your search or filter criteria. Try resetting filters."
                                : "You haven't created any tasks yet. Click the button below to add your first task!"}
                        </p>
                        <button
                            onClick={() => {
                                setTaskToEdit(null);
                                setIsCreateModalOpen(true);
                            }}
                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 font-bold text-xs shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
                        >
                            <Plus className="w-4 h-4 stroke-[3]" /> Add Task Now
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
                        {filteredTasks.map((task) => (
                            <TaskCard
                                key={task._id}
                                task={task}
                                onView={(t) => setTaskToView(t)}
                                onEdit={(t) => setTaskToEdit(t)}
                                onDelete={(t) => setTaskToDelete(t)}
                                onStatusChange={handleQuickStatusChange}
                            />
                        ))}
                    </div>
                )}

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="glass-panel rounded-2xl p-4 border border-orange-500/20 flex items-center justify-between">
                        <span className="text-xs text-orange-200/70">
                            Page <strong className="text-white">{currentPage}</strong> of <strong className="text-white">{totalPages}</strong>
                        </span>

                        <div className="flex items-center gap-2">
                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                className="p-2 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-200 disabled:opacity-30 disabled:pointer-events-none transition-colors border border-orange-500/20 cursor-pointer"
                            >
                                <ChevronLeft className="w-4 h-4" />
                            </button>

                            <span className="text-xs px-3 font-bold text-orange-400">
                                {currentPage}
                            </span>

                            <button
                                disabled={currentPage >= totalPages}
                                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                className="p-2 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 text-orange-200 disabled:opacity-30 disabled:pointer-events-none transition-colors border border-orange-500/20 cursor-pointer"
                            >
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Create & Edit Modal */}
            <TaskModal
                isOpen={isCreateModalOpen || !!taskToEdit}
                onClose={() => {
                    setIsCreateModalOpen(false);
                    setTaskToEdit(null);
                }}
                onSubmit={handleFormSubmit}
                taskToEdit={taskToEdit}
                isLoading={isSubmitting}
            />

            {/* Task View Modal */}
            <TaskViewModal
                task={taskToView}
                onClose={() => setTaskToView(null)}
                onEdit={(t) => setTaskToEdit(t)}
                onDelete={(t) => setTaskToDelete(t)}
            />

            {/* Delete Confirmation Modal */}
            <DeleteConfirmModal
                task={taskToDelete}
                onClose={() => setTaskToDelete(null)}
                onConfirm={handleDeleteTask}
                isLoading={isSubmitting}
            />
        </div>
    );
}