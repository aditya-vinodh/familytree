import { db } from "$lib/server/db"
import { person } from "$lib/server/db/schema"
import { count } from "drizzle-orm"

export const load = async () => {
    const personCount = await db.select({count: count() }).from(person)

    return {
        personCount: personCount[0].count
    }
}
