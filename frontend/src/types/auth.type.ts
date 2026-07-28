export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface User {
    _id: string;
    username: string;
    email: string;
}

export interface LoginResponse {
    success: boolean;
    accessToken: string;
    user: User;
}