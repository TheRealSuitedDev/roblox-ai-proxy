// server.js
import express from "express";

const app = express();
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.post("/chat", async (req, res) => {
    const { messages } = req.body;

    if (!messages) {
        return res.status(400).json({ error: "No messages provided" });
    }

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                max_tokens: 1024,
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful AI inside a Roblox game. Your name is Suited-AI, The User Suited_Dev created you, Respond to messages in a cool way and make it not long but not short either"
                    },
                    ...messages
                ]
            })
        });

        const data = await response.json();
        const reply = data.choices[0].message.content;

        res.json({ reply });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(3000, () => console.log("Proxy running on port 3000"));
