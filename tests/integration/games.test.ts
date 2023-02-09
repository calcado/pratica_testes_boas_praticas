import app from "app"
import prisma from "config/database"
import httpStatus from "http-status"
import supertest from "supertest"
import createGame from "../factories/games-factory"
import { cleanDb } from "../helpers"

beforeAll(async ()=>{
    await cleanDb();
})

beforeEach(async()=>{
    await cleanDb();
})

const api = supertest(app)
// get - getId/ post

describe("GET / games", ()=>{

    it("Should responde with status 200 and games body", async ()=>{
        const createdGame = await createGame()

        const result = await app.get("/games")

        expect(result.status).toEqual(httpStatus.OK)
        expect(result.body).toEqual([createdGame])
    })

})