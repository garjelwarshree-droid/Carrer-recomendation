# 🎓 Career Advisor - Complete VS Code Setup Guide

## 📚 Table of Contents
1. [Prerequisites Installation](#prerequisites)
2. [Supabase Setup](#supabase-setup)
3. [Local Project Setup](#local-project-setup)
4. [File Structure & Code](#file-structure)
5. [Configuration](#configuration)
6. [Running the App](#running)
7. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### 1. Install Required Software

| Software | Download Link | Purpose |
|----------|---------------|---------|
| **Node.js** (v20+) | https://nodejs.org/ | JavaScript runtime |
| **VS Code** | https://code.visualstudio.com/ | Code editor |
| **Git** | https://git-scm.com/ | Version control |
| **Deno** | See commands below | Edge function runtime |

**Install Deno:**

Windows (PowerShell as Admin):
```powershell
irm https://deno.land/install.ps1 | iex
```

Mac/Linux:
```bash
curl -fsSL https://deno.land/install.sh | sh
```

**Verify installations:**
```bash
node --version    # Should show v20.x.x or higher
npm --version     # Should show 10.x.x or higher
git --version     # Should show version
deno --version    # Should show deno 1.x.x
```

---

## Supabase Setup

### 2. Create Supabase Project

1. **Sign up**: Go to https://supabase.com/ and create account
2. **New Project**: Click "New Project"
   - Name: `career-advisor`
   - Database Password: (create and SAVE it)
   - Region: Choose closest to you
3. **Wait**: Project initialization takes ~2 minutes

### 3. Get API Credentials

Once project is ready:

1. Click on **Settings** (gear icon at bottom left)
2. Navigate to **API** section
3. **COPY THESE VALUES** (you'll need them multiple times):

```
✅ Project URL: https://xxxxxxxxxxxxx.supabase.co
✅ anon/public key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
✅ service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**💡 TIP:** Keep this browser tab open for easy copy-paste later!

### 4. Create Database Table

1. Go to **SQL Editor** in Supabase dashboard
2. Click **New Query**
3. Copy and paste this SQL:

```sql
-- Create the key-value store table
CREATE TABLE IF NOT EXISTS kv_store_0c4b0f7b (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE kv_store_0c4b0f7b ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "Service role can do everything"
ON kv_store_0c4b0f7b
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
```

4. Click **RUN** button (or press F5)
5. You should see "Success. No rows returned"

---

## Local Project Setup

### 5. Create Project Directory

**Open Terminal/PowerShell:**

```bash
# Create project folder
mkdir career-advisor
cd career-advisor

# Open in VS Code
code .
```

### 6. Initialize Vite Project

**In VS Code, open terminal** (Terminal → New Terminal or Ctrl+`):

```bash
# Create React + TypeScript project
npm create vite@latest . -- --template react-ts

# When asked "Current directory is not empty. Remove existing files and continue? (y/N)"
# Type: y and press Enter
```

### 7. Install Dependencies

```bash
# Install base dependencies
npm install

# Install application dependencies
npm install @supabase/supabase-js motion lucide-react recharts

# Install specific versions
npm install react-hook-form@7.55.0 sonner@2.0.3

# Install Tailwind CSS v4
npm install -D tailwindcss@next @tailwindcss/vite@next
```

**This will take 2-3 minutes. Wait for completion!**

### 8. Create Folder Structure

**Windows (PowerShell):**
```powershell
New-Item -ItemType Directory -Force -Path src/components/ui
New-Item -ItemType Directory -Force -Path src/contexts
New-Item -ItemType Directory -Force -Path src/types  
New-Item -ItemType Directory -Force -Path src/utils/supabase
New-Item -ItemType Directory -Force -Path src/styles
New-Item -ItemType Directory -Force -Path src/lib
New-Item -ItemType Directory -Force -Path supabase/functions/server
```

**Mac/Linux:**
```bash
mkdir -p src/components/ui src/contexts src/types src/utils/supabase src/styles src/lib supabase/functions/server
```

---

## File Structure

### 9. Your Project Should Look Like This

```
career-advisor/
├── node_modules/
├── public/
├── src/
│   ├── components/
│   │   ├── ui/              ← shadcn components go here
│   │   ├── AuthForm.tsx
│   │   ├── Header.tsx
│   │   ├── ProfileForm.tsx
│   │   └── RecommendationsList.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── lib/
│   │   └── utils.ts         ← For shadcn utilities
│   ├── styles/
│   │   └── globals.css
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── supabase/
│   │       └── info.tsx
│   ├── App.tsx
│   └── main.tsx
├── supabase/
│   ├── functions/
│   │   └── server/
│   │       └── index.tsx
│   └── .env                 ← Backend environment file
├── .env.local               ← Frontend environment file
├── .gitignore
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### 10. Get Application Code Files

You have **3 options** to get the source code:

#### Option A: Download from Figma Make (Easiest)
Since you already have the code in Figma Make, you can export/download all files from there.

#### Option B: I'll Provide Each File
I can paste the content of each file here in the chat for you to copy. Would you like me to do that?

#### Option C: GitHub Repository
I can help you create a GitHub repo with all the code.

**Which option would you prefer?** Let me know and I'll help you get all the files!

---

## Configuration

### 11. Update vite.config.ts

Replace content with:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
})
```

### 12. Create Environment Files

**Create `.env.local`** in root folder:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Create `supabase/.env`**:

```env
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**⚠️ IMPORTANT:** Replace with YOUR actual values from Step 3!

### 13. Update .gitignore

Add these lines to `.gitignore`:

```
# Environment variables
.env
.env.local
supabase/.env

# Supabase
.supabase/
```

---

## Install UI Components

### 14. Install shadcn/ui Components

```bash
# Initialize shadcn
npx shadcn@latest init

# Answer the prompts:
# - TypeScript? Yes
# - Style: Default  
# - Base color: Slate
# - CSS variables: Yes
# - Tailwind config location: Keep default
# - Components location: src/components/ui
# - Utils location: src/lib/utils
# - React Server Components: No
# - Write configuration: Yes

# Install required components
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add select
npx shadcn@latest add alert
npx shadcn@latest add badge
npx shadcn@latest add progress
```

---

## Deploy Backend

### 15. Install Supabase CLI

**Windows:**
```powershell
npm install -g supabase
```

**Mac:**
```bash
brew install supabase/tap/supabase
```

**Linux:**
```bash
npm install -g supabase
```

### 16. Link and Deploy

```bash
# Login to Supabase
supabase login

# Link your project
# Get project-ref from your URL: https://xxxxx.supabase.co (the xxxxx part)
supabase link --project-ref xxxxx

# Deploy edge function
supabase functions deploy make-server-0c4b0f7b

# Set environment secrets for the function
supabase secrets set SUPABASE_URL=https://xxxxx.supabase.co
supabase secrets set SUPABASE_ANON_KEY=your_anon_key_here
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

---

## Running

### 17. Start Development Server

```bash
# Start the app
npm run dev
```

You should see:
```
  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

### 18. Open in Browser

- Browser should open automatically
- Or manually go to: http://localhost:5173/
- You should see the beautiful login page with gradient background!

### 19. Test the Application

**Create an account:**
1. Click "Don't have an account? Sign up"
2. Fill in:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
3. Click "Sign Up"

**Complete your profile:**
1. Add skills: JavaScript, React, TypeScript (press Enter after each)
2. Add interests: Technology, Web Development
3. Education: Bachelor's Degree
4. Experience: 3-5 years
5. Click "Save & Get Recommendations"

**View recommendations:**
- You should see personalized career matches!
- Each card shows match percentage, salary, growth rate
- Your matching skills and interests are highlighted

---

## Troubleshooting

### Common Issues & Solutions

#### ❌ "Cannot find module '@supabase/supabase-js'"
```bash
npm install @supabase/supabase-js
```

#### ❌ "Failed to fetch" or "Network Error"
- Check `.env.local` has correct Supabase URL and key
- Verify your Supabase project is active (green status)
- Check browser console (F12) for detailed error

#### ❌ "Edge function not found" or 404 error
```bash
supabase functions deploy make-server-0c4b0f7b
```

#### ❌ "Unauthorized" errors
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set correctly
- Check function secrets: `supabase secrets list`

#### ❌ Tailwind styles not working
- Ensure `src/main.tsx` imports `./styles/globals.css`
- Restart dev server: Ctrl+C, then `npm run dev`

#### ❌ TypeScript errors
```bash
npm install -D @types/node
```

### Debug Commands

```bash
# View function logs
supabase functions logs make-server-0c4b0f7b

# Check function status
supabase functions list

# Test function locally (advanced)
supabase functions serve make-server-0c4b0f7b

# Check environment variables
supabase secrets list
```

---

## Next Steps

### Once Everything Works:

1. **Customize Career Data**
   - Edit `supabase/functions/server/index.tsx`
   - Add more careers to `CAREER_DATABASE`
   - Adjust matching algorithm weights

2. **Add Features**
   - Export recommendations as PDF
   - Save favorite careers
   - Add career comparison tool
   - Implement resume upload

3. **Deploy to Production**
   - Build: `npm run build`
   - Deploy to: Vercel, Netlify, or Cloudflare Pages
   - Your backend is already deployed on Supabase!

---

## 📝 Checklist

Before asking for help, verify:

- [ ] Node.js v20+ installed
- [ ] All npm packages installed (`npm install` completed)
- [ ] Supabase project created and active
- [ ] Database table created (SQL executed successfully)
- [ ] `.env.local` file exists with correct values
- [ ] shadcn components installed
- [ ] Edge function deployed successfully
- [ ] Environment secrets set in Supabase
- [ ] Dev server running (`npm run dev`)
- [ ] No errors in terminal
- [ ] No errors in browser console (F12)

---

## 🎉 Success!

If you can:
- ✅ See the login page
- ✅ Create an account
- ✅ Complete your profile
- ✅ View career recommendations

**Congratulations! Your Career Advisor is fully functional!** 🚀

---

## 📧 Need the Code Files?

The application code files can be obtained in 3 ways:

1. **Export from Figma Make** - Download all files from your current project
2. **I'll provide each file** - I can paste all code files in the chat
3. **GitHub repository** - I can help you set up a repo

**Which method works best for you?** Let me know and I'll help you get started!

---

## 💡 Pro Tips

- Install VS Code extension: "Tailwind CSS IntelliSense"
- Use VS Code's built-in terminal (Ctrl+`)
- Keep Supabase dashboard open in a browser tab
- Check browser console (F12) for frontend errors
- Check `supabase functions logs` for backend errors
- Never commit `.env` files to git!

---

**Happy coding! 🎊**
