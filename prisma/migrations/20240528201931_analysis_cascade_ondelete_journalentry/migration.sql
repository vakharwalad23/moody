-- DropForeignKey
ALTER TABLE "Analysis" DROP CONSTRAINT "Analysis_entryId_fkey";

-- AddForeignKey
ALTER TABLE "Analysis" ADD CONSTRAINT "Analysis_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "JournalEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
