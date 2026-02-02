import { db } from "$lib/server/db";
import { session, person } from "$lib/server/db/schema";
import { redirect } from "@sveltejs/kit";
import { eq, sql } from "drizzle-orm";

export const load = async ({params, cookies, url}) => {
    const id = params.id
    const sessionId = cookies.get('sessionId');
    if (!sessionId) {
        return redirect(303, `/people/${id}`)
    }

    const sessions = await db.select().from(session).where(eq(session.id, sessionId))
    if (sessions.length === 0) {
        return redirect(303, `/people/${id}`)
    }

    const persons = await db.select().from(person).where(eq(person.id, parseInt(id)))

    if (persons.length === 0) {
        return redirect(303, `/people/${id}`)
    }

    const q = url.searchParams.get('q') || '';
    const relation = url.searchParams.get('relation') || 'mother';
    let searchResults = []

    if (q !== '') {
        searchResults = await db.select().from(person).where(sql`to_tsvector('english', ${person.fullName}) @@ to_tsquery('english', ${q})`)
    }

    return {
        person: persons[0],
        relation,
        q,
        searchResults
    };
}

