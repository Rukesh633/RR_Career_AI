const MODEL = 'llama-3.3-70b-versatile'; 

async function callAI(systemPrompt, userMessage) {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  
  if (!apiKey) {
    throw new Error("Missing Groq API key in .env file");
  }

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage }
      ],
      // This ensures the model returns valid JSON
      response_format: { type: "json_object" },
      temperature: 0.7
    }),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(`Groq Error: ${errorData.error?.message || res.statusText}`);
  }

  const data = await res.json();
  const rawText = data.choices[0].message.content;

  try {
    return JSON.parse(rawText);
  } catch {
    console.error("JSON Parse Error. Raw content:", rawText);
    throw new Error("The AI returned an invalid format. Please try again.");
  }
}

// ── Career Analysis ──────────────────────────────────────────────────────────
export async function analyzeCareer(formData) {
  const systemPrompt = `You are CareerAI, an expert career counselor specializing in the Indian job market.
You MUST respond with ONLY a valid JSON object. Absolutely no text before or after the JSON. No markdown. No code fences. Just the raw JSON.

The JSON must have exactly this structure:
{
  "overview": {
    "title": "string",
    "summary": "string - 2 to 3 sentences",
    "difficulty": "Easy",
    "timeline": "string e.g. 6-12 months",
    "salaryRange": "string e.g. Rs 8-25 LPA",
    "demandLevel": "High",
    "score": 78
  },
  "steps": [
    {
      "id": 1,
      "phase": "string",
      "title": "string",
      "description": "string",
      "duration": "string e.g. 1-2 months",
      "resources": ["string", "string"],
      "milestone": "string"
    }
  ],
  "skills": {
    "current": ["string"],
    "toLearn": [
      { "name": "string", "priority": "High", "timeWeeks": 4, "reason": "string" }
    ],
    "transferable": ["string"]
  },
  "aiRisk": {
    "overallRisk": 65,
    "riskLevel": "Medium",
    "summary": "string",
    "tasks": [
      { "task": "string", "risk": 70, "reason": "string" }
    ],
    "safeSkills": ["string"],
    "advice": "string"
  },
  "realityCheck": {
    "pros": ["string", "string", "string"],
    "cons": ["string", "string", "string"],
    "myths": [
      { "myth": "string", "reality": "string" },
      { "myth": "string", "reality": "string" }
    ],
    "verdict": "string"
  }
}`

  const userMessage = `Analyze this career profile for the Indian job market and respond with ONLY the JSON:

Current Role / Background: ${formData.currentRole || 'Not specified'}
Target Career: ${formData.targetCareer || 'Not specified'}
Years of Experience: ${formData.experience || 'Not specified'}
Education: ${formData.education || 'Not specified'}
Current Skills: ${formData.skills || 'Not specified'}
Main Goal: ${formData.goals || 'Not specified'}

Give 5-7 roadmap steps, 6-8 AI risk tasks, exactly 3 pros, exactly 3 cons, and 2 myths. Use INR salary ranges. Be specific and actionable.`

  return callAI(systemPrompt, userMessage, 4000)
}

// ── Job AI Risk Analysis ─────────────────────────────────────────────────────
export async function analyzeJobRisk(jobData) {
  const systemPrompt = `You are CareerAI's AI Risk Analyzer.
You MUST respond with ONLY a valid JSON object. No text before or after. No markdown. No code fences.

The JSON must have exactly this structure:
{
  "jobTitle": "string",
  "overallRisk": 65,
  "riskLevel": "Medium",
  "riskCategory": "string e.g. Moderately Automatable",
  "summary": "string",
  "timeToImpact": "string e.g. 3-5 years",
  "tasks": [
    { "task": "string", "risk": 70, "category": "Automatable", "reason": "string" }
  ],
  "safestAspects": ["string", "string", "string"],
  "mostAtRisk": ["string", "string", "string"],
  "futureRole": "string - what this role looks like in 10 years",
  "actionPlan": [
    { "action": "string", "priority": "Urgent", "impact": "string" }
  ],
  "alternativeCareers": [
    { "title": "string", "risk": 30, "reason": "string" }
  ],
  "industryContext": "string"
}`

  const userMessage = `Analyze AI automation risk for this job and respond with ONLY the JSON:

Job Title: ${jobData.jobTitle}
Industry: ${jobData.industry || 'Not specified'}
Key Responsibilities: ${jobData.responsibilities || 'Not specified'}
Years of Experience: ${jobData.experience || 'Not specified'}
Current Skills: ${jobData.skills || 'Not specified'}

Give 7-10 tasks, 3 alternative careers, 4-5 action plan items. Be honest and data-driven.`

  return callAI(systemPrompt, userMessage, 3000)
}

// ── Career Comparison ────────────────────────────────────────────────────────
export async function compareCareers(career1, career2) {
  const systemPrompt = `You are CareerAI. Compare two careers for Indian professionals.
You MUST respond with ONLY a valid JSON object. No text before or after. No markdown. No code fences.

The JSON must have exactly this structure:
{
  "career1": {
    "name": "string",
    "salary": "string in INR LPA",
    "demand": "High",
    "aiRisk": 45,
    "growthRate": "string e.g. 15% per year",
    "timeToLearn": "string e.g. 6 months",
    "jobSatisfaction": 75,
    "verdict": "string - one sentence"
  },
  "career2": {
    "name": "string",
    "salary": "string in INR LPA",
    "demand": "High",
    "aiRisk": 45,
    "growthRate": "string",
    "timeToLearn": "string",
    "jobSatisfaction": 75,
    "verdict": "string"
  },
  "winner": "career1",
  "winnerReason": "string",
  "recommendation": "string - 2 to 3 sentences"
}`

  const userMessage = `Compare "${career1}" vs "${career2}" for the Indian job market. Respond with ONLY the JSON.`

  return callAI(systemPrompt, userMessage, 2000)
}

// ── Personalized Suggestions ─────────────────────────────────────────────────
export async function getSuggestions(profile) {
  const systemPrompt = `You are CareerAI. Suggest the best career matches for a person.
You MUST respond with ONLY a valid JSON object. No text before or after. No markdown. No code fences.

The JSON must have exactly this structure:
{
  "suggestions": [
    {
      "title": "string",
      "match": 88,
      "reason": "string - why it fits this person",
      "salary": "string in INR LPA",
      "aiRisk": 35,
      "timeToSwitch": "string e.g. 6 months",
      "emoji": "🎨",
      "tag": "Best Match"
    }
  ],
  "insight": "string - 2 to 3 sentence personalized insight about their profile"
}`

  const userMessage = `Suggest exactly 5 best career options for this person and respond with ONLY the JSON:

Background: ${profile.background || 'Not specified'}
Interests / What they love: ${profile.interests || 'Not specified'}
Values / What matters: ${profile.values || 'Not specified'}
Preferred work style: ${profile.lifestyle || 'Not specified'}
What to avoid: ${profile.avoidance || 'Not specified'}
Education: ${profile.education || 'Not specified'}

Focus on Indian market. Use INR salaries. tag must be one of: Best Match, Safe from AI, High Growth, Creative, Stable`

  return callAI(systemPrompt, userMessage, 2000)
}