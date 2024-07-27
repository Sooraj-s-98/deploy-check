interface User {
    name: string;
    email: string;
}

interface UserAuth {
    isLoggedin : boolean;
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export type {User, UserAuth}
