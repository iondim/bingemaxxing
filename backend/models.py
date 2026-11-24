from pydantic import BaseModel
from enum import Enum 

class CategoryEnum(str, Enum):
    opt1 = "Book"
    opt2 = "Movie"
    opt3 = "Series"

class ItemCreate(BaseModel):
    title: str 
    category: str
    rating: int | None = None 
    status: str="pending"