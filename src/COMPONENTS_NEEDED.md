# ShadCN UI Components Required

This application uses the following shadcn/ui components. You need to install each one.

## Installation Commands

Run these commands in your terminal:

```bash
# Navigate to your project
cd career-advisor

# Install shadcn CLI
npx shadcn@latest init

# When prompted, answer:
# - TypeScript? Yes
# - Style: Default
# - Base color: Slate
# - CSS variables: Yes
# - Tailwind config: Yes
# - Components location: src/components/ui
# - Utils location: src/lib/utils
# - React Server Components: No
# - Write configuration: Yes

# Install required components one by one:
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add input
npx shadcn@latest add label
npx shadcn@latest add select
npx shadcn@latest add alert
npx shadcn@latest add badge
npx shadcn@latest add progress
```

## Components Used

- `button` - For all buttons (Sign In, Sign Up, Submit, etc.)
- `card` - For the main container cards
- `input` - For text input fields
- `label` - For form labels
- `select` - For dropdown selections (Education, Experience)
- `alert` - For error and success messages
- `badge` - For skill and interest tags
- `progress` - For career match percentage bars

## Alternative: Manual Installation

If shadcn CLI doesn't work, I can provide the component code directly for you to copy into:
- `src/components/ui/button.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/input.tsx`
- etc.

Let me know if you need the manual component files!
