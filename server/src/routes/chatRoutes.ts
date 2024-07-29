import { Router } from "express";
import { verifyToken } from "../utils/manageTokens.js";
import { validate,chatCompletionValidator } from "../utils/validators.js";
import { generateChatCompletion, sendChatsToUser, deleteChats } from "../controllers/chatControllers.js";
import { processImage } from "../controllers/ocrControllers.js";

const chatRoutes = Router()
chatRoutes.post(
    "/new",
  validate(chatCompletionValidator),
  verifyToken,
  generateChatCompletion
)

chatRoutes.get("/all-chats", verifyToken, sendChatsToUser)
chatRoutes.delete("/delete", verifyToken, deleteChats)
chatRoutes.post("/process-image", verifyToken, processImage)

export default chatRoutes