import app from "app";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import createConsole from "../factories/consoles-factory";
import createGame from "../factories/games-factory";
import  cleanDb  from "../helpers";
import prisma from "../../src/config/database"


beforeAll(async () => {
  await cleanDb();
});

beforeEach(async () => {
  await cleanDb();
});

const api = supertest(app);
// get - getId/ post

describe("GET / games", () => {
  it("Should respond with status 200 and games body", async () => {
    const console = await createConsole()
    const game = await createGame(console.id)

    const result = await api.get("/games");

    expect(result.status).toEqual(httpStatus.OK);
    expect(result.body).toEqual([{

      id: expect.any(Number),
      title: expect.any(String),      
      consoleId: expect.any(Number),
      console:{
        id:console.id,
        name:console.name
      }
    }]);
  });
});

describe("POST / games", () => {
  it("Should respond with status 201 and created game", async () => {
    const console = await createConsole();
    const newGame = {
      title: faker.name.firstName(),
      consoleId: console.id,
    };

    const result = await api.post("/game").send(newGame);
    const insertedGame = await prisma.game.findFirst({
      where:{
        title: newGame.title
      }
    })

    expect(result.status).toEqual(httpStatus.OK);
    expect(insertedGame.title).toBe(newGame.title);
  });

  it("Should respond with status 409 when conflicted", async()=>{
    const createdGame = await createGame()
    const newGame = 
        {
            title: createdGame.title,
            consoleId: createdGame.consoleId
        }
    

    const response = await api.post("games").send(newGame)
    
    expect(response.status).toEqual(httpStatus.CONFLICT)

    
  })
});
