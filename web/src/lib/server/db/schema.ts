import { sql } from 'drizzle-orm';
import { index, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const admin = pgTable('admin', {id: serial('id').primaryKey(), passwordHash: text('password_hash').notNull()})
export const session = pgTable('session', {id: text('id').primaryKey(), createdAt: timestamp('created_at').defaultNow().notNull()})
export const person = pgTable('person', 
    {
        id: serial('id').primaryKey(), 
        fullName: text('full_name').notNull(), 
        birthYear: integer('birth_year'), 
        birthMonth: integer('birth_month'), 
        birthDate: integer('birth_date'),
        birthCity: text('birth_city'),
        birthCountry: text('birth_country'),
    },
    (table) => [
        index('person_full_name_index').using('gin', sql`to_tsvector('english', ${table.fullName})`)
    ]
)

export const relation = pgTable('relation',
    {
        id: serial('id').primaryKey(),
        person1Id: integer('person1_id').notNull().references(() => person.id),
        person2Id: integer('person2_id').notNull().references(() => person.id),
        relationType: text('relation_type').notNull(),
    }
)
