# Learn Tanstack Start 

This project is intended as a learning tool for me to explore Tanstack Start, DrizzleORM, Zod, Zustand (lit), and shadcn/ui with compound component pattern. And these are my goals for this learning session, along with the packages I'm using


## What Should I Do?

- [x] Sign In Form
    - [x] Styling Sign In Form with 'Tailwindcss' + 'shadcn/ui'
    - [x] Form Validation with 'Zod'
        - [x] Client-side validation (safeParse + flattenError)
        - [x] Server-side validation via 'createServerFn().validator()'

- [x] Sign Up Form
    - [x] Styling Sign Up Form with 'Tailwindcss' + 'shadcn/ui'
    - [x] Form Validation with 'Zod'
        - [x] Client-side validation (safeParse + flattenError)
        - [x] Server-side validation via 'createServerFn().validator()'
        - [x] Password match check with '.refine()'

- [x] Authentication
    - [x] Sign Up & Sign In with server functions
    - [x] Password hashing with 'bcryptjs'
    - [x] Session cookie management
    - [x] Route guard ('beforeLoad' redirect for guest/authed routes)
    - [x] Log Out

- [x] Notes CRUD
    - [x] Notes list page
    - [x] Create Note page
    - [x] View Note page
    - [x] Edit Note page
    - [x] Delete Note with confirm dialog + toast
    - [x] Search Note with URL search params ('?q=')

- [x] Database with 'Drizzle ORM'
    - [x] PostgreSQL schema ('users' & 'notes' tables)
    - [x] Zod schema integration with 'drizzle-orm/zod'
    - [x] Migrations

- [x] Global State with 'Zustand'
    - [x] Delete dialog state management

- [x] Styling with 'Tailwindcss' + 'shadcn/ui'
    - [x] 14 UI components (Button, Card, Field, Input, Alert, Toast, etc.)
    - [x] Compound Component pattern


## UI Documentation

### Sign In Form
![Sign In Form](<public/docs/Screenshot 2026-09-23 at 19-50-53 TanStack Start Starter.png>)

### Sign Up Form (Validation Errors)
![Sign Up Form](<public/docs/Screenshot 2026-09-23 at 19-52-36 TanStack Start Starter.png>)

### Notes List
![Notes List](<public/docs/Screenshot 2026-09-23 at 19-53-50 Notes.png>)

### Search Note
![Search Note](<public/docs/Screenshot 2026-09-23 at 19-55-16 Notes.png>)

### Create Note
![Create Note](<public/docs/Screenshot 2026-09-23 at 19-54-18 Create Note.png>)

### View Note
![View Note](<public/docs/Screenshot 2026-09-23 at 19-55-27 Belajar Tanstack Start.png>)

### Edit Note
![Edit Note](<public/docs/Screenshot 2026-09-23 at 19-55-37 Edit Belajar Tanstack Start.png>)


## Packages

1. TanStack Start (React Start, React Router)
2. Zod
3. Tailwindcss
4. shadcn/ui (Base UI, class-variance-authority, lucide-react)
5. Drizzle ORM + PostgreSQL (drizzle-kit, pg)
6. Zustand
7. bcryptjs
8. Vite + TypeScript


# Source

[Nauval - 5 Jam Belajar Full-stack Dengan Tanstack Start](https://youtu.be/Lbjz8D4MthE?si=tfv0US_lzOzqRy4t)
