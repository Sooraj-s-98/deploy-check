import { createWorker } from "tesseract.js";
import { User, Chat } from "../models/User.js";
export const processImage = async (req, res, next) => {
    const { image } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id).populate('chats');
        if (!user)
            return res.status(401).json({ message: "User not registered OR Token malfunctioned" });
        const worker = await createWorker("eng");
        const { data: { text } } = await worker.recognize(image);
        await worker.terminate();
        const userMessage = new Chat({ content: image, role: "ocr-image" });
        const ocrMessage = new Chat({ content: text, role: "ocr" });
        user.chats.push(userMessage._id, ocrMessage._id);
        await userMessage.save();
        await ocrMessage.save();
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.error("Error in processImage:", error);
        return res.status(500).json({ message: "An error occurred during image processing" });
    }
};
//# sourceMappingURL=ocrControllers.js.map