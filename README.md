# Concept Explorer

An interactive, web app that lets you input any term, receive a concise explanation, and explore related topics via clickable options. Built with a Vite & React frontend and an Express backend using Google AI Studio’s Gemini models.


## Features

- **Term lookup**: Enter any keyword or phrase and get a 2–3 sentence summary.
- **Drill-down**: Click related-topic pills to fetch new explanations and deeper topics.
- **Clean UI**: Lightweight React components with loading states and error handling.
- **Secure API**: Backend proxies all AI requests, keeping your API key hidden.
- **JSON-driven parsing**: Backend returns `{ explanation, related: string[] }` for easy front-end consumption.


## Prerequisites

- **Node.js** v16+ & npm or pnpm  
- A **Google AI Studio** API key (Gemini model access)  



## Setup & Installation

- **Clone the repo**  

Backend: cd backend, pnpm install, create .env with GEMINI_API_KEY
Frontend: cd frontend, pnpm install

Running Locally
Backend: cd backend, pnpm run dev
Starts the Express server on http://localhost:3000/.

Frontend: cd frontend, pnpm run dev
Starts Vite on http://localhost:5173/