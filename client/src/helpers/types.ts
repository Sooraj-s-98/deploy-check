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

interface Message {
    role: "user" | "assistant" | "ocr" | "ocr-image";
    content: string;
}

interface MainChatProps {
    chatMessages: Message[];
    setChatMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}

export type {User, UserAuth, Message, MainChatProps}
