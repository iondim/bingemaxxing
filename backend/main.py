from fastapi import FastAPI, HTTPException
from models import ItemCreate
from database import DatabaseManager 
from cors import setup_cors
from typing import Optional

app = FastAPI(title= "Bingemaxxing API")

setup_cors(app) 

db = DatabaseManager('bingemaxxing.db')

@app.get("/")
def home():
    return {"status": "Bingemaxxing API is live!"}

@app.post("/items")
def create_new_item(item: ItemCreate):
    new_id = db.add_item(item)

    return {"message": "Item successfully added! :)", "id": new_id}

@app.get("/items")
def read_all_items(category: Optional[str]=None):
    items = db.get_all_items(category=category)

    return items

@app.delete("/items/{item_id}")
def delete_existing_item(item_id: int):
    success = db.delete_item(item_id)
    if not success:
        raise HTTPException(status_code=404, detail="Item not found")
    return{"message": f"Item with id {item_id} succesfully deleted! :) )"}

@app.put("/items/{item_id}")
def update_existing_item(item_id: int, item: ItemCreate):
    success = db.update_item(item_id, item)
    if not success: 
        raise HTTPException(status_code=404, detail="Item not found")
    return {"message": f"Item with id {item_id} succesfully updated! :)"}