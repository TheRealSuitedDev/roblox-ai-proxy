// server.js
import express from "express";

const app = express();
app.use(express.json());

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY; // set this as env variable

app.post("/chat", async (req, res) => {
    const { messages } = req.body;

    if (!messages) {
        return res.status(400).json({ error: "No messages provided" });
    }

    try {
        const response = await fetch("https://api.anthropic.com/v1/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-api-key": ANTHROPIC_API_KEY,
                "anthropic-version": "2023-06-01"
            },
            body: JSON.stringify({
                model: "claude-sonnet-4-20250514",
                max_tokens: 1024,
                system: "You are a helpful AI inside a Roblox game. Keep responses concise and fun.",
                messages: messages
            })
        });

        const data = await response.json();
        const reply = data.content[0].text;

        res.json({ reply });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
});

app.listen(3000, () => console.log("Proxy running on port 3000"));
