export interface TriageResult {
  priorityScore: number; // 1 - 100
  urgencyLevel: 'Critical' | 'High' | 'Moderate';
  recommendedAid: string[];
  situationSummary: string;
}

export async function analyzeDistressReport(description: string, headcount: number): Promise<TriageResult> {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

  if (!apiKey) {
    console.warn('Gemini API Key missing. Returning mock assessment.');
    return {
      priorityScore: 85,
      urgencyLevel: 'Critical',
      recommendedAid: ['Drinking Water', 'First Aid Kits', 'Dry Rations'],
      situationSummary: 'High-priority distress reported. Automated response queued.',
    };
  }

  const prompt = `You are an emergency disaster response triage coordinator.
Analyze this civilian SOS report and respond ONLY with a raw JSON object (no markdown, no backticks).

JSON Structure:
{
  "priorityScore": <number between 1 and 100>,
  "urgencyLevel": <"Critical" | "High" | "Moderate">,
  "recommendedAid": [<list of relief supplies needed as strings>],
  "situationSummary": "<one tactical summary sentence>"
}

Distress Message: "${description}"
Headcount affected: ${headcount}`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' },
        }),
      }
    );

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    return JSON.parse(rawText) as TriageResult;
  } catch (error) {
    console.error('Gemini API Error:', error);
    return {
      priorityScore: 75,
      urgencyLevel: 'High',
      recommendedAid: ['Medical Kit', 'Bottled Water'],
      situationSummary: 'Direct triage queued for operator verification.',
    };
  }
}