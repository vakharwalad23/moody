import {
  storeJournalEntry,
  updateJournalEntry,
  deleteJournalEntry,
} from "./ai";
import { QuestionEntry } from "./definitions";

export const syncJournalEntryToPinecone = async (
  entry: QuestionEntry,
  userId: string,
  operation: "create" | "update" | "delete"
) => {
  try {
    switch (operation) {
      case "create":
        await storeJournalEntry(entry, userId);
        break;
      case "update":
        await updateJournalEntry(entry, userId);
        break;
      case "delete":
        await deleteJournalEntry(entry.id, userId);
        break;
    }
  } catch (error) {
    // Don't throw error - journal operations should still work even if Pinecone fails
  }
};
