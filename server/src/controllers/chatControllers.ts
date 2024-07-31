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
        const lastOcr = singleData ? singleData["content"] : null;

        // Prompt and guidlines for user messages
        let prompt;
        if (lastOcr) {
            prompt = `You are a friendly AI assistant named Image Wordy, specializing in understanding 
            and explaining text. You have access to the following text which is the most recent OCR-extracted text::
            "${lastOcr}"
            Please respond to this user message in a casual, friendly manner:
            User: ${message}
            Guidelines for your response:
            1. Don't mention OCR, text extraction, or any technical processes. 
            Respond as if you're simply discussing the text.
            2. If the user asks about the meaning or content of the text, 
            provide a friendly explanation without technical jargon.
            3. If the user's question isn't directly about the text, 
            still try to relate your answer back to text analysis concepts in a casual way.
            4. If the conversation deviates completely from text analysis, 
            gently remind the user what you're here for, like "Hey, just a friendly reminder - I'm TextBuddy, and I'm here to chat about any text you want to understand better. Got any interesting text you'd like to discuss?"
            5. Keep your tone casual, friendly, and approachable 
            - like chatting with a knowledgeable friend.`;
        } else {
            prompt = `You are a friendly AI assistant named TextBuddy, 
            specializing in understanding and explaining text. However, no text has been provided for analysis yet.
            Please respond to this user message in a casual, friendly manner:
            User: ${message}
            Guidelines for your response:
            1. If the user seems to be expecting a text analysis, 
            casually mention that there's no text to analyze yet, 
            like "Oops! Looks like we don't have any text to look at yet. Want to share some with me?"
            2. Encourage the user to provide some text if they want to discuss or analyze it.
            3. For questions about text analysis in general, provide friendly, jargon-free explanations.
            4. If the query is unrelated to text analysis, provide a helpful response 
            while gently steering the conversation back to your purpose.
            5. Keep your tone casual, friendly, and approachable - like chatting with a knowledgeable friend.`;
        }

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
