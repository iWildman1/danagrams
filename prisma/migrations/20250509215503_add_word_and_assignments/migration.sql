-- CreateTable
CREATE TABLE "Word" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "originalWord" TEXT NOT NULL,
    "anagram" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DailyAssignment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "wordId" TEXT NOT NULL,
    CONSTRAINT "DailyAssignment_wordId_fkey" FOREIGN KEY ("wordId") REFERENCES "Word" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "DailyAssignment_date_key" ON "DailyAssignment"("date");

-- CreateIndex
CREATE INDEX "DailyAssignment_wordId_idx" ON "DailyAssignment"("wordId");
