import { CheckCircle2, Clock, ListTodo, Flame } from "lucide-react";
import type { Task } from "../../types/task.types";

interface Props {
    tasks: Task[];
    totalTasksCount: number;
}

export default function TaskStatsCards({ tasks, totalTasksCount }: Props) {
    const pendingCount = tasks.filter((t) => t.status === "Pending").length;
    const inProgressCount = tasks.filter((t) => t.status === "In Progress").length;
    const completedCount = tasks.filter((t) => t.status === "Completed").length;

    const completionPercentage =
        totalTasksCount > 0 ? Math.round((completedCount / totalTasksCount) * 100) : 0;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Total Tasks Card */}
            <div className="glass-panel glass-panel-hover rounded-2xl p-5 border border-orange-500/20 relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-orange-200/70 uppercase tracking-wider">Total Tasks</span>
                    <div className="p-2.5 rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/30">
                        <ListTodo className="w-5 h-5" />
                    </div>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white tracking-tight">{totalTasksCount}</span>
                    <span className="text-xs text-orange-300/70">items</span>
                </div>
                <div className="mt-3 w-full bg-amber-950/60 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-gradient-to-r from-orange-500 to-amber-400 h-full rounded-full transition-all duration-500" style={{ width: '100%' }} />
                </div>
            </div>

            {/* Pending Tasks Card */}
            <div className="glass-panel glass-panel-hover rounded-2xl p-5 border border-amber-500/20 relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-orange-200/70 uppercase tracking-wider">Pending</span>
                    <div className="p-2.5 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30">
                        <Clock className="w-5 h-5" />
                    </div>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white tracking-tight">{pendingCount}</span>
                    <span className="text-xs text-amber-400 font-medium">Awaiting start</span>
                </div>
                <div className="mt-3 w-full bg-amber-950/60 h-1.5 rounded-full overflow-hidden">
                    <div
                        className="bg-amber-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${totalTasksCount ? (pendingCount / totalTasksCount) * 100 : 0}%` }}
                    />
                </div>
            </div>

            {/* In Progress Card */}
            <div className="glass-panel glass-panel-hover rounded-2xl p-5 border border-orange-500/20 relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-orange-200/70 uppercase tracking-wider">In Progress</span>
                    <div className="p-2.5 rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/30">
                        <Flame className="w-5 h-5 fill-orange-400/20" />
                    </div>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white tracking-tight">{inProgressCount}</span>
                    <span className="text-xs text-orange-400 font-medium">Active work</span>
                </div>
                <div className="mt-3 w-full bg-amber-950/60 h-1.5 rounded-full overflow-hidden">
                    <div
                        className="bg-orange-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${totalTasksCount ? (inProgressCount / totalTasksCount) * 100 : 0}%` }}
                    />
                </div>
            </div>

            {/* Completed Tasks Card */}
            <div className="glass-panel glass-panel-hover rounded-2xl p-5 border border-emerald-500/20 relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-orange-200/70 uppercase tracking-wider">Completed</span>
                    <div className="p-2.5 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        <CheckCircle2 className="w-5 h-5" />
                    </div>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-white tracking-tight">{completedCount}</span>
                    <span className="text-xs text-emerald-400 font-medium">{completionPercentage}% finished</span>
                </div>
                <div className="mt-3 w-full bg-amber-950/60 h-1.5 rounded-full overflow-hidden">
                    <div
                        className="bg-emerald-400 h-full rounded-full transition-all duration-500"
                        style={{ width: `${completionPercentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
