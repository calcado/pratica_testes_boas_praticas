import prisma from "../../src/config/database"
import {faker} from "@faker-js/faker"
import createConsole from "./consoles-factory"

export default async function createGame(){
    const console = await createConsole()
    return await prisma.game.create({
        data:{

        title: faker.name.firstName(),
        consoleId: console.id,

        }
    })
}