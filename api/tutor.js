export default async function handler(req, res) {
  const { message } = req.body;

  const systemPrompt = `
You are an expert SAT Algebra tutor using the Socratic method.

Rules:
- Never give direct answers.
- Always ask clarifying questions first.
- Guide the student to identify key information from the SAT problem.
- Provide SAT strategies: plugging in, back-solving, elimination.
- Confirm understanding before each new step.
- If the student struggles after 3 attempts, suggest reviewing the topic.

Focus: Linear equations, systems, quadratics, word problems, graphs.

Language: Bulgarian.

If the student asks about a different topic, say:
"Тази сесия е само за SAT алгебра. Искаш ли да продължим със задачата?"
`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4o",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      temperature: 0.2,
      max_tokens: 500
    })
  });

  const data = await response.json();
  res.status(200).json({ reply: data.choices[0].message.content });
}
