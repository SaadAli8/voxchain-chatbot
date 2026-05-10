# VoxChain Chatbot

VoxChain Chatbot is a full-stack chatbot application with a FastAPI backend and a React frontend. The backend handles authentication, content ingestion, document vectorization, and query routes. The frontend provides the chat UI and user-facing workflows.

## Project Structure

```text
VoxChain-Chatbot/
├── FastApi/      # FastAPI backend
└── voxchain/     # React frontend
```

## Requirements

- Python 3.10+
- Node.js 18+
- npm
- Supabase project credentials
- OpenAI API key

## Environment Variables

Create a backend environment file:

```bash
cp FastApi/.env.example FastApi/.env
```

Then fill in:

```env
SUPABASE_URL=
SUPABASE_KEY=
DB_DATABASE_URL=
OPENAI_API_KEY=
```

Create a frontend environment file when you need a custom API URL:

```bash
cp voxchain/.env.example voxchain/.env
```

Default frontend API URL:

```env
REACT_APP_API_BASE_URL=http://127.0.0.1:8000
```

Never commit real `.env` files. They are ignored by Git.

## Backend Setup

```bash
cd FastApi
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

The API runs at:

```text
http://127.0.0.1:8000
```

FastAPI docs are available at:

```text
http://127.0.0.1:8000/docs
```

## Frontend Setup

Open a second terminal:

```bash
cd voxchain
npm install
npm start
```

The React app runs at:

```text
http://localhost:3000
```

## Security Notes

- Real credentials must stay in local `.env` files only.
- The backend no longer prints the OpenAI API key at startup.
- Python cache files, virtual environments, build output, logs, and Node dependencies are ignored.
- If any real key was ever committed or shared, rotate it before publishing the repository.

## Recommended Repository Name

Use:

```text
voxchain-chatbot
```

## First Push To GitHub

Because this project contains both backend and frontend code, the recommended GitHub repository root is `VoxChain-Chatbot`, not only the `voxchain` frontend folder.

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/voxchain-chatbot.git
git push -u origin main
```

