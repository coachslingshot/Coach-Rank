# 10-Question Survey Implementation Guide

## Overview

Your player survey has been redesigned with **10 detailed questions** grouped into **5 categories**:

1. **Culture & Belonging** (Q1-2)
2. **Trust & Relationships** (Q3-4)
3. **Development & Purpose** (Q5-6)
4. **Day-to-Day Experience** (Q7-8)
5. **Overall Experience** (Q9)
6. **Future Choice Signal** (Q10)

Players can skip any question they're not comfortable answering.

---

## Files Changed

### **New Files Created:**

- **`scripts/add_survey_questions.sql`** - Database migration to add 10 question columns
- **`lib/survey-questions.ts`** - TypeScript definitions and category structure

### **Modified Files:**

- **`app/survey/page.tsx`** - Redesigned survey UI with sliders and categories
- **`app/api/ratings/submit/route.ts`** - Updated to accept and store 10 responses
- **`types/database.ts`** - Added question columns to type definitions

---

## Deployment Steps

### **Step 1: Run Database Migration**

1. Open **Supabase Dashboard** → Navigate to SQL Editor
2. Open the file: `scripts/add_survey_questions.sql`
3. Copy the entire SQL script
4. Paste into Supabase SQL Editor
5. Click **"Run"**

This adds 10 new columns to the `player_ratings` table:
- `q1_belonging` through `q10_choose_again`
- All columns accept values 0-10 or NULL (optional)

### **Step 2: Deploy Code Changes**

All code files are ready. Deploy using your preferred method:

**Option A: GitHub Desktop**
1. Open GitHub Desktop
2. Add repository if needed (see previous instructions)
3. Commit with message: "Implement 10-question categorized survey"
4. Push to GitHub

**Option B: Direct on GitHub.com**
- Edits can be made directly on GitHub
- Netlify will auto-deploy

### **Step 3: Test the Survey**

1. Go to `/dashboard/survey-invitations`
2. Generate a test invitation
3. Open the survey link
4. Verify all 10 questions display correctly
5. Test sliding scales (0-10) with color feedback
6. Submit and check database

---

## Survey Question Categories

### **Culture & Belonging**
- Q1: Sense of belonging in program culture
- Q2: Positive locker room environment

### **Trust & Relationships**
- Q3: Trust in coach's best interests
- Q4: Comfort communicating honestly

### **Development & Purpose**
- Q5: Player development (technique, IQ)
- Q6: Personal growth (character, life skills)

### **Day-to-Day Experience**
- Q7: Daily enjoyment at practice
- Q8: Work/fun balance

### **Overall Experience**
- Q9: Overall experience rating

### **Future Choice Signal**
- Q10: Likelihood to choose again

---

## How It Works

### **Survey Flow:**

1. Player receives invitation link with token
2. Opens survey → Coach pre-selected (if specified in invitation)
3. Sees all 10 questions grouped by category
4. Slides each question from 0-10 (or skips)
5. Color-coded feedback: Red (0-3), Yellow (4-6), Green (7-10)
6. Star visualization shows current rating
7. Optional text feedback at end
8. Submits → All responses saved individually

### **Data Storage:**

- **Individual questions**: Saved in columns `q1_belonging` through `q10_choose_again`
- **Overall rating**: Calculated as average of answered questions
- **Backward compatibility**: Existing `rating` column still populated for coach profiles

### **Coach Profiles:**

The existing `avg_player_rating` will automatically update based on the overall average of all answered questions.

**Future enhancement**: Display category breakdowns on coach profiles (e.g., "Culture: 8.2/10, Development: 8.5/10")

---

## Example Survey Flow

```
Player opens link: /survey?token=survey_abc123...

┌─────────────────────────────────────┐
│ RATE YOUR COACH                      │
│ Anonymous player survey              │
│ 5 of 10 questions answered           │
├──────────────────────────            ─────┤

│ Culture & Belonging                 │
│ ─────────────────────────────────── │
│ Q1: How strongly did you feel...    │
│ [====●════] 7/10                    │
│ ★★★★★★★☆☆☆                         │
│                                      │
│ Q2: Positive locker room...          │
│ [=======●═] 8/10                    │
│ ★★★★★★★★☆☆                         │
├─────────────────────────────────────┤

│ Trust & Relationships                │
│ ─────────────────────────────────── │
│ Q3: Trust in coach...                │
│ [SKIP] (not answered)                │
│                                      │
│ Q4: Comfort communicating...         │
│ [======●══] 7/10                    │
│ ★★★★★★★☆☆☆                         │
└─────────────────────────────────────┘

[Submit Anonymous Feedback (5 questions answered)]
```

---

## Privacy & Security

✅ **Anonymous**: No identifying information collected  
✅ **Invitation-only**: Requires unique token  
✅ **Single-use**: Token marked as used after submission  
✅ **Optional questions**: Players can skip uncomfortable questions  
✅ **Secure**: Token validation on every submission  

---

## Next Steps After Deployment

### **Immediate:**
1. Run database migration (Step 1 above)
2. Deploy code changes (Step 2 above)
3. Test with admin account

### **Future Enhancements:**
1. **Coach Profile Analytics**: Show category breakdowns
   - "Culture & Belonging: 8.2/10"
   - "Trust & Relationships: 7.9/10"
   - "Player Development: 8.5/10"
   - etc.

2. **Invite Bulk Upload**: Import emails via CSV

3. **Email Integration**: Automated survey invitations

4. **Admin Dashboard**: View question-by-question analytics

---

## Troubleshooting

**Q: Survey not loading?**
- Check token is valid in URL
- Verify token not expired (30 days)
- Check token not already used

**Q: Database error on submission?**
- Ensure migration ran successfully
- Verify all 10 columns exist in `player_ratings` table

**Q: Questions not displaying?**
- Clear browser cache
- Check `lib/survey-questions.ts` loaded correctly

**Q: Average rating not calculating?**
- At least one question must be answered
- Check API logs in Netlify

---

## Summary

✨ **Ready to deploy!** All code is complete and ready for production.

The survey is now much more comprehensive, providing detailed insights into coaching across multiple dimensions while maintaining player privacy and preventing unauthorized submissions.
