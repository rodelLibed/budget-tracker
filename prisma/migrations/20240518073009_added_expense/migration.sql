/*
  Warnings:

  - Added the required column `expense` to the `YearHistory` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_YearHistory" (
    "userId" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "income" REAL NOT NULL,
    "expense" REAL NOT NULL,

    PRIMARY KEY ("month", "year", "userId")
);
INSERT INTO "new_YearHistory" ("income", "month", "userId", "year") SELECT "income", "month", "userId", "year" FROM "YearHistory";
DROP TABLE "YearHistory";
ALTER TABLE "new_YearHistory" RENAME TO "YearHistory";
PRAGMA foreign_key_check("YearHistory");
PRAGMA foreign_keys=ON;
