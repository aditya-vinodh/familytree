import { db } from "$lib/server/db"
import { person } from "$lib/server/db/schema"
import { sql } from "drizzle-orm"

export const load = async ({url}) => {
    const q = await url.searchParams.get('q')
    if (!q) return {
        persons: []
    }

    const persons = await db.select().from(person).where(sql`to_tsvector('english', ${person.fullName}) @@ to_tsquery('english', ${q})`)

    return {
        persons
    }
}
