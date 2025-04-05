import { serial, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockInterview", {
    id: serial("id").primaryKey(),
    jsonMockResp: text("jsonMockResp").notNull(),
    jobPosition: varchar("jobPosition").notNull(), // Fixed column name
    jobDesc: varchar("jobDesc").notNull(),
    jobExper: varchar("jobExper").notNull(),
    createdBy: varchar("createdBy").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(), // Use timestamp
    mockId: varchar("mockId").notNull(),
});

export const UserAnswer=pgTable('userAnswer',{
    id:serial('id').primaryKey(),
    mockIdRef:varchar('mockId'),
    question:varchar('question').notNull(),
    correctAns:varchar('correctAns').notNull(),
    userAns:text('userAns').notNull(),
    feedback:text('feedback').notNull(),
    rating:varchar('rating').notNull(),
    userEmail:varchar('userEmail').notNull(),
    createdAt:varchar('createdAt').notNull(),
})
