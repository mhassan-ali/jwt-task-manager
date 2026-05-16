# ✅ Full Stack Task Manager App

A modern full-stack task management application built with:

- ⚛️ React (Vite + Tailwind CSS)
- 🚀 FastAPI
- 🗄️ SQLite + SQLAlchemy
- 🔐 JWT Authentication
- 🌙 Dark Mode Support

---

## 🔥 Features

✅ User Registration & Login (JWT Auth)  
✅ Protected Routes  
✅ Multi-user Task Isolation  
✅ Create / Update / Delete Tasks  
✅ Task Priority (Low / Medium / High)  
✅ Task Filtering  
✅ Created & Updated Timestamps  
✅ Dark Mode (Persistent)  
✅ Responsive UI  

---

## 🏗️ Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload

Backend runs at:
http://127.0.0.1:8000

##🎨 Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs at:
http://localhost:5173

##🔐 Authentication Flow
Register new user
Login
JWT token stored in localStorage
All task routes protected


##🌙 Dark Mode
Theme preference is saved in localStorage and persists across refresh.


##📁 Project Structure
backend/
frontend/

##📌 Future Improvements
✅ Deployment 
✅ Profile Page
✅ Search & Sorting
✅ Task Statistics

## 📸 Screenshots

### Login
![Login](./screenshots/login.png)

### Dashboard
![Dashboard](./screenshots/dashboard.png)

### Dark Mode
![Dark Mode](./screenshots/dark.png)


