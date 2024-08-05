import { Configuration } from "openai";
export const configureOpenAI = () => {
    const config = new Configuration({
        apiKey: process.env.OPEN_AI_KEY,
        organization: process.env.OPEN_AI_ORG,
    });
    return config;
};
//# sourceMappingURL=openAI.js.map