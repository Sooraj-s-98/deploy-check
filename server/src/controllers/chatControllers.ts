import { NextFunction, Request, Response } from "express";
import { User, Chat } from "../models/User.js";
import { configureOpenAI } from "../config/openAI.js";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";

// Generate Chat Completion
export const generateChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
    const { message, type } = req.body; // Add 'type' to the request body to specify if it's 'user' or 'ocr'
    try {
        const user = await User.findById(res.locals.jwtData.id).populate('chats');
        if (!user) 
            return res
            .status(401)
            .json({ message: "User not registered OR Token malfunctioned" });
        
        const chats = user.chats.map((chat: any) => ({ role: chat.role, content: chat.content })) as ChatCompletionRequestMessage[];
        chats.push({ content: message, role: type }); // Use 'type' to determine the role
        
        const config = configureOpenAI();
        const openai = new OpenAIApi(config);
        const chatResponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: chats,
        });
        
        const userMessage = new Chat({ content: message, role: type }); // Use 'type' here as well
        const botMessage = new Chat(chatResponse.data.choices[0].message);
        
        user.chats.push(userMessage._id, botMessage._id);
        await userMessage.save();
        await botMessage.save();
        await user.save();
        
        return res.status(200).json({ chats: user.chats });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};

// Send Chats to User
export const sendChatsToUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtData.id).populate('chats');
        if (!user) return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
        
        return res.status(200).json({ message: "OK", chats: user.chats });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};

// Delete Chats
export const deleteChats = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
        
        await Chat.deleteMany({ _id: { $in: user.chats } });
        user.chats = [];
        await user.save();

        return res.status(200).json({ message: "Chats deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
