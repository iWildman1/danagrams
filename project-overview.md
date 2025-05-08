## Danagrams: Project Breakdown

**a) Project Description & Core Features**

**Description:**
Danagrams is a daily anagram puzzle game designed for two specific players (Me and my fiancée). Each day, a new anagram (a "Danagram") is presented. Players log in to solve it, with up to five guesses. Scores are awarded based on the number of guesses taken. The game includes a leaderboard to track scores and a "nudge" feature for a bit of friendly competition. The application will be a Progressive Web App (PWA) for easy access on mobile devices, built with Tanstack Start, tRPC, and an auth solution like Better Auth or NextAuth, deployed via Docker on DigitalOcean with CI/CD through GitHub Actions. User accounts will be pre-seeded, and daily words will be selected "just-in-time" when the first player accesses the game on a new day.

**Core Features:**

1.  **User Authentication:** Secure login for the two pre-seeded players.
2.  **Daily Danagram & Just-In-Time Selection:**
    - A new anagram is available each day.
    - The word for the day is selected and assigned when the first player accesses the game after midnight (UTC). This avoids a separate cron job.
3.  **Guessing Mechanic:** Players have up to 5 guesses to solve the anagram.
4.  **Scoring System:**
    - Correct answer: 1000 points.
    - Penalty: -200 points for each incorrect guess beyond the first.
      - 1st guess correct: 1000 points
      - 2nd guess correct: 800 points
      - 3rd guess correct: 600 points
      - 4th guess correct: 400 points
      - 5th guess correct: 200 points
      - Failure to guess: 0 points
5.  **Leaderboard:** Displays current day's scores for both players.
6.  **Conditional View & Navigation:**
    - If the daily Danagram hasn't been attempted/completed: Game page is shown.
    - If the daily Danagram has been completed: Users are directed/redirected to the leaderboard.
    - Leaderboard has a button to navigate to the game if the user hasn't completed it yet.
7.  **Nudge System (from Leaderboard):**
    - A player can "nudge" the other player up to 3 times per day.
    - The nudge button is only available on the leaderboard.
    - Nudging is only possible if the nudging player has completed their Danagram for the day and the other player has not.
    - Nudge counts reset daily.
8.  **Daily Reset (Implicit):** Game state (guesses, score for the day, word) is tied to the daily selected word. Nudge counts reset when a player first interacts on a new day.
9.  **PWA Functionality:** Installable on home screens, potential for basic offline support.
10. **Word Management (Seed Script):** A backend script will be used to take a list of words, generate anagrams, and populate a database table for future Danagrams. No admin UI.

---

**b) Pages / Views**

- `[ ]` **Login Page:**
  - Form for username/password. (Accounts are pre-seeded, no self-registration).
- `[ ]` **Game Page (Daily Danagram):**
  - Server-side logic (e.g., Tanstack Start loader) will check if the user has completed today's Danagram. If so, it redirects to the Leaderboard.
  - Displays the current Danagram.
  - Input field for guesses.
  - Displays number of remaining guesses.
  - Shows previous incorrect guesses for the current attempt.
  - Button to submit guess.
  - Once solved or out of guesses: Shows result, score, and a button/link to navigate to the leaderboard.
- `[ ]` **Leaderboard / Waiting Page:**
  - Displays today's scores for both players.
  - If the player has _not_ completed today's Danagram, a button/link is available to go to the Game Page.
  - If the player _has_ completed, this page also serves as the "waiting for next word" page.
  - Displays "Nudge Partner" button (conditional on game state: current user completed, partner has not, nudges remaining).
- `[ ]` **(PWA) App Shell / Offline Page:**
  - Basic structure for the PWA.
  - A simple page to show if the user is offline and cannot fetch new data.

---

**c) Backend tRPC Routers and Procedures**

(Assuming a primary router, e.g., `appRouter`, which combines sub-routers)

**1. `authRouter` (or handled by NextAuth/Better Auth with tRPC adapters)**
_ `[ ]` **`login`**: (Mutation) Authenticates user, returns session/token.
_ `[ ]` **`getSession`**: (Query) Retrieves current user session information. \* `[ ]` **`logout`**: (Mutation) Invalidates current session.

**2. `danagramRouter` (for core game logic)**
_ `[ ]` **`getDailyState`**: (Query)
_ **Daily Word Selection Logic:**
_ Determines current UTC date.
_ Checks if a word has already been assigned for this date in a `DailyAssignments` table.
_ If not, selects a new word from the `Words` pool, and creates an entry in `DailyAssignments` for the current date and chosen word. (This step should ideally use a database unique constraint on the date in `DailyAssignments` to handle potential rare race conditions if both players load simultaneously at midnight – the first write wins, the second would then read the newly created assignment).
_ Resets daily nudge count for the user if it's their first activity of the new day.
_ **Returns User & Game State:**
_ The current day's anagram string.
_ User's progress for the day: previous guesses, remaining guesses, score achieved (if any).
_ Whether the current user has completed today's Danagram.
_ The solution (original word) if the user has completed or run out of guesses.
_ Whether the _other_ player has completed today (for nudge button logic).
_ Remaining nudges for the current user.
_ `[ ]` **`submitGuess`**: (Mutation)
_ Input: `guess: string`.
_ Validates the guess against the day's solution (fetched via `DailyAssignments` and `Words` tables).
_ Updates user's guesses, remaining attempts, and score for the day in a `UserAttempts` table (linked to the `DailyAssignment`).
_ Returns:
_ `isCorrect: boolean`.
_ `solution?: string` (if correct or out of guesses).
_ `newScore?: number`.
_ `remainingGuesses: number`.
_ `feedbackMessage: string`.
_ `[ ]` **`nudgePartner`**: (Mutation)
_ Checks if current user has completed today's Danagram and partner hasn't.
_ Checks if current user has remaining nudges for the day.
_ Decrements current user's nudge count.
_ (Optionally: flags the partner user or sends a simple notification if implementing that).
_ Returns: `success: boolean`, `message: string`.
_ `[ ]` **`getLeaderboard`**: (Query)
_ Fetches scores for both players for the current day by looking up their `UserAttempts` linked to today's `DailyAssignment`.
_ Optionally, fetch overall historical scores/stats. \* Returns: `leaderboardData: { today: [{ userId, username, score, completed }], overall: [...] }`.

**Internal Backend Logic (Scripts, no cron jobs):**

- `[ ]` **Word Population Script:**
  - A standalone script (e.g., `npm run seed:words`).
  - Takes a list of words as input.
  - For each word, generates an anagram.
  - Populates the `Words` table in the database with original words and their anagrams.
- `[ ]` **User Seeding Script:**
  - A standalone script (e.g., `npm run seed:users`).
  - Creates the two user accounts with predefined credentials.

**Data Models (Implicitly needed for the above):**

- `User`: `id`, `username`, `hashedPassword`, `dailyNudgesRemaining` (number), `lastPlayedDate` (Date, for nudge reset logic).
- `Word`: `id`, `originalWord` (string), `anagram` (string).
- `DailyAssignment`: `id`, `date` (Date, YYYY-MM-DD, **UNIQUE constraint**), `wordId` (foreign key to `Word`).
- `UserAttempt`: `id`, `userId` (foreign key to `User`), `dailyAssignmentId` (foreign key to `DailyAssignment`), `guesses` (array of strings), `score` (number), `completed` (boolean). (Consider a compound unique key on `userId` and `dailyAssignmentId`).
