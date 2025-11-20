# 🚀 Quick Start Guide - Career Advisor

## Fastest Way to Get Started (15 minutes)

### Step 1: Install Prerequisites (5 min)

**Install Node.js:**
- Download from: https://nodejs.org/ (get LTS version)
- Install and restart terminal

**Install VS Code:**
- Download from: https://code.visualstudio.com/

**Install Deno:**
- Windows: Open PowerShell as Admin
  ```powershell
  irm https://deno.land/install.ps1 | iex
  ```
- Mac: Open Terminal
  ```bash
  curl -fsSL https://deno.land/install.sh | sh
  ```

---

### Step 2: Set Up Supabase (5 min)

1. Go to https://supabase.com/
2. Sign up (use GitHub for faster signup)
3. Click "New Project"
   - Name: `career-advisor`
   - Password: Create a strong password (save it!)
   - Region: Select closest to you
4. Wait 2 minutes for project to initialize
5. Once ready, go to **Settings** → **API**
6. **Copy these 3 values** (keep this tab open):
   - Project URL
   - `anon` key
   - `service_role` key

---

### Step 3: Create Local Project (2 min)

```bash
# Create and enter project folder
mkdir career-advisor
cd career-advisor

# Open VS Code
code .
```

In VS Code terminal (Terminal → New Terminal):

```bash
# Create Vite React project
npm create vite@latest . -- --template react-ts

# Press 'y' when asked to proceed
```

---

### Step 4: Install Dependencies (2 min)

```bash
npm install
npm install @supabase/supabase-js motion lucide-react recharts react-hook-form@7.55.0 sonner@2.0.3
npm install -D tailwindcss@next @tailwindcss/vite@next
```

---

### Step 5: Download Project Files (1 min)

You need to get all the application files from Figma Make. Here's what you need:

**Create this folder structure:**
```
src/
├── components/
│   ├── ui/
│   ├── AuthForm.tsx
│   ├── ProfileForm.tsx
│   ├── RecommendationsList.tsx
│   └── Header.tsx
├── contexts/
│   └── AuthContext.tsx
├── types/
│   └── index.ts
├── utils/
│   └── supabase/
│       └── info.tsx
├── styles/
│   └── globals.css
├── App.tsx
└── main.tsx

supabase/
└── functions/
    └── server/
        └── index.tsx
```

**I'll provide these files - you can:**
1. Copy them from the Figma Make project, OR
2. I can share them via GitHub, OR
3. I can provide each file content below

Which method would you prefer?

---

### Step 6: Configure Environment (1 min)

Create `.env.local` in root folder:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Replace with YOUR values from Step 2!**

---

### Step 7: Set Up Database (2 min)

1. Go to Supabase Dashboard
2. Click **SQL Editor** → **New Query**
3. Paste this:

```sql
CREATE TABLE IF NOT EXISTS kv_store_0c4b0f7b (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE kv_store_0c4b0f7b ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role can do everything"
ON kv_store_0c4b0f7b FOR ALL TO service_role
USING (true) WITH CHECK (true);
```

4. Click **RUN**

---

### Step 8: Deploy Backend Function (2 min)

**Install Supabase CLI:**

Windows (PowerShell):
```powershell
npm install -g supabase
```

Mac:
```bash
brew install supabase/tap/supabase
```

**Deploy function:**
```bash
# Login
supabase login

# Link project (use the xxxxx from https://xxxxx.supabase.co)
supabase link --project-ref xxxxx

# Deploy
supabase functions deploy make-server-0c4b0f7b

# Set secrets
supabase secrets set SUPABASE_URL=https://xxxxx.supabase.co
supabase secrets set SUPABASE_ANON_KEY=your_anon_key
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

### Step 9: Run the App! 🎉

```bash
npm run dev
```

Open http://localhost:5173/

---

## ✅ Testing

1. Click "Sign up"
2. Create account:
   - Name: John Doe
   - Email: john@example.com  
   - Password: test123
3. Add profile:
   - Skills: JavaScript, React, Python
   - Interests: Technology, Web Development
   - Education: Bachelor's
   - Experience: 3-5 years
4. Click "Save & Get Recommendations"
5. See your personalized career matches! 🎊

---

## 🐛 Common Issues

**"Cannot connect to Supabase"**
→ Check `.env.local` has correct values

**"Function not found"**
→ Run: `supabase functions deploy make-server-0c4b0f7b`

**"Module not found"**
→ Run: `npm install`

**Styles not working**
→ Check `src/main.tsx` imports `./styles/globals.css`

---

## 📁 Need the Files?

I can provide all the source code files. Would you like me to:

1. **Create a ZIP file** with all files
2. **Push to GitHub** repository
3. **Paste each file** in the chat for you to copy

Let me know which you prefer!

---

## 🎯 You're Done!

If everything works, you should see:
- ✅ Beautiful gradient login page
- ✅ Smooth animations
- ✅ Working signup/login
- ✅ Profile form with tags
- ✅ Career recommendations

**Enjoy your Career Advisor app!** 🚀
