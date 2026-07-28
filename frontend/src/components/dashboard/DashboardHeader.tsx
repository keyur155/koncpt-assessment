import { CheckSquare, LogOut, User as UserIcon } from "lucide-react";
import type { User } from "../../types/auth.type";


interface DashboardHeaderProps {
    user: User | null;
    onLogout: () => void;
}

export default function DashboardHeader({
    user,
    onLogout,
}: DashboardHeaderProps) {
    return (
        <header className="glass-panel rounded-3xl p-4 sm:p-6 mb-8 border border-orange-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 overflow-hidden">
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center shadow-lg shadow-orange-500/30 shrink-0">
                    <CheckSquare className="w-7 h-7 text-white" />
                </div>

                <div className="min-w-0">
                    <h1 className="text-xl font-bold tracking-tight text-white">
                        TaskBoard
                    </h1>

                    <p className="text-xs text-orange-200/70 truncate">
                        Task Management System Dashboard
                    </p>
                </div>
            </div>

           
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end min-w-0">
                
                <div className="flex items-center gap-3 bg-amber-950/40 px-3.5 py-2 rounded-2xl border border-orange-500/20 min-w-0 flex-1 sm:flex-initial">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 flex items-center justify-center font-bold text-xs text-slate-950 shrink-0">
                        {user?.username?.charAt(0).toUpperCase() ?? (
                            <UserIcon className="w-4 h-4" />
                        )}
                    </div>

                    <div className="text-left min-w-0 flex-1">
                        <span className="block text-xs font-semibold text-white truncate">
                            {user?.username ?? "Logged User"}
                        </span>

                        <span
                            className="block text-[10px] text-orange-200/60 truncate max-w-[220px]"
                            title={user?.email ?? "user@taskboard.com"}
                        >
                            {user?.email ?? "user@taskboard.com"}
                        </span>
                    </div>
                </div>

                
                <button
                    onClick={onLogout}
                    className="p-2.5 sm:px-3.5 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 transition-all flex items-center justify-center gap-2 text-xs font-semibold cursor-pointer shrink-0"
                    title="Sign Out"
                >
                    <LogOut className="w-4 h-4" />

                    <span className="hidden sm:inline">
                        Logout
                    </span>
                </button>
            </div>
        </header>
    );
}