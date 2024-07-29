import axios from "axios"

export const sendChatRequest = async (message: string) => {
    const res = await axios.post("/chat/new", { message });
    if (res.status !== 200) {
        throw new Error("Unable to send chat");
    }
    const data = await res.data;
    return data;
};

export const sendImageRequest = async (image: string) => {
    const res = await axios.post("/chat/process-image", { image });
    if (res.status !== 200) {
        throw new Error("Unable to process image");
    }
    return res.data;
};

export const getUserChats = async () => {
    const res = await axios.get("/chat/all-chats");
    if (res.status !== 200) {
        throw new Error("Unable to fetch chat");
    }
    const data = await res.data;
    return data;
};

export const deleteUserChats = async () => {
    const res = await axios.delete("/chat/delete");
    if (res.status !== 200) {
        throw new Error("Unable to delete chats");
    }
    const data = await res.data;
    return data;
};
