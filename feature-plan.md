## Danagrams: Feature-by-Feature Build Plan

**Phase 1: Foundation & Core Setup**

1.  `[x]` **Project Initialization & Basic Structure (NextJS)**

    - `[x]` Strip out TanStack Start attempt (keep the styleguide somewhere)
    - `[x]` Initialize a new NextJS project.
    - `[x]` Initialize and configure tRPC
    - `[x]` Set up basic project structure (folders for `routes`, `components`, `server/trpc`, `lib`, etc.).
    - `[x]` Initialize Git repository.
    - `[x]` Basic ESLint, Prettier, TypeScript configuration.

2.  `[x]` **Database & ORM Setup**

    - `[x]` Choose and set up a database (e.g., PostgreSQL, SQLite for local dev).
    - `[x]` Install and configure Prisma (or your chosen ORM).
    - `[x]` Define initial Prisma schema for:
      - `[x]` `User` (`id`, `username`, `hashedPassword`, `dailyNudgesRemaining`, `lastPlayedDate`)
      - `[x]` `Word` (`id`, `originalWord`, `anagram`)
      - `[x]` `DailyAssignment` (`id`, `date` (UNIQUE), `wordId`)
      - `[x]` `UserAttempt` (`id`, `userId`, `dailyAssignmentId`, `guesses` (array), `score`, `completed`)
    - `[x]` Run initial migration to create tables.

3.  `[x]` **User & Word Seeding Scripts**
    - `[x]` Create `scripts/seedUsers.ts`:
      - `[x]` Takes predefined credentials.
      - `[x]` Hashes passwords.
      - `[x]` Inserts the two users into the `User` table.
    - `[x]` Create `scripts/seedWords.ts`:
      - `[x]` Defines a list of original words.
      - `[x]` Implements a basic anagram generation function.
      - `[x]` Populates the `Word` table with `originalWord` and generated `anagram`.
    - `[x]` Add npm scripts to run these seeders (e.g., `npm run seed:users`, `npm run seed:words`).

**Phase 2: Authentication**

4.  `[ ]` **Authentication System (Backend & Frontend)**
    - **Backend (tRPC `authRouter`):**
      - `[x]` Integrate chosen auth library (e.g., Better Auth, NextAuth.js).
      - `[x]` Configure auth strategy (username/password, credentials provider).
      - `[x]` Create `login(username, password)`: Handles password hashing/comparison, session creation.
      - `[x]` Create `getSession()`: Retrieves current user session.
      - `[x]` Create `logout()`: Invalidates session.
      - `[x]` Set up tRPC context to include user session.
      - `[x]` Protect tRPC procedures that require authentication.
    - **Frontend (Login Page):**
      - `[x]` Create Login page/route (`/login`).
      - `[ ]` Build UI form for username and password.
      - `[ ]` Use tRPC client to call `authRouter.login`.
      - `[ ]` On successful login, redirect to Game Page (or Leaderboard if already completed).
      - `[ ]` Handle login errors.
      - `[ ]` Implement basic protected routes using session state from `authRouter.getSession`.

**Phase 3: Core Game Page & Logic**

5.  `[ ]` **Game Page & Core Danagram Logic (Backend & Frontend)**
    - **Backend (tRPC `danagramRouter` - Part 1):**
      - `[ ]` Create `danagramRouter`.
      - `[ ]` Implement `getDailyState` procedure:
        - `[ ]` Determine current UTC date.
        - `[ ]` Check `DailyAssignment` for today's entry; if none, select a new `Word`, create `DailyAssignment` (unique date), and assign.
        - `[ ]` Retrieve assigned `Word` (anagram).
        - `[ ]` Fetch `UserAttempt` for current user & today's `DailyAssignment`.
        - `[ ]` If `user.lastPlayedDate` is not today, reset `user.dailyNudgesRemaining = 3` and update `user.lastPlayedDate`.
        - `[ ]` Return: `anagram`, `solutionIfCompleted`, `guessesMade`, `remainingGuesses`, `score`, `hasCompletedToday`, `nudgesRemaining`. (Partner state will be added later for nudge).
      - `[ ]` Implement `submitGuess(guess: string)` procedure:
        - `[ ]` Retrieve today's `DailyAssignment` & `originalWord`.
        - `[ ]` Find/create `UserAttempt` for current user & today.
        - `[ ]` Validate guess, update `UserAttempt` (guesses, completed, score).
        - `[ ]` Return `isCorrect`, `solution?`, `newScore?`, `remainingGuesses`, `feedbackMessage`.
    - **Frontend (Game Page):**
      - `[ ]` Create Game Page/route (e.g., `/`).
      - `[ ]` On page load (loader), call `danagramRouter.getDailyState`.
      - `[ ]` **Conditional Redirect (Loader):** If `getDailyState` returns `hasCompletedToday: true`, redirect to Leaderboard.
      - `[ ]` Display `anagram`, `remainingGuesses`, `previous guessesMade`.
      - `[ ]` Input field & submit button.
      - `[ ]` On submit, call `danagramRouter.submitGuess`; update UI based on response.
      - `[ ]` If game ends, provide button/link to Leaderboard.

