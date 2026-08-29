#!/usr/bin/env python3
"""Serve source files from the project root and static assets from public/."""

from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import unquote, urlsplit
import argparse

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"


class ProjectHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path: str) -> str:
        request_path = unquote(urlsplit(path).path).lstrip("/")
        public_candidate = (PUBLIC / request_path).resolve()
        if public_candidate.is_relative_to(PUBLIC) and public_candidate.exists():
            return str(public_candidate)
        root_candidate = (ROOT / request_path).resolve()
        if root_candidate.is_relative_to(ROOT):
            return str(root_candidate)
        return str(ROOT)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("port", nargs="?", type=int, default=8080)
    args = parser.parse_args()
    server = ThreadingHTTPServer(("127.0.0.1", args.port), ProjectHandler)
    print(f"Serving {ROOT} at http://127.0.0.1:{args.port}/")
    server.serve_forever()
