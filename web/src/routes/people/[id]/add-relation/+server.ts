import { db } from "$lib/server/db";
import { relation, session } from "$lib/server/db/schema";
import { error, json } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const POST = async ({cookies, request, params}) => {
    const sessionId = cookies.get('sessionId');
    if (!sessionId) {
        return error(403, 'No session ID found in cookies')
    }

    const sessions = await db.select().from(session).where(eq(session.id, sessionId))
    if (sessions.length === 0) {
        return error(403, 'Invalid session ID')
    }

    const data = await request.json();
    const person1Id = params.id
    const person2Id = data.person2Id
    const relationType = data.relation

    await db.insert(relation).values({
        person1Id: parseInt(person1Id),
        person2Id: parseInt(person2Id),
        relationType: relationType
    })

    return json({ success: true });
}
