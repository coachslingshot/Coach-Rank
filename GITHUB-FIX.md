# GitHub Repository Fix Guide

## Problem
Package.json is missing from your GitHub repository, causing Netlify deployment failures.

## Diagnosis Steps

### Step 1: Check Your GitHub Repository
Go to: https://github.com/coachslingshot/Coach-Rank

### What You Might See:

#### Scenario A: Files at Repository Root
If you see:
```
package.json
app/
components/
supabase/
README.md
```

**Fix**: Netlify settings are wrong
- In Netlify: Site Settings → Build & Deploy → Build Settings
- Base directory: (leave blank)
- Publish directory: `.next`
- Build command: `npm run build`

---

#### Scenario B: Files in a Subfolder
If you see:
```
cobalt-oort/  (or another folder name)
  ├── package.json
  ├── app/
  └── components/
```

**Fix**: Set Netlify base directory
- In Netlify: Site Settings → Build & Deploy → Build Settings
- Base directory: `cobalt-oort` (or your folder name)
- Publish directory: `.next`
- Build command: `npm run build`

---

#### Scenario C: Repository Mostly Empty
If you only see:
```
README.md
(few or no other files)
```

**Fix**: Push your local files to GitHub

**Open Command Prompt** (search "cmd" in Windows) and run:

```cmd
cd C:\Users\marcw\.gemini\antigravity\playground\cobalt-oort

git init
git add .
git commit -m "Add complete Coach Rank application"
git remote add origin https://github.com/coachslingshot/Coach-Rank.git
git push -u origin main --force
```

Then redeploy on Netlify.

---

## Quick Reference

**Your local files are at:**
`C:\Users\marcw\.gemini\antigravity\playground\cobalt-oort\`

**Your GitHub repo is at:**
`https://github.com/coachslingshot/Coach-Rank`

**Check if local files exist:**
```cmd
cd C:\Users\marcw\.gemini\antigravity\playground\cobalt-oort
dir package.json
```

You should see `package.json` listed if files exist locally.
