import { LoginData } from "../../application/dtos/authDto";

export interface AuthService {
    login(data: LoginData): Promise<{ token: string; usuario: any }>;
}
