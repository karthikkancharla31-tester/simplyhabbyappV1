export async function generateMotivation({ habitName, category, currentStreak, signal }) {
  const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY
  if (!apiKey || apiKey === 'your_api_key_here') return null

  const streakPart =
    currentStreak > 1
      ? `They're on a ${currentStreak}-day streak.`
      : currentStreak === 1
      ? "It's their first day completing it."
      : ''

  const prompt = `A user just completed their "${habitName}" habit (${category}). ${streakPart}

Write ONE short, warm motivational message (max 90 characters). Be specific to the habit. No hashtags. No emojis.

Reply with ONLY the message text.`

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 100,
        messages: [{ role: 'user', content: prompt }],
      }),
      signal,
    })

    if (!res.ok) return null
    const data = await res.json()
    return data.content?.[0]?.text?.trim() ?? null
  } catch {
    return null
  }
}
