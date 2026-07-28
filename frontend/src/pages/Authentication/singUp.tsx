import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CheckSquare, Lock, Mail, User as UserIcon, Eye, EyeOff, ArrowRight } from "lucide-react";

import { registerSchema, type RegisterFormData } from "../../validation/auth.schema";
import { registerApi } from "../../api/auth.api";

export default function Register() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (data: RegisterFormData) => {
        setIsLoading(true);
        try {
            const response = await registerApi({
                username: data.username,
                email: data.email,
                password: data.password,
            });

            if (response.success || response.statusCode === 201) {
                toast.success(response.message || "Account created successfully! Please login.");
                navigate("/login");
            } else {
                toast.error(response.message || "Registration failed");
            }
        } catch (error: any) {
            const msg = error.response?.data?.message || "Registration failed. Try again.";
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative bg-[#0c0804] overflow-hidden p-4">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse-glow" />
            <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />

            <div className="w-full max-w-md relative z-10">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 shadow-lg shadow-orange-500/30 mb-4 transform hover:scale-105 transition-transform duration-300">
                        <CheckSquare className="w-9 h-9 text-white" />
                    </div>
                    <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center justify-center gap-2">
                        TaskBoard 
                    </h1>
                    <p className="text-orange-200/70 text-sm mt-2">
                        Create an account to manage your tasks efficiently
                    </p>
                </div>

                <div className="glass-panel rounded-3xl p-8 shadow-2xl border border-orange-500/20">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Username Input */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-orange-200/80 mb-1.5">
                                Username
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-orange-400/60">
                                    <UserIcon className="w-5 h-5" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Enter your username"
                                    {...register("username")}
                                    className={`w-full pl-11 pr-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-orange-300/40 focus:outline-none ${
                                        errors.username ? "border-red-500 focus:border-red-500" : ""
                                    }`}
                                />
                            </div>
                            {errors.username && (
                                <p className="text-rose-400 text-xs mt-1 font-medium">
                                    {errors.username.message}
                                </p>
                            )}
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-orange-200/80 mb-1.5">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-orange-400/60">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    type="email"
                                    placeholder="user@example.com"
                                    {...register("email")}
                                    className={`w-full pl-11 pr-4 py-2.5 rounded-xl glass-input text-sm text-white placeholder-orange-300/40 focus:outline-none ${
                                        errors.email ? "border-red-500 focus:border-red-500" : ""
                                    }`}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-rose-400 text-xs mt-1 font-medium">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-orange-200/80 mb-1.5">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-orange-400/60">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Min 8 characters"
                                    {...register("password")}
                                    className={`w-full pl-11 pr-11 py-2.5 rounded-xl glass-input text-sm text-white placeholder-orange-300/40 focus:outline-none ${
                                        errors.password ? "border-red-500 focus:border-red-500" : ""
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-orange-400/60 hover:text-orange-200 transition-colors cursor-pointer"
                                    title={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <Eye className="w-5 h-5 text-orange-400" />
                                    ) : (
                                        <EyeOff className="w-5 h-5 text-orange-400/60" />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-rose-400 text-xs mt-1 font-medium">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Confirm Password Input */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-orange-200/80 mb-1.5">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-orange-400/60">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Repeat password"
                                    {...register("confirmPassword")}
                                    className={`w-full pl-11 pr-11 py-2.5 rounded-xl glass-input text-sm text-white placeholder-orange-300/40 focus:outline-none ${
                                        errors.confirmPassword ? "border-red-500 focus:border-red-500" : ""
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-orange-400/60 hover:text-orange-200 transition-colors cursor-pointer"
                                    title={showConfirmPassword ? "Hide password" : "Show password"}
                                >
                                    {showConfirmPassword ? (
                                        <Eye className="w-5 h-5 text-orange-400" />
                                    ) : (
                                        <EyeOff className="w-5 h-5 text-orange-400/60" />
                                    )}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-rose-400 text-xs mt-1 font-medium">
                                    {errors.confirmPassword.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 hover:from-amber-600 hover:via-orange-600 hover:to-yellow-600 text-slate-950 font-bold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-50 cursor-pointer mt-5"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-slate-950/30 border-t-slate-950 rounded-full animate-spin" />
                            ) : (
                                <>
                                    <span>Create Account</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-5 border-t border-orange-500/15 text-center">
                        <p className="text-xs text-orange-200/60">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-orange-400 hover:text-orange-300 transition-colors inline-flex items-center gap-1"
                            >
                                Sign in instead
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}