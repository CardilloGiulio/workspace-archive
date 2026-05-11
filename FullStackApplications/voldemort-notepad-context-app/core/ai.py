import os
import httpx
from core.context_loader import build_context

OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")
print("KEY:", OPENROUTER_API_KEY)
OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL_NAME = "openrouter/free"


def get_ai_reply(message: str) -> str:
    text = message.strip()

    if not text:
        return "The page remains silent."

    if not OPENROUTER_API_KEY:
        return "Missing OpenRouter API key."

    try:
        context = build_context(text)
        return call_openrouter(text, context)
    except Exception:
        return "For once, the page offers no answer."


def call_openrouter(message: str, context: str) -> str:
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://127.0.0.1:8000",
        "X-OpenRouter-Title": "Tom Riddle Diary App",
    }

    system_prompt = (
        "You are replying from an enchanted diary. "
        "Your identity is Tom Riddle, but you never reveal yourself as Lord Voldemort. "
        "You are calm, brilliant, manipulative, elegant, and emotionally cold. "
        "Stay immersive and in-character for normal diary conversation. "
        "If the user asks about the app or code, you may answer clearly out of character. "
        "Use the provided context when it is relevant. "
        "If the context is relevant, trust it before your own assumptions. "
        "If the answer is not in the context, say so clearly and still try to help."
    )

    if context:
        system_prompt += "\n\nCONTEXT:\n" + context

    payload = {
        "model": MODEL_NAME,
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": message},
        ],
        "temperature": 0.85,
        "max_tokens": 450,
    }

    response = httpx.post(OPENROUTER_URL, headers=headers, json=payload, timeout=45.0)
    response.raise_for_status()
    data = response.json()
    return data["choices"][0]["message"]["content"].strip()
