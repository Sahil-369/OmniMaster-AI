export default async function handler(req, res) {
  const { mode, message } = req.body; // mode: "chat", "quiz", "story", etc.
  
  // Mode ke hisaab se model select kar lo
  let model = "llama2-7b"; // default light model
  if(mode === "long-text" || mode === "quiz") model = "llama2-13b";

  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: model,
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong", details: err.message });
  }
}