export type AuthLoginType = { email: string; password: string };
export interface LoginPayloadResponse {
   email: string;
   _id: string;
   accessToken: string;
   refreshToken: string;
}
export interface KnownLoginError {
   success: boolean;
   error: boolean;
   message: string;
}
export interface StateInterface {
   auth: LoginPayloadResponse | null;
   authLoading: boolean;
   authError: string | undefined | null;
}
