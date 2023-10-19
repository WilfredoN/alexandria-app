export interface UserDTO {
    full_name: string;
    login: string;
    password: string;
    prefix_group?: string;
    code_group?: string;
    role: string;
    subjects?: string[];
}
