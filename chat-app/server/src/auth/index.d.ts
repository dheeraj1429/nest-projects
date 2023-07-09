export type AuthResponse = Promise<Record<{ accessToken: string; refreshToken: string; email: string; _id: string }>>;
