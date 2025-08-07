import { integer, varchar, char, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';


export const Users = pgTable('users', {
    user_id: serial('user_id').primaryKey().notNull(),
    google_id: text('google_id').notNull(),
    name: varchar("name").notNull(),
    email: text('email').notNull(),
    picture: text('picture').notNull(),
    created_at: timestamp('created_at').defaultNow().notNull(),

});

export const Sessions = pgTable('sessions', {
    session_id: text('session_id').primaryKey().notNull(),
    user_id: integer('user_id').notNull().references(() => Users.user_id),
    expires_at: timestamp('expires_at').notNull(),

});

export const User_roles = pgTable('user_roles', {
    email: text('email').notNull().primaryKey(),
    role: char('role', { length: 1 }).notNull(), // A for admin, U for user
});