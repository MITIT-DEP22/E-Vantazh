export interface AuthResponse {
    accessToken: string,
    refreshToken: string
}

export interface RegisterAuthResponse {
    firstName: string,
    lastName: string,
    email: string
}