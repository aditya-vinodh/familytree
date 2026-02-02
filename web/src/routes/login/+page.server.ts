import { db } from "$lib/server/db";
import { admin, session } from "$lib/server/db/schema";
import { redirect } from "@sveltejs/kit";
import argon2 from 'argon2';
import { randomUUID } from "crypto";

export const actions = {
    default: async ({request, cookies}) => {
        const formData = await request.formData();
        const password = formData.get('password');
        console.log('Form submitted with password:', password);

        const admins = await db.select().from(admin);
        if (admins.length === 0) {
            console.error('No admin found in the database.');
    
            const passwordHash = await argon2.hash(password)
            await db.insert(admin).values({passwordHash})
            return { success: false, error: 'No admin found' };
        }

        const adminRecord = admins[0];
        const validPassword = await argon2.verify(adminRecord.passwordHash, password);
        if (!validPassword) {
            console.error('Invalid password attempt.');
            return { success: false, error: 'Invalid password' };
        }

        const sessionId = randomUUID()
        await db.insert(session).values({id: sessionId})

        cookies.set('sessionId', sessionId, {path: '/', httpOnly: true, sameSite: 'lax'})

        return redirect(303, '/people/add')
    }
}
