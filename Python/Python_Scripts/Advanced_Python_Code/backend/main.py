from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

people = [
    ["Alice", "Smith"],
    ["Bob", "Johnson"],
    ["Charlie", "Williams"],
    ["Diana", "Brown"],
    ["Eve", "Jones"]
]

def get_from_index_with_id(person_id: int, people):
    if person_id < 0 or person_id >= len(people):
        raise HTTPException(status_code=400, detail="Invalid id")
    name, surname = people[person_id]
    return name, surname

@app.get("/")
def read_root(id: int = 0):
    name, surname = get_from_index_with_id(id, people)
    return {"Nome": name, "Cognome": surname, "id": id}