# Career Advisor - Local Setup Guide

## 📋 Complete Step-by-Step Setup Instructions

### Part 1: Install Prerequisites

#### 1. Install Node.js
- Visit: https://nodejs.org/
- Download: LTS version (20.x or higher)
- Install and verify:
```bash
node --version
npm --version
```

#### 2. Install VS Code
- Visit: https://code.visualstudio.com/
- Download and install
- Recommended extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense

#### 3. Install Git
- Visit: https://git-scm.com/
- Download and install

#### 4. Install Deno (for backend)
**Windows PowerShell:**
```powershell
irm https://deno.land/install.ps1 | iex
```

**Mac/Linux:**
```bash
curl -fsSL https://deno.land/install.sh | sh
```

---

### Part 2: Create Supabase Project

#### 5. Set Up Supabase Account
1. Go to https://supabase.com/
2. Click "Start your project"
3. Sign up with GitHub or email
4. Create a new project:
   - Project name: `career-advisor`
   - Database password: (save this securely)
   - Region: Choose closest to you
5. Wait for project to be created (~2 minutes)

#### 6. Get Supabase Credentials
Once project is ready:
1. Go to Project Settings (gear icon)
2. Click on "API"
3. Copy these values:
   - **Project URL** (looks like: https://xxxxx.supabase.co)
   - **anon/public key** (starts with: eyJhbGc...)
   - **service_role key** (also starts with: eyJhbGc...)

**IMPORTANT:** Keep these safe! You'll need them later.

---

### Part 3: Set Up Local Project

#### 7. Create Project Folder
```bash
# Create folder
mkdir career-advisor
cd career-advisor

# Open in VS Code
code .
```

#### 8. Initialize Vite Project
In VS Code terminal (Terminal → New Terminal):

```bash
# Initialize project
npm create vite@latest . -- --template react-ts

# When prompted, type 'y' to proceed
```

#### 9. Install All Dependencies
```bash
# Install base dependencies
npm install

# Install required packages
npm install @supabase/supabase-js motion lucide-react recharts react-hook-form@7.55.0 sonner@2.0.3

# Install Tailwind CSS v4
npm install -D tailwindcss@next @tailwindcss/vite@next
```

#### 10. Create Folder Structure
```bash
# Windows (PowerShell)
New-Item -ItemType Directory -Force -Path src/components/ui, src/contexts, src/types, src/utils/supabase, src/styles, supabase/functions/server

# Mac/Linux
mkdir -p src/components/ui src/contexts src/types src/utils/supabase src/styles supabase/functions/server
```

---

### Part 4: Configure Environment

#### 11. Create `.env.local` file
Create a file named `.env.local` in the root folder (same level as package.json):

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

Replace with YOUR actual values from Step 6.

#### 12. Create `.env` file for Supabase Functions
Create `supabase/.env`:

```env
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

**⚠️ NEVER commit .env files to git!**

#### 13. Update `.gitignore`
Add to `.gitignore`:
```
.env
.env.local
supabase/.env
```

---

### Part 5: Copy Application Files

You need to copy all the application files from Figma Make to your local project.

#### 14. Required Files to Copy

I'll provide you with a download link for all files. For now, here's the structure:

```
career-advisor/
├── src/
│   ├── components/
│   │   ├── ui/           (shadcn components - I'll provide these)
│   │   ├── AuthForm.tsx
│   │   ├── ProfileForm.tsx
│   │   ├── RecommendationsList.tsx
│   │   └── Header.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── supabase/
│   │       └── info.tsx
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── supabase/
│   └── functions/
│       └── server/
│           ├── index.tsx
│           └── kv_store.tsx
├── vite.config.ts
├── tailwind.config.js
├── .env.local
└── package.json
```

---

### Part 6: Install Supabase CLI

#### 15. Install Supabase CLI

**Windows (PowerShell as Admin):**
```powershell
scoop install supabase
# OR
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

Verify:
```bash
supabase --version
```

#### 16. Link to Your Supabase Project
```bash
# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# The project-ref is the 'xxxxx' part from your URL: https://xxxxx.supabase.co
```

---

### Part 7: Set Up Database

#### 17. Create KV Store Table

Go to Supabase Dashboard → SQL Editor → New Query:

```sql
-- Create the KV store table
CREATE TABLE IF NOT EXISTS kv_store_0c4b0f7b (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE kv_store_0c4b0f7b ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role access
CREATE POLICY "Service role can do everything"
ON kv_store_0c4b0f7b
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);
```

Click "Run" to execute.

---

### Part 8: Deploy Backend Functions

#### 18. Deploy Supabase Edge Function

```bash
# Deploy the function
supabase functions deploy make-server-0c4b0f7b

# Set environment secrets
supabase secrets set SUPABASE_URL=https://xxxxx.supabase.co
supabase secrets set SUPABASE_ANON_KEY=your_anon_key
supabase secrets set SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

### Part 9: Run the Application

#### 19. Start Development Server

```bash
# Start Vite dev server
npm run dev
```

You should see:
```
VITE v5.x.x  ready in xxx ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

#### 20. Open in Browser
- Open: http://localhost:5173/
- You should see the login page!

---

### Part 10: Test the Application

#### 21. Create Test Account
1. Click "Don't have an account? Sign up"
2. Enter:
   - Name: Test User
   - Email: test@example.com
   - Password: test123
3. Click "Sign Up"

#### 22. Complete Profile
1. Add skills: JavaScript, React, TypeScript
2. Add interests: Technology, Web Development
3. Select education: Bachelor's Degree
4. Select experience: 3-5 years
5. Click "Save & Get Recommendations"

#### 23. View Recommendations
You should see personalized career recommendations!

---

## 🐛 Troubleshooting

### Issue: "Cannot find module"
**Solution:**
```bash
npm install
npm run dev
```

### Issue: "Supabase connection failed"
**Solution:**
- Check `.env.local` has correct values
- Verify Supabase project is active
- Check API keys are correct

### Issue: "Edge function not found"
**Solution:**
```bash
supabase functions deploy make-server-0c4b0f7b
```

### Issue: "Database error"
**Solution:**
- Run the SQL query from Step 17 again
- Check RLS policies are enabled

### Issue: Tailwind styles not working
**Solution:**
- Check `globals.css` is imported in `main.tsx`
- Restart dev server: Ctrl+C, then `npm run dev`

---

## 📝 Quick Reference Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy Supabase function
supabase functions deploy make-server-0c4b0f7b

# View function logs
supabase functions logs make-server-0c4b0f7b

# Check Supabase status
supabase status
```

---

## 🎉 Success Checklist

- [ ] Node.js installed (v20+)
- [ ] VS Code installed
- [ ] Deno installed
- [ ] Supabase project created
- [ ] API keys obtained
- [ ] Project initialized with Vite
- [ ] All dependencies installed
- [ ] Environment variables set
- [ ] Database table created
- [ ] Edge function deployed
- [ ] Dev server running
- [ ] Can sign up new user
- [ ] Can complete profile
- [ ] Can view recommendations

---

## 🚀 Next Steps

Once everything is working:

1. **Customize the career database** - Edit `supabase/functions/server/index.tsx`
2. **Add more features** - Export recommendations, save favorites
3. **Improve matching** - Add more sophisticated algorithms
4. **Deploy to production** - Use Vercel, Netlify, or Supabase hosting

---

## 💡 Tips

- Use VS Code's built-in terminal (Terminal → New Terminal)
- Install "Tailwind CSS IntelliSense" extension for better autocomplete
- Check browser console (F12) for errors
- Check Supabase function logs for backend errors
- Keep your API keys secret - never commit to git

---

## 📧 Need Help?

If you encounter issues:
1. Check the error message carefully
2. Look in browser console (F12)
3. Check Supabase function logs
4. Verify environment variables are correct
5. Make sure all dependencies are installed

---

**Good luck! 🎉**
