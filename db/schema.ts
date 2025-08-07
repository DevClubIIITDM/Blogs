import { integer, varchar, char, pgTable, serial, text, timestamp, primaryKey } from 'drizzle-orm/pg-core';


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

export const Blogs = pgTable('blogs', {
    id: serial('id').primaryKey(),
    authorId: integer('author_id')
      .notNull()
      .references(() => Users.user_id, { onDelete: 'cascade' }),
    approved: integer('approved').default(0).notNull(),
    category: varchar('category', { length: 100 }).notNull(),
    slug: varchar('slug', { length: 150 }).unique(),
    title: varchar('title', { length: 200 }).notNull(),
    excerpt: text('excerpt'),
    content: text('content'),
    tags: text('tags'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    readingTime: integer('reading_time').notNull(),
});
  
export const comments = pgTable('comments', {
id: serial('id').primaryKey(),
postId: integer('post_id')
    .notNull()
    .references(() => Blogs.id, { onDelete: 'cascade' }),
authorId: integer('author_id')
    .notNull()
    .references(() => Users.user_id, { onDelete: 'cascade' }),
content: text('content').notNull(),
createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const likes = pgTable('likes', {
userId: integer('user_id')
    .notNull()
    .references(() => Users.user_id, { onDelete: 'cascade' }),
postId: integer('post_id')
    .notNull()
    .references(() => Blogs.id, { onDelete: 'cascade' }),
createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
}, (table) => [
    primaryKey({ columns: [table.userId, table.postId] }),
]);