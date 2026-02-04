import { db } from "$lib/server/db"
import { person, relation, session } from "$lib/server/db/schema"
import { and, eq, ne, or } from "drizzle-orm"

export const load = async ({params, cookies}) => {
    const id = params.id
    const sessionId = cookies.get('sessionId');
    let isAdmin = false;

    if (sessionId) {
        const sessions = await db.select().from(session).where(eq(session.id, sessionId))
        if (sessions.length > 0) {
            isAdmin = true;
        }
    }

    const persons = await db.select({id: person.id, fullName: person.fullName, birthYear: person.birthYear, birthCity: person.birthCity, birthCountry: person.birthCountry}).from(person).where(eq(person.id, parseInt(id)))
    if (persons.length === 0) {
        return { person: null, isAdmin }
    }

    const relations = await db.select({id: person.id, person1Id: relation.person1Id, person2Id: relation.person2Id, fullName: person.fullName, relation: relation.relationType}).from(person).innerJoin(relation, or(eq(relation.person1Id, person.id), eq(relation.person2Id, person.id)))
        .where(
            and(
                or(
                    eq(relation.person1Id, parseInt(id)), 
                    eq(relation.person2Id, parseInt(id)), 
                ),
                ne(person.id, parseInt(id))
            )
        )

    return { person: persons[0], isAdmin, relations }
}
