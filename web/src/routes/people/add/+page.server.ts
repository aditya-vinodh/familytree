import { db } from "$lib/server/db";
import { person, session } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export const actions = {
    default: async ({request, cookies}) => {
        const sessionId = cookies.get('sessionId');
        if (!sessionId) {
            return { success: false, error: 'No session ID found in cookies' };
        }

        const sessions = await db.select().from(session).where(eq(session.id, sessionId))
        if (sessions.length === 0) {
            return { success: false, error: 'Invalid session ID' };
        }

        const formData = await request.formData();

        const fullname = formData.get('fullname');
        const birthDate = formData.get('birthdate');
        const birthCity = formData.get('birthcity');
        const birthCountry = formData.get('birthcountry');

        const splitBirthDate = (birthDate as string).split('-');
        const birthYear = parseInt(splitBirthDate[0]);
        const birthMonth = parseInt(splitBirthDate[1]);
        const birthDay = parseInt(splitBirthDate[2]);
        console.log(splitBirthDate, birthYear, birthMonth, birthDay)

        await db.insert(person).values({
            fullName: fullname as string,
            birthYear: isNaN(birthYear) ? null : birthYear,
            birthMonth: isNaN(birthMonth) ? null : birthMonth,
            birthDate: isNaN(birthDay) ? null : birthDay,
            birthCity: birthCity ? birthCity as string : null,
            birthCountry: birthCountry ? birthCountry as string : null,
        })

        return { success: true };
    }
}
