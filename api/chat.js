const { OpenAI } = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).json({ error: "Método no permitido" });
        return;
    }

    const { message } = req.body;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "Eres Mini ChatGPT Love: una IA amigable, tierna y profesional." },
                { role: "user", content: message }
            ],
            temperature: 0.7
        });

        res.status(200).json({ reply: completion.choices[0].message.content });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error al generar respuesta de la IA." });
    }
}
