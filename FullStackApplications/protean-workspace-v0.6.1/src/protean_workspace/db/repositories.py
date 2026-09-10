import json
from datetime import UTC, datetime
from uuid import uuid4

from protean_workspace.db.database import Database
from protean_workspace.models.domain import User, UserPreferences


def _now_iso() -> str:
    return datetime.now(UTC).isoformat()


def _parse_datetime(value: str) -> datetime:
    return datetime.fromisoformat(value)


class UserRepository:
    def __init__(self, database: Database) -> None:
        self._database = database

    def count(self) -> int:
        with self._database.connect() as db:
            row = db.execute("SELECT COUNT(*) AS count FROM users").fetchone()
        return int(row["count"])

    def create(self, username: str, password_hash: str) -> User:
        created_at = _now_iso()
        with self._database.connect() as db:
            cursor = db.execute(
                "INSERT INTO users(username, password_hash, created_at) VALUES (?, ?, ?)",
                (username, password_hash, created_at),
            )
            user_id = int(cursor.lastrowid)
        return User(user_id, username, password_hash, _parse_datetime(created_at))

    def get_by_username(self, username: str) -> User | None:
        with self._database.connect() as db:
            row = db.execute(
                "SELECT id, username, password_hash, created_at FROM users WHERE username = ?",
                (username,),
            ).fetchone()
        return self._to_user(row) if row else None

    def get(self, user_id: int) -> User | None:
        with self._database.connect() as db:
            row = db.execute(
                "SELECT id, username, password_hash, created_at FROM users WHERE id = ?",
                (user_id,),
            ).fetchone()
        return self._to_user(row) if row else None

    @staticmethod
    def _to_user(row) -> User:
        return User(
            id=int(row["id"]),
            username=str(row["username"]),
            password_hash=str(row["password_hash"]),
            created_at=_parse_datetime(str(row["created_at"])),
        )


class SessionRepository:
    def __init__(self, database: Database) -> None:
        self._database = database

    def create(self, session_id: str, user_id: int, expires_at: datetime) -> None:
        with self._database.connect() as db:
            db.execute(
                "INSERT INTO sessions(id, user_id, expires_at, revoked_at) VALUES (?, ?, ?, NULL)",
                (session_id, user_id, expires_at.isoformat()),
            )

    def is_active(self, session_id: str, user_id: int) -> bool:
        now = _now_iso()
        with self._database.connect() as db:
            row = db.execute(
                """
                SELECT 1 FROM sessions
                WHERE id = ? AND user_id = ? AND revoked_at IS NULL AND expires_at > ?
                """,
                (session_id, user_id, now),
            ).fetchone()
        return row is not None

    def revoke(self, session_id: str) -> None:
        with self._database.connect() as db:
            db.execute(
                "UPDATE sessions SET revoked_at = ? WHERE id = ? AND revoked_at IS NULL",
                (_now_iso(), session_id),
            )


class CredentialRepository:
    def __init__(self, database: Database) -> None:
        self._database = database

    def upsert(self, user_id: int, provider: str, secret_blob: str, masked_key: str) -> None:
        with self._database.connect() as db:
            db.execute(
                """
                INSERT INTO credentials(user_id, provider, secret_blob, masked_key, updated_at)
                VALUES (?, ?, ?, ?, ?)
                ON CONFLICT(user_id, provider) DO UPDATE SET
                    secret_blob = excluded.secret_blob,
                    masked_key = excluded.masked_key,
                    updated_at = excluded.updated_at
                """,
                (user_id, provider, secret_blob, masked_key, _now_iso()),
            )

    def get(self, user_id: int, provider: str) -> tuple[str, str] | None:
        with self._database.connect() as db:
            row = db.execute(
                "SELECT secret_blob, masked_key FROM credentials WHERE user_id = ? AND provider = ?",
                (user_id, provider),
            ).fetchone()
        if not row:
            return None
        return str(row["secret_blob"]), str(row["masked_key"])

    def delete(self, user_id: int, provider: str) -> None:
        with self._database.connect() as db:
            db.execute(
                "DELETE FROM credentials WHERE user_id = ? AND provider = ?",
                (user_id, provider),
            )


