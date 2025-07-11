const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Método no permitido" });
    return;
  }

  const { message } = req.body;

  if (!message) {
    res.status(400).json({ error: "Falta el mensaje en la solicitud" });
    return;
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "Eres Mini ChatGPT Love: una IA amigable, tierna y profesional." },
        { role: "user", content: message }
      ],
      temperature: 0.7
    });

    const reply = completion.choices[0].message.content.trim();
    res.status(200).json({ reply });
  } catch (err) {
    console.error("Error al conectar con OpenAI:", err);
    res.status(500).json({ error: "Error al generar respuesta de la IA 💔" });
  }
};
