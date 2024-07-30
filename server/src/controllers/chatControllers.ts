import { NextFunction, Request, Response } from "express";
import { User, Chat } from "../models/User.js";
import { configureOpenAI } from "../config/openAI.js";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";

// Generate Chat Completion
export const generateChatCompletion = async (req: Request, res: Response, next: NextFunction) => {
    const { message} = req.body; // user prompt
    
    try {
        const user = await User.findById(res.locals.jwtData.id).populate('chats');
        if (!user) 
            return res
            .status(401)
            .json({ message: "User not registered OR Token malfunctioned" });
        
        const filteredChats = user.chats.filter((chat :any) => chat.role === "ocr");
        const filter = filteredChats.map((chat: any) => ({ role: chat.role, content: chat.content })) as ChatCompletionRequestMessage[];
        const singleData = filter[filter.length-1]
        const lastOcr = singleData["content"]

        // Prompt and guidlines for user messages
        const prompt = `You are an AI assistant specialized in textual analysis. 
        Your primary function is to analyze and respond to queries about text extracted from images using OCR. 
        Here's the most recent OCR-extracted text:
        "${lastOcr}"
        Please respond to the following user query:
        User: ${message}
        Guidelines for your response:
        1. If the user's query is related to the OCR text, provide a detailed analysis based on the content.
        2. If the query is not directly related to the OCR text, still provide a helpful response,
        but try to relate it back to textual analysis or OCR concepts if possible.
        3. If the query is completely unrelated to text analysis or OCR, 
        politely remind the user of your primary function while still attempting to provide a helpful answer.
        4. Always maintain a context of being a textual analysis assistant, even when answering general questions.
        Please provide a relevant, informative, and context-appropriate response.`

        const config = configureOpenAI();
        const openai = new OpenAIApi(config);
        const chatResponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: "You are a helpful assistant specializing in textual analysis and OCR-related queries." },
            { role: "user", content: prompt }
        ],
        });
        
        const userMessage = new Chat({ content: message, role: "user" });
        const openAiResponse = new Chat({content:chatResponse.data.choices[0].message["content"], role:"assistant"}) 
        
        user.chats.push(userMessage._id, openAiResponse._id);
        await userMessage.save();
        await openAiResponse.save();
        await user.save();
        // Populate the chats with the latest data
        // await user.populate('chats');

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
