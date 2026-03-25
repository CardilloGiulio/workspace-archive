export default function LobbyCard({ lobby, onOpen }) {
  const playerCount = lobby.players().length;

  return (
    <button
      type="button"
      onClick={() => onOpen?.(lobby.id())}
      style={{
        width: "100%",
        textAlign: "left",
        border: "1px solid rgba(255,255,255,0.12)",
        background: "rgba(255,255,255,0.06)",
        borderRadius: 16,
        padding: 16,
        cursor: "pointer",
        transition: "transform 120ms ease, border-color 120ms ease, background 120ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-1px)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
        e.currentTarget.style.background = "rgba(255,255,255,0.08)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: 0.2,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
            title={lobby.name()}
          >
            {lobby.name()}
          </div>

          <div
            style={{
              marginTop: 6,
              fontSize: 12,
              opacity: 0.85,
              display: "flex",
              gap: 10,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                padding: "2px 8px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.14)",
                background: "rgba(0,0,0,0.18)",
              }}
            >
              ID: {lobby.id()}
            </span>

            <span style={{ opacity: 0.8 }}>
              Players: <strong style={{ opacity: 1 }}>{playerCount}</strong>
            </span>
          </div>
        </div>

        <div
          aria-hidden
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))",
            display: "grid",
            placeItems: "center",
            flex: "0 0 auto",
          }}
        >
          <span style={{ fontSize: 18, opacity: 0.9 }}>→</span>
        </div>
      </div>

      {playerCount > 0 && (
        <div
          style={{
            marginTop: 12,
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          {lobby
            .players()
            .slice(0, 6)
            .map((p) => (
              <span
                key={p.id()}
                style={{
                  fontSize: 12,
                  padding: "4px 10px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.14)",
                  background: "rgba(255,255,255,0.05)",
                }}
              >
                {p.name()}
              </span>
            ))}

          {playerCount > 6 && (
            <span style={{ fontSize: 12, opacity: 0.75, padding: "4px 6px" }}>
              +{playerCount - 6} more
            </span>
          )}
        </div>
      )}
    </button>
  );
}
