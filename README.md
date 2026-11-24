# Bingemaxxing

Full-stack media tracker for organizing movies, series, and books with status and optional ratings.

## Tech Stack
- Frontend: React, Vite, CSS
- Backend: FastAPI, Uvicorn, Pydantic
- Database: SQLite

## Running Locally

### Backend
cd backend
python3 -m uvicorn main:app --reload

### Frontend
cd frontend
npm install
npm run dev

## Current Status & Next Steps
- Add and list items with title, category, status, and optional `/5` rating
- Upcoming: status filters (`All`, `Pending`, `Completed`), delete button, and UI polish
