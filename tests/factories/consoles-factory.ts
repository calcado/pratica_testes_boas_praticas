import prisma from "config/database";
import { faker } from '@faker-js/faker';

export default async function createConsole() {
    return await prisma.console.create({
        data: {
            name: faker.name.fullName()
        }
    })
}