class PreferencesRepository:
    def __init__(self, database: Database) -> None:
        self._database = database

    def ensure(self, preferences: UserPreferences) -> None:
        with self._database.connect() as db:
            db.execute(
                """
                INSERT OR IGNORE INTO user_preferences(
                    user_id, library_root, active_character_id, active_phase_id, tone_id,
                    theme_id, background_id, frame_id, provider_model,
                    temperature, target_tokens, max_tokens
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    preferences.user_id,
                    preferences.library_root,
                    preferences.active_character_id,
                    preferences.active_phase_id,
                    preferences.tone_id,
                    preferences.theme_id,
                    preferences.background_id,
                    preferences.frame_id,
                    preferences.provider_model,
                    preferences.temperature,
                    preferences.target_tokens,
                    preferences.max_tokens,
                ),
            )

    def get(self, user_id: int) -> UserPreferences:
        with self._database.connect() as db:
            row = db.execute(
                "SELECT * FROM user_preferences WHERE user_id = ?", (user_id,)
            ).fetchone()
        if row is None:
            raise LookupError("Preferences are not initialized")
        return UserPreferences(
            user_id=int(row["user_id"]),
            library_root=str(row["library_root"]),
            active_character_id=str(row["active_character_id"]),
            active_phase_id=str(row["active_phase_id"]),
            tone_id=str(row["tone_id"]),
            theme_id=str(row["theme_id"]),
            background_id=str(row["background_id"]),
            frame_id=str(row["frame_id"]),
            provider_model=str(row["provider_model"]),
            temperature=float(row["temperature"]),
            target_tokens=int(row["target_tokens"]),
            max_tokens=int(row["max_tokens"]),
        )

    def update(self, user_id: int, **changes: object) -> UserPreferences:
        allowed = {
            "library_root",
            "active_character_id",
            "active_phase_id",
            "tone_id",
            "theme_id",
            "background_id",
            "frame_id",
            "provider_model",
            "temperature",
            "target_tokens",
            "max_tokens",
        }
        filtered = {key: value for key, value in changes.items() if key in allowed and value is not None}
        if filtered:
            assignments = ", ".join(f"{key} = ?" for key in filtered)
            values = [*filtered.values(), user_id]
            with self._database.connect() as db:
                db.execute(f"UPDATE user_preferences SET {assignments} WHERE user_id = ?", values)
        return self.get(user_id)


class ChatRepository:
    def __init__(self, database: Database) -> None:
        self._database = database

    def create(
        self,
        user_id: int,
        title: str,
        character_id: str,
        phase_id: str,
        scenario_id: str,
        scenario: dict[str, object],
        tone_id: str,
    ) -> dict[str, object]:
        chat_id = uuid4().hex
        now = _now_iso()
        with self._database.connect() as db:
            db.execute(
                """
                INSERT INTO chats(
                    id, user_id, title, character_id, phase_id, scenario_id, scenario_json,
                    tone_id, created_at, updated_at
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                (
                    chat_id, user_id, title, character_id, phase_id, scenario_id,
                    json.dumps(scenario, ensure_ascii=False), tone_id, now, now,
                ),
            )
        return self.get_summary(user_id, chat_id)

    def list_chats(self, user_id: int, limit: int = 30) -> list[dict[str, object]]:
        with self._database.connect() as db:
            rows = db.execute(
                """
                SELECT id, title, character_id, phase_id, scenario_id, scenario_json, tone_id, created_at, updated_at
                FROM chats WHERE user_id = ? ORDER BY updated_at DESC LIMIT ?
                """,
                (user_id, limit),
            ).fetchall()
        return [self._summary_row(row) for row in rows]

    def get_summary(self, user_id: int, chat_id: str) -> dict[str, object]:
        with self._database.connect() as db:
            row = db.execute(
                """
                SELECT id, title, character_id, phase_id, scenario_id, scenario_json, tone_id, created_at, updated_at
                FROM chats WHERE id = ? AND user_id = ?
                """,
                (chat_id, user_id),
            ).fetchone()
        if row is None:
            raise LookupError("Chat not found")
        return self._summary_row(row)

    def get_messages(self, user_id: int, chat_id: str, limit: int | None = None) -> list[dict[str, object]]:
        self.get_summary(user_id, chat_id)
        query = "SELECT id, role, content, created_at FROM messages WHERE chat_id = ? ORDER BY id"
        params: tuple[object, ...] = (chat_id,)
        if limit is not None:
            query = """
                SELECT id, role, content, created_at FROM (
                    SELECT id, role, content, created_at FROM messages
                    WHERE chat_id = ? ORDER BY id DESC LIMIT ?
                ) ORDER BY id
            """
            params = (chat_id, limit)
        with self._database.connect() as db:
            rows = db.execute(query, params).fetchall()
        return [
            {
                "id": int(row["id"]),
                "role": str(row["role"]),
                "content": str(row["content"]),
                "created_at": _parse_datetime(str(row["created_at"])),
            }
            for row in rows
        ]

    def add_message(self, user_id: int, chat_id: str, role: str, content: str) -> dict[str, object]:
        self.get_summary(user_id, chat_id)
        now = _now_iso()
        with self._database.connect() as db:
            cursor = db.execute(
                "INSERT INTO messages(chat_id, role, content, created_at) VALUES (?, ?, ?, ?)",
                (chat_id, role, content, now),
            )
            db.execute("UPDATE chats SET updated_at = ? WHERE id = ?", (now, chat_id))
            message_id = int(cursor.lastrowid)
        return {
            "id": message_id,
            "role": role,
            "content": content,
            "created_at": _parse_datetime(now),
        }

    @staticmethod
    def _summary_row(row) -> dict[str, object]:
        raw_scenario = str(row["scenario_json"] or "")
        try:
            scenario = json.loads(raw_scenario) if raw_scenario else None
        except json.JSONDecodeError:
            scenario = None
        if not isinstance(scenario, dict):
            scenario = None
        return {
            "id": str(row["id"]),
            "title": str(row["title"]),
            "character_id": str(row["character_id"]),
            "phase_id": str(row["phase_id"]),
            "scenario_id": str(row["scenario_id"] or ""),
            "scenario_name": str(scenario.get("name") or "Open scene") if scenario else "Open scene",
            "scenario": scenario,
            "tone_id": str(row["tone_id"]),
            "created_at": _parse_datetime(str(row["created_at"])),
            "updated_at": _parse_datetime(str(row["updated_at"])),
        }
