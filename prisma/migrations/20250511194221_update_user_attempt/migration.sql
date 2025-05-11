/*
  Warnings:

  - You are about to drop the column `completed` on the `UserAttempt` table. All the data in the column will be lost.
  - You are about to drop the column `guesses` on the `UserAttempt` table. All the data in the column will be lost.
  - Added the required column `guess` to the `UserAttempt` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UserAttempt" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "dailyAssignmentId" TEXT NOT NULL,
    "guess" TEXT NOT NULL,
    "score" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "UserAttempt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "UserAttempt_dailyAssignmentId_fkey" FOREIGN KEY ("dailyAssignmentId") REFERENCES "DailyAssignment" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_UserAttempt" ("createdAt", "dailyAssignmentId", "id", "score", "updatedAt", "userId") SELECT "createdAt", "dailyAssignmentId", "id", "score", "updatedAt", "userId" FROM "UserAttempt";
DROP TABLE "UserAttempt";
ALTER TABLE "new_UserAttempt" RENAME TO "UserAttempt";
CREATE INDEX "UserAttempt_userId_idx" ON "UserAttempt"("userId");
CREATE INDEX "UserAttempt_dailyAssignmentId_idx" ON "UserAttempt"("dailyAssignmentId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
