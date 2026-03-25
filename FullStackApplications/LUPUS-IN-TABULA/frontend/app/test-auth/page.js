"use client";

import { authStore } from "../../state/authStore";
import { useEffect, useState } from "react";

export default function TestAuthPage() {
  const [, forceRender] = useState(0);

  useEffect(() => {
    const unsub = authStore.subscribe(() => forceRender((x) => x + 1));
    return unsub;
  }, []);

  const token = authStore.getToken();
  const identity = authStore.getIdentity();

  return (
    <main style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h1>Auth Store Test</h1>

      <div style={{ marginBottom: 16 }}>
        <button
          onClick={() =>
            authStore.setToken(
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9." +
                "eyJzdWIiOiJwMSIsIm5hbWUiOiJBbGljZSJ9." +
                "test"
            )
          }
        >
          Set Fake Token
        </button>

        <button
          onClick={() => authStore.logout()}
          style={{ marginLeft: 8 }}
        >
          Clear Token
        </button>
      </div>

      <pre>
Token:
{token ?? "null"}
      </pre>

      <pre>
Identity:
{identity ? JSON.stringify(identity, null, 2) : "null"}
      </pre>
    </main>
  );
}