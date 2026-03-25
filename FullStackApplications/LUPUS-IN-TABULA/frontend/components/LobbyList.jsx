import LobbyCard from "./LobbyCard";

export default function LobbyList({ lobbies, onOpen }) {
  if (!lobbies || lobbies.length === 0) {
    return (
      <div
        style={{
          border: "1px dashed rgba(255,255,255,0.18)",
          borderRadius: 16,
          padding: 18,
          opacity: 0.85,
        }}
      >
        No lobbies yet. Create one.
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 14,
      }}
    >
      {lobbies.map((lobby) => (
        <LobbyCard key={lobby.id()} lobby={lobby} onOpen={onOpen} />
      ))}
    </div>
  );
}
