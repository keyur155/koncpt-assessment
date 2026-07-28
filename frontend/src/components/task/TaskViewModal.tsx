import { X, Calendar, Clock, Flag, Edit3, Trash2 } from "lucide-react";
import type { Task } from "../../types/task.types";

interface Props {
    task: Task | null;
    onClose: () => void;
    onEdit: (task: Task) => void;
    onDelete: (task: Task) => void;
}

export default function TaskViewModal({ task, onClose, onEdit, onDelete }: Props) {
    if (!task) return null;

    const formattedDueDate = new Date(task.dueDate).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
    });

    const formattedCreatedAt = task.createdAt
        ? new Date(task.createdAt).toLocaleString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
          })
        : "N/A";

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

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
            <div className="glass-panel w-full max-w-lg rounded-3xl p-6 sm:p-8 border border-orange-500/30 shadow-2xl relative">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 rounded-xl text-orange-200/60 hover:text-white hover:bg-orange-500/20 transition-colors cursor-pointer"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Badges */}
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/15 text-orange-300 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {task.status}
                    </span>
                    <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full border ${getPriorityBadge(
                            task.priority
                        )} flex items-center gap-1.5`}
                    >
                        <Flag className="w-3.5 h-3.5" /> {task.priority} Priority
                    </span>
                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold text-white mb-4 tracking-tight leading-snug">
                    {task.title}
                </h2>

                {/* Description */}
                <div className="bg-amber-950/40 rounded-2xl p-4 border border-orange-500/15 mb-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-orange-200/70 mb-2">
                        Description
                    </h4>
                    <p className="text-orange-100 text-sm whitespace-pre-wrap leading-relaxed">
                        {task.description}
                    </p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4 text-xs mb-6">
                    <div className="bg-amber-950/30 p-3 rounded-xl border border-orange-500/15">
                        <span className="text-orange-200/60 block mb-1">Due Date</span>
                        <div className="text-white font-medium flex items-center gap-1.5">
                            <Calendar className="w-4 h-4 text-orange-400" />
                            {formattedDueDate}
                        </div>
                    </div>
                    <div className="bg-amber-950/30 p-3 rounded-xl border border-orange-500/15">
                        <span className="text-orange-200/60 block mb-1">Created At</span>
                        <div className="text-white font-medium flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-amber-400" />
                            {formattedCreatedAt}
                        </div>
                    </div>
                </div>

                {/* Modal Footer Actions */}
                <div className="flex items-center justify-end gap-3 pt-5 border-t border-orange-500/15">
                    <button
                        onClick={() => {
                            onClose();
                            onEdit(task);
                        }}
                        className="px-4 py-2 rounded-xl bg-orange-500/15 border border-orange-500/30 text-orange-300 hover:bg-orange-500/25 text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                        <Edit3 className="w-4 h-4" /> Edit
                    </button>
                    <button
                        onClick={() => {
                            onClose();
                            onDelete(task);
                        }}
                        className="px-4 py-2 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 hover:bg-rose-500/25 text-sm font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                        <Trash2 className="w-4 h-4" /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
