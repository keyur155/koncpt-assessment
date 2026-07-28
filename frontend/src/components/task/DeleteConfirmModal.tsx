import { AlertTriangle, Trash2, X } from "lucide-react";
import type { Task } from "../../types/task.types";

interface Props {
    task: Task | null;
    onClose: () => void;
    onConfirm: () => Promise<void>;
    isLoading?: boolean;
}

export default function DeleteConfirmModal({ task, onClose, onConfirm, isLoading }: Props) {
    if (!task) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#efd5ff]/20  backdrop-blur-md animate-fade-in">
            <div className="glass-panel w-full max-w-md rounded-3xl p-6 border border-rose-500/30 shadow-2xl relative text-center">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 p-2 rounded-xl text-orange-200/60 hover:text-white hover:bg-orange-500/20 transition-colors cursor-pointer"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Warning Icon */}
                <div className="w-14 h-14 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto mb-4">
                    <AlertTriangle className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                    Delete Task?
                </h3>
                <p className="text-orange-100/70 text-sm mb-6 leading-relaxed">
                    Are you sure you want to delete <span className="font-semibold text-white">"{task.title}"</span>? This action cannot be undone.
                </p>

                {/* Buttons */}
                <div className="flex items-center justify-center gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2.5 rounded-xl text-orange-200/80 hover:text-white hover:bg-orange-500/15 text-sm font-medium transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white text-sm font-semibold shadow-lg shadow-rose-500/25 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                        {isLoading ? (
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                <Trash2 className="w-4 h-4" /> Delete Task
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
