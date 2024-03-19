import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", [
  "backlog",
  "todo",
  "inprogres",
  "done",
]);

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  userId: text("userId").notNull(),
  status: statusEnum("status").default("backlog"),
  createAt: timestamp("createdAt").defaultNow(),
});
