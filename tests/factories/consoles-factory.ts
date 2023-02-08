import prisma from "config/database";
import { faker } from '@faker-js/faker';

export default async function() {
    return prisma.console.create({
        data: {
            name: faker.name.fullName()
        }
    })
}