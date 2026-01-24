# 🎯 Prompting Guide: How to Work Effectively with AI Coding Assistant

This guide is based on successful patterns from our development sessions. Follow these principles to get better, faster results.

---

## 📋 Table of Contents
1. [Core Principles](#core-principles)
2. [Request Structure](#request-structure)
3. [Iterative Development](#iterative-development)
4. [Feedback Patterns](#feedback-patterns)
5. [Common Pitfalls to Avoid](#common-pitfalls-to-avoid)
6. [Examples from Our Session](#examples-from-our-session)

---

## 🎯 Core Principles

### 1. **Be Specific and Actionable**
✅ **Good:** "Proceed with phase 1" or "Implement the milestone quiz system"
❌ **Bad:** "Do the roadmap thing" or "Make it better"

### 2. **Reference Existing Structure**
✅ **Good:** "Proceed with phase 1" (when phases are already defined)
❌ **Bad:** Starting from scratch when structure exists

### 3. **Provide Context When Needed**
✅ **Good:** "Ummm no? I want to have the game like structure that brilliant and duolingo have." (with images)
❌ **Bad:** "Change it" (without context)

### 4. **Iterate, Don't Redesign**
✅ **Good:** "Ok almost but study lesson button should show up regardless"
❌ **Bad:** "Redo everything"

---

## 📝 Request Structure

### Pattern 1: Phase-Based Development
```
"Proceed with phase [N]"
```
**When to use:** When you have a structured TODO list or phased approach.

**Example:**
- "Proceed with phase 1"
- "Ok good proceed with next phase"
- "Proceed with phase 3"

**Why it works:**
- AI knows exactly what to do
- Maintains context from previous phases
- Clear progression path

---

### Pattern 2: Feature Request with Context
```
"[Feature name] - [Specific requirement]"
```
**When to use:** When requesting a new feature or modification.

**Example:**
- "Okay now we work on the subjects/courses. I want you to update todo, progress and testing"
- "work on the subject it self and the lessons. I want you to update todo, progress and testing"

**Why it works:**
- Clear scope definition
- AI can update documentation automatically
- Sets expectations for what needs to be done

---

### Pattern 3: Feedback with Specific Changes
```
"[Current state] but [desired change]"
```
**When to use:** When something isn't quite right but you know what you want.

**Example:**
- "Ok almost but study lesson button should show up regardless so show it with locked lessons as well"
- "the filters are kinda unnecessary tbh just keep progress for now"

**Why it works:**
- Acknowledges what's working
- Clearly states what needs to change
- Provides specific direction

---

### Pattern 4: Visual Feedback
```
"[Issue] - [Attach images/examples]"
```
**When to use:** When visual design needs to match a reference.

**Example:**
- "Ummm no? I want to have the game like structure that brilliant and duolingo have." (with images)

**Why it works:**
- Visual references are clearer than descriptions
- AI can see exact design patterns
- Reduces back-and-forth

---

### Pattern 5: Completion Request
```
"Yes please do so just finish everything"
```
**When to use:** When you want all remaining tasks completed.

**Why it works:**
- Clear intent to complete all phases
- AI can prioritize and finish systematically
- Efficient for wrapping up features

---

## 🔄 Iterative Development

### The Iteration Cycle

1. **Initial Request**
   ```
   "Begin with phase 1"
   ```

2. **Review & Feedback**
   ```
   "uhh for some reason the page is completely empty"
   ```

3. **Fix & Continue**
   ```
   "Okay good working now proceed to phase 2"
   ```

4. **Refinement**
   ```
   "Proceed but the filters are kinda unnecessary tbh just keep progress for now"
   ```

5. **Completion**
   ```
   "Proceed" (for remaining phases)
   ```

### Key Principles:
- ✅ Start with phases/structured approach
- ✅ Provide immediate feedback on issues
- ✅ Refine as you go, don't wait until the end
- ✅ Use simple confirmations ("Proceed", "Ok good") to continue

---

## 💬 Feedback Patterns

### Pattern 1: Direct Issue Report
```
"[Issue description]"
```
**Example:**
- "uhh for some reason the page is completely empty"
- "I dont see any notification bell or anything?"

**Best practices:**
- Be specific about what's missing/wrong
- Include what you expected vs. what you see
- AI will investigate and fix

---

### Pattern 2: Clarification Request
```
"[Question about implementation]"
```
**Example:**
- "Also what exactly will phase 5 be concerned with?"

**Best practices:**
- Ask before implementation if unclear
- AI will explain and proceed accordingly
- Prevents rework

---

### Pattern 3: Scope Adjustment
```
"[Feature] should [behavior]"
```
**Example:**
- "Okay so: first of all subjects in dashboard should only include in progress ones"
- "remove upcoming assignments as well"

**Best practices:**
- State what should happen
- Be clear about removals/modifications
- AI will update accordingly

---

### Pattern 4: Design Direction
```
"[Current] but [desired visual/behavior]"
```
**Example:**
- "Ok almost but study lesson button should show up regardless so show it with locked lessons as well"
- "Okay almost but study lesson button should show up regardless so show it with locked lessons as well. Also what exactly will phase 5 be concerned with?"

**Best practices:**
- Acknowledge what's working
- Specify exact change needed
- Can combine multiple concerns in one message

---

## ⚠️ Common Pitfalls to Avoid

### ❌ Don't: Be Vague
```
"Make it better"
"Fix the thing"
"Change the design"
```
**Problem:** AI doesn't know what "better" means to you.

**Better:**
```
"Make the buttons larger and add hover effects"
"Change the color scheme to match the header"
```

---

### ❌ Don't: Skip Context
```
"Update it"
```
**Problem:** What needs updating? What should it look like?

**Better:**
```
"Update the subject roadmap to show mastery rings for each lesson"
```

---

### ❌ Don't: Request Everything at Once
```
"Build the entire dashboard, subjects page, roadmap, and lesson pages"
```
**Problem:** Too much scope, hard to iterate, errors compound.

**Better:**
```
"Begin with phase 1" → "Proceed with phase 2" → etc.
```

---

### ❌ Don't: Ignore Structure
```
"Add a button somewhere"
```
**Problem:** Where? What should it do? What should it look like?

**Better:**
```
"Add a 'Skip to Level' button in the level header for locked lessons"
```

---

## ✅ Best Practices Summary

### 1. **Use Phased Approach**
- Break work into phases
- Reference phase numbers
- Complete one phase before moving to next

### 2. **Be Specific**
- Name exact components/features
- Specify exact behavior
- Include visual references when needed

### 3. **Provide Immediate Feedback**
- Report issues as soon as you see them
- Don't wait until everything is done
- Iterate quickly

### 4. **Acknowledge Progress**
- Use "Ok good", "Proceed" to continue
- Shows AI what's working
- Maintains momentum

### 5. **Combine Related Requests**
- Group similar changes in one message
- Reduces back-and-forth
- More efficient

### 6. **Use Visual References**
- Attach images for design references
- Show examples of desired behavior
- Much clearer than descriptions

---

## 📚 Examples from Our Session

### Example 1: Starting a New Feature
**Your prompt:**
```
"Okay now we work on the subjects/courses. I want you to update todo, progress and testing"
```

**Why it worked:**
- Clear scope (subjects/courses)
- Specific action (update documentation)
- Sets up structured approach

**AI response:** Created phases, updated docs, ready for implementation

---

### Example 2: Iterative Refinement
**Your prompts:**
```
"Begin with phase 1"
→ "uhh for some reason the page is completely empty"
→ "Okay good working now proceed to phase 2"
→ "Proceed with phase 3"
→ "Proceed but the filters are kinda unnecessary tbh just keep progress for now"
```

**Why it worked:**
- Started with structure
- Immediate feedback on issues
- Quick iterations
- Refinement as needed

---

### Example 3: Visual Design Feedback
**Your prompt:**
```
"Ummm no? I want to have the game like structure that brilliant and duolingo have."
[with images attached]
```

**Why it worked:**
- Clear rejection of current approach
- Visual reference provided
- AI could see exact pattern needed

**AI response:** Completely redesigned to match Duolingo/Brilliant style

---

### Example 4: Specific Behavior Change
**Your prompt:**
```
"Ok almost but study lesson button should show up regardless so show it with locked lessons as well. Also what exactly will phase 5 be concerned with?"
```

**Why it worked:**
- Acknowledged progress ("Ok almost")
- Specific change requested
- Asked for clarification on next phase
- Combined multiple concerns efficiently

---

### Example 5: Completion Request
**Your prompt:**
```
"Yes please do so just finish everything"
```

**Why it worked:**
- Clear intent to complete all remaining work
- AI systematically finished all phases
- Efficient wrap-up

---

## 🎓 Quick Reference Card

### Starting a Feature
```
"[Feature name] - [Update docs] - [Begin with phase 1]"
```

### Continuing Work
```
"Proceed with phase [N]"
"Ok good proceed with next phase"
```

### Providing Feedback
```
"[Current state] but [desired change]"
"[Issue] - [What you expected]"
```

### Design Changes
```
"[Not right] - [Attach reference images]"
"[Component] should [specific behavior]"
```

### Completion
```
"Yes please do so just finish everything"
"Proceed" (for remaining phases)
```

---

## 💡 Pro Tips

1. **Let AI Update Documentation**
   - When starting features, ask AI to update TODO/PROGRESS/TESTING
   - AI maintains consistency automatically

2. **Use Simple Confirmations**
   - "Proceed", "Ok good", "Continue" work great
   - Shows you're ready for next step

3. **Combine Related Feedback**
   - Group similar changes in one message
   - More efficient than multiple messages

4. **Ask Questions Early**
   - "What exactly will phase X be concerned with?"
   - Prevents misunderstandings

5. **Trust the Phased Approach**
   - Complete one phase before moving to next
   - Easier to track progress
   - Easier to debug issues

6. **Provide Visual References**
   - Images are worth 1000 words
   - Especially for design/UI changes

---

## 🚀 Advanced Patterns

### Pattern: "Finish Everything"
When you want all remaining work completed:
```
"Yes please do so just finish everything"
```
AI will:
- Identify all pending tasks
- Complete them systematically
- Update documentation
- Mark everything complete

### Pattern: "Update Docs First"
When starting new work:
```
"[Feature] - I want you to update todo, progress and testing"
```
AI will:
- Break down into phases
- Update TODO.md with tasks
- Update PROGRESS.md with status
- Update TESTING.md with test cases

### Pattern: "Refine as You Go"
When something needs adjustment:
```
"[Current] but [change]"
```
AI will:
- Keep what's working
- Make specific change
- Continue with remaining work

---

## 📝 Template Prompts

### Starting a New Feature
```
"[Feature name] - I want you to update todo, progress and testing for [feature]. Begin with phase 1"
```

### Continuing Work
```
"Proceed with phase [N]"
```

### Reporting an Issue
```
"[Issue description] - [What you expected to see]"
```

### Requesting a Change
```
"[Component/Feature] should [specific behavior]. Also [any other related changes]"
```

### Completing All Work
```
"Yes please do so just finish everything"
```

---

## 🎯 Remember

1. **Be specific** - Name components, features, behaviors
2. **Use phases** - Break work into manageable chunks
3. **Provide feedback** - Report issues immediately
4. **Iterate quickly** - Small, frequent changes
5. **Trust the process** - Phased approach works well
6. **Use visuals** - Images clarify design intent
7. **Combine requests** - Group related changes
8. **Acknowledge progress** - "Ok good" keeps momentum

---

**Happy Coding! 🚀**

This guide is based on patterns that worked well in our development sessions. Use it as a reference, but don't be afraid to adapt it to your needs!