**Phase 4: Leaderboard & Nudge System**

6.  `[ ]` **Leaderboard Page & Nudge System (Backend & Frontend)**
    - **Backend (tRPC `danagramRouter` - Part 2):**
      - `[ ]` Implement `getLeaderboard` procedure:
        - `[ ]` Get today's `DailyAssignment`.
        - `[ ]` Fetch `UserAttempt` for _both_ users for today; include usernames.
        - `[ ]` Return `[{ userId, username, score, completed }]`.
      - `[ ]` Enhance `getDailyState` to also fetch partner's `UserAttempt` and return `partnerHasCompleted`.
      - `[ ]` Implement `nudgePartner` procedure:
        - `[ ]` Check if current user completed, partner hasn't, and current user has `dailyNudgesRemaining > 0`.
        - `[ ]` If so, decrement `user.dailyNudgesRemaining`, return `success: true`.
        - `[ ]` Else, return `success: false` with message.
    - **Frontend (Leaderboard Page):**
      - `[ ]` Create Leaderboard Page/route (e.g., `/leaderboard`).
      - `[ ]` On page load, call `danagramRouter.getLeaderboard` and `danagramRouter.getDailyState` (for current user's status, nudge count, partner status).
      - `[ ]` Display scores for both players.
      - `[ ]` If current user hasn't completed, display "Play Today's Danagram" button.
      - `[ ]` Conditionally display "Nudge [PartnerName]" button based on `getDailyState` data (user completed, partner not, nudges remaining).
      - `[ ]` On nudge click, call `danagramRouter.nudgePartner`; update UI.

**Phase 5: PWA, Deployment & Polish**

7.  `[ ]` **PWA Implementation**

    - `[ ]` Add a `manifest.json` file.
    - `[ ]` Configure icons.
    - `[ ]` Implement a basic service worker (e.g., for caching static assets, offline page).
    - `[ ]` Add meta tags for PWA in `index.html` (or equivalent).
    - `[ ]` Create a basic offline fallback page.
    - `[ ]` Test installability on mobile devices.

8.  `[ ]` **Styling & "Fun/Silly" Elements**

    - `[ ]` Apply basic CSS styling for a pleasant look and feel.
    - `[ ]` Add any desired "silly" elements (e.g., fun messages, simple animations).
    - `[ ]` Ensure responsive design for mobile.

9.  `[ ]` **Deployment Setup - Docker & DigitalOcean**

    - `[ ]` Create a `Dockerfile` for the Tanstack Start application.
    - `[ ]` Set up a DigitalOcean Droplet (or App Platform).
    - `[ ]` Install Docker on the Droplet.
    - `[ ]` Configure environment variables for production.
    - `[ ]` (If using a separate DB service, configure connection).

10. `[ ]` **CI/CD with GitHub Actions**
    - `[ ]` Create a GitHub Actions workflow (`.github/workflows/deploy.yml`).
    - `[ ]` Workflow triggers on push to `main` branch.
    - `[ ]` Steps: Checkout, Setup Node, Install, Build, Build Docker image, Push to registry, Deploy to DigitalOcean.

**Phase 6: Final Review & Manual Testing**

11. `[ ]` **Final Manual Walkthrough & Polish**
    - `[ ]` Manually test all user flows with both player accounts across different scenarios (first play of day, completed, nudging, etc.).
    - `[ ]` Check PWA installation and basic offline behavior.
    - `[ ]` Fix any remaining bugs or UI/UX quirks.
