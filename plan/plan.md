# 🧩 Project Planning Document

**Project Name:** Chatbot Authentication & Onboarding Flow
**Tech Stack:** Next.js (App Router) + Bun + TailwindCSS (+ optional ShadCN UI)

---

## 🧠 1. What This Is

This project is a **conversational authentication system** — a **chatbot-style login and signup experience**.
Instead of using traditional static forms, users interact through a chat interface where the bot guides them step-by-step to:

* Create or log into an account
* Provide company identification if they use a generic email
* Set a password (securely masked)
* Complete short onboarding questions via button-based selections

It’s a fusion of **user onboarding + authentication**, designed for **business-focused apps** that want a more interactive, human-like experience.

---

## 💼 2. Why We Need It

### **Context**

Most business apps rely on static login forms that feel detached and mechanical. For apps designed for B2B or enterprise use, building trust and engagement early is key.
A conversational approach allows:

* **Better engagement:** Feels personal, not transactional
* **Progressive disclosure:** Ask only relevant questions based on user type
* **Brand differentiation:** Adds polish and personality to onboarding
* **Dynamic logic:** Detects if the user is an individual (Gmail/Outlook) or a company user (custom domain)
* **Smooth data collection:** Buttons make onboarding fast and accurate

### **Business Focus**

Because the app targets **businesses**, the system must:

* Identify whether a user belongs to a company
* Prompt for **company ID or domain** if the email is generic
* Maintain scalability for both **individual trial users** and **corporate accounts**

---

## 🧱 3. Core Requirements

### **Functional**

1. User can **log in or sign up** via chatbot flow.
2. If the email domain is generic (e.g., `gmail.com`, `outlook.com`), the bot asks for a **company ID**.
3. Users can set a **preferred password** — input masked for privacy.
4. Bot asks 2–3 **general onboarding questions** via button choices.
5. On completion, user receives a confirmation summary.
6. Data temporarily stored in client state (expandable to backend later).

### **Non-Functional**

* Fast, minimal API latency via **Bun runtime**
* Responsive UI for mobile + desktop
* Secure password handling (no plain-text logs)
* Modular design for easy flow customization

---

## ⚙️ 4. Tech Stack Summary

| Layer                   | Technology               | Purpose                              |
| ----------------------- | ------------------------ | ------------------------------------ |
| **Runtime**             | Bun                      | High-performance runtime for Next.js |
| **Frontend**            | Next.js (App Router)     | UI + integrated backend              |
| **Styling**             | TailwindCSS              | Utility-first styling framework      |
| **Components**          | ShadCN UI (optional)     | For buttons, inputs, cards           |
| **Animation**           | Framer Motion (optional) | Smooth chat message transitions      |
| **API**                 | Next.js Route Handlers   | Mock login/signup backend            |
| **Data Layer (Future)** | PostgreSQL / Supabase    | Persist user data and tokens         |

---

## 🔄 5. Conversation Flow Logic

### **Step 1 — Welcome Prompt**

> 👋 Hi there! Welcome to **[App Name]**.
> Do you already have an account or would you like to create one?

**Options:**

* 🔑 Log In
* ✨ Sign Up

---

### **Step 2 — Collect Email**

> Please enter your work email address.

* Validate email format.
* If domain is **generic** (`gmail`, `yahoo`, etc.):

  > That looks like a personal email.
  > Do you have a **company ID** or **company email domain**?

  If yes → store company ID.
  If no → mark user as **individual account**.

---

### **Step 3 — Password Setup**

> Great! Now, please set a password for your account.
> *(Your input will be hidden for security.)*

* Password masked visually (e.g., `******`)
* Validation: minimum 6 characters, must contain a number or symbol.

---

### **Step 4 — General Onboarding Questions**

> Almost done! Tell us a bit about your business.

1. **What’s your business type?**

   * `Tech`, `Finance`, `Retail`, `Healthcare`
2. **Company size:**

   * `1–10`, `11–50`, `51–200`, `200+`
3. **Primary use case:**

   * `Data Collection`, `Customer Support`, `Internal Tools`

Each presented as **buttons** for faster input.

---

### **Step 5 — Confirmation**

> ✅ Here’s what we’ve got:
>
> * Email: `user@company.com`
> * Company ID: `ACME-001`
> * Use Case: `Data Collection`
>
> Everything look good?

**Buttons:** `Confirm` / `Edit`

On confirm →

> 🎉 Awesome! You’re all set. Let’s get started.

---

## 🎨 6. Styling Plan

### **Core UI Elements**

| Element            | Style Notes                                                  |
| ------------------ | ------------------------------------------------------------ |
| **Chat Container** | Rounded card (`rounded-2xl`, `shadow-lg`, `bg-white`, `p-4`) |
| **Bot Messages**   | Gray background (`bg-gray-100`), left aligned                |
| **User Messages**  | Blue background (`bg-blue-600 text-white`), right aligned    |
| **Buttons**        | Rounded, subtle shadow, hover effects                        |
| **Input Field**    | Border + rounded-xl, smooth focus transitions                |

### **Color Palette**

| Name       | Value     | Use                  |
| ---------- | --------- | -------------------- |
| Primary    | `#2563eb` | Buttons / Highlights |
| Secondary  | `#f3f4f6` | Message bubbles      |
| Text       | `#111827` | Standard text        |
| Background | `#f9fafb` | Page background      |

---

## 🧭 7. Example Onboarding Process (User Journey)

| Step | User Action              | Bot Response                                         | Stored Data    |
| ---- | ------------------------ | ---------------------------------------------------- | -------------- |
| 1    | Opens chatbot            | “Hi! Do you have an account?”                        | —              |
| 2    | Clicks “Sign Up”         | “Enter your work email”                              | —              |
| 3    | Inputs `john@gmail.com`  | “That’s a personal email. Do you have a company ID?” | email          |
| 4    | Inputs `ACME-123`        | “Got it! Please set a password.”                     | companyId      |
| 5    | Inputs `securePass1!`    | “Now tell us about your business type.”              | password       |
| 6    | Clicks `Tech`            | “And your company size?”                             | businessType   |
| 7    | Clicks `11–50`           | “Last one — what’s your main use case?”              | companySize    |
| 8    | Clicks `Data Collection` | “All set! Confirm your info?”                        | useCase        |
| 9    | Confirms                 | “🎉 Welcome aboard, John!”                           | ✅ user created |

---

## 🧩 8. Development Roadmap

| Phase       | Deliverable             | Description                                |
| ----------- | ----------------------- | ------------------------------------------ |
| **Phase 1** | Project setup           | Init Next.js + Bun + Tailwind              |
| **Phase 2** | Chat UI                 | Build chat bubbles + user input            |
| **Phase 3** | Auth Flow               | Implement email → company → password logic |
| **Phase 4** | Onboarding Flow         | Add business questions and buttons         |
| **Phase 5** | Mock Backend            | API route for signup/login                 |
| **Phase 6** | Styling + Polish        | Add animations, responsiveness             |
| **Phase 7** | DB Integration (Future) | Connect Supabase or Prisma backend         |


