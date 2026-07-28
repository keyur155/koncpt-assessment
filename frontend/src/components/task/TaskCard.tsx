import { Calendar, Eye, Edit3, Trash2, Clock, CheckCircle2, Flame } from "lucide-react";
import type { Task, TaskStatus } from "../../types/task.types";

interface Props {
    task: Task;
    onView: (task: Task) => void;
    onEdit: (task: Task) => void;
    onDelete: (task: Task) => void;
    onStatusChange: (task: Task, newStatus: TaskStatus) => void;
}

export default function TaskCard({ task, onView, onEdit, onDelete, onStatusChange }: Props) {
    const isOverdue =
        task.status !== "Completed" &&
        new Date(task.dueDate).getTime() < new Date().setHours(0, 0, 0, 0);

    const formattedDate = new Date(task.dueDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    const getPriorityBadge = (priority: string) => {
        switch (priority) {
            case "High":
                return "bg-rose-500/20 text-rose-300 border-rose-500/40";
            case "Medium":
                return "bg-amber-500/20 text-amber-300 border-amber-500/40";
            case "Low":
                return "bg-emerald-500/20 text-emerald-300 border-emerald-500/40";
            default:
                return "bg-gray-500/20 text-gray-300 border-gray-500/40";
        }
    };

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Completed":
                return {
                    icon: <CheckCircle2 className="w-3.5 h-3.5" />,
                    style: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
                };
            case "In Progress":
                return {
                    icon: <Flame className="w-3.5 h-3.5" />,
                    style: "bg-orange-500/20 text-orange-300 border-orange-500/40",
                };
            default:
                return {
                    icon: <Clock className="w-3.5 h-3.5" />,
                    style: "bg-amber-500/20 text-amber-300 border-amber-500/40",
                };
        }
    };

    const statusBadge = getStatusBadge(task.status);

    return (
        <div className="glass-panel glass-panel-hover rounded-2xl p-6 border border-orange-500/20 flex flex-col justify-between relative group transition-all duration-300">
            <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <select
                                value={task.status}
                                onChange={(e) => onStatusChange(task, e.target.value as TaskStatus)}
                                className={`appearance-none text-xs font-semibold px-3 py-1 pr-7 rounded-full border cursor-pointer focus:outline-none transition-all ${statusBadge.style}`}
                            >
                                <option value="Pending" className="bg-amber-950 text-amber-400">Pending</option>
                                <option value="In Progress" className="bg-amber-950 text-orange-400">In Progress</option>
                                <option value="Completed" className="bg-amber-950 text-emerald-400">Completed</option>
                            </select>
                            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-70">
                                ▾
                            </span>
                        </div>

                        
                        <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${getPriorityBadge(
                                task.priority
                            )}`}
                        >
                            {task.priority} Priority
                        </span>
                    </div>

                  
                    <button
                        onClick={() => onView(task)}
                        className="p-1.5 rounded-lg text-orange-200/60 hover:text-white hover:bg-orange-500/20 transition-colors cursor-pointer"
                        title="View Details"
                    >
                        <Eye className="w-4 h-4" />
                    </button>
                </div>

                
                <h3
                    onClick={() => onView(task)}
                    className="text-lg font-bold text-white mb-2 line-clamp-1 hover:text-orange-400 transition-colors cursor-pointer tracking-tight"
                >
                    {task.title}
                </h3>

                <p className="text-orange-100/70 text-sm line-clamp-2 mb-4 leading-relaxed">
                    {task.description}
                </p>
            </div>

           
            <div className="pt-4 border-t border-orange-500/15 flex items-center justify-between">
               
                <div
                    className={`flex items-center gap-1.5 text-xs font-medium ${
                        isOverdue ? "text-rose-400" : "text-orange-200/60"
                    }`}
                >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{formattedDate}</span>
                    {isOverdue && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 uppercase font-bold">
                            Overdue
                        </span>
                    )}
                </div>

               
                <div className="flex items-center gap-1">
                    <button
                        onClick={() => onEdit(task)}
                        className="p-2 rounded-lg text-orange-200/60 hover:text-orange-400 hover:bg-orange-500/15 transition-colors cursor-pointer"
                        title="Edit Task"
                    >
                        <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(task)}
                        className="p-2 rounded-lg text-orange-200/60 hover:text-rose-400 hover:bg-rose-500/15 transition-colors cursor-pointer"
                        title="Delete Task"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
