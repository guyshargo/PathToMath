# 📚 Path2Math 🎲

**Path2Math** is a fun and interactive educational web app designed to help elementary school students (grades 1–6) improve their math skills through gamified learning, video tutorials, and personalized feedback.

---

## 🌐 Live Demo

🔗 [https://path-to-math.vercel.app](https://path-to-math.vercel.app)

---

## 🗂 Project Structure

```
📦PathToMath
 ┣ 📂.idea            # IDE configuration files
 ┣ 📂api              # Backend source folder
 ┃ ┣ 📂models         # Mongoose schemas defining database models
 ┃ ┣ 📂routes         # Express route handlers for API endpoints
 ┃ ┣ 📜index.js       # Backend server entry point
 ┃ ┣ 📜.env           # Environment variables configuration
 ┃ ┗ 📜package.json   # Backend dependencies
 ┣ 📂Frontend         # Frontend source folder
 ┃ ┣ 📂public         # Static public assets
 ┃ ┣ 📂src            # Application source code
 ┃ ┃ ┣ 📂assets       # Images, sounds, icons used in the frontend
 ┃ ┃ ┣ 📂components   # Reusable UI components
 ┃ ┃ ┃ ┣ 📂footer     # Footer component
 ┃ ┃ ┃ ┣ 📂header     # Header component
 ┃ ┃ ┃ ┣ 📂Main       # Main pages, games and games logic 
 ┃ ┃ ┃ ┗ 📂Utils      # Utility components and functions
 ┃ ┃ ┣ 📂services     # Frontend API call logic, services to backend
 ┃ ┃ ┣ 📜App.css      # Main stylesheet for React app
 ┃ ┃ ┣ 📜App.jsx      # Root React component for the app
 ┃ ┃ ┣ 📜index.css    # Global CSS styles
 ┃ ┃ ┗ 📜main.jsx     # React app entry point
 ┃ ┗ 📜package.json   # Frontend dependencies
 ┗ 📜vercel.json      # Configuration for Vercel deployment platform
```

```
PathToMath/
├── api/   # Backend – Node.js, Express, MongoDB
└── Frontend/    # Frontend – React, Vite, Tailwind CSS
```

---

## 🚀 Running Locally

### Backend

```bash
cd api
npm install
node index.js
```

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

## 🧰 Tech Stack

* **Frontend**: React, Vite, Tailwind CSS
* **Backend**: Node.js, Express
* **Database**: MongoDB Atlas
* **AI Services**: Gemini API (Google)
* **Video Content**: YouTube API
* **Multiplayer**: PeerJS (Peer-to-Peer)

---

## 👥 Contributors

* Guy Shargorodsky
* Omri Spitzer
* Stav Avraham
* Yarden Nahum
* Adan Ibrahim
* Shereen Owida
