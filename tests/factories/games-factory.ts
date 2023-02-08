import prisma from "../../src/config/database"
import {faker} from "@faker-js/faker"

export default async function createGame(){
    
    return prisma.game.create({
        name:
        consoleId:
    })
   

}