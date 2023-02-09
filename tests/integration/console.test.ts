import supertest from "supertest";
import app from "../../src/app";
import httpStatus from "http-status";
import createConsole from "../factories/consoles-factory";
import prisma from "../../src/config/database";
import  cleanDb  from "../helpers";

beforeAll(async () => {
  await cleanDb();
});

beforeEach(async () => {
    await cleanDb();
  });

afterAll(async () => {
  await cleanDb();
})

const api = supertest(app);

describe("POST /console", () => {
    it("should respond with status 201 and create a new console", async () => {
        const createdConsole = await createConsole();
        const insertedConsole = await prisma.console.findFirst({
          where: {
            name: createdConsole.name
          }
        })

        expect(insertedConsole.name).toBe(createdConsole.name);
    });

    it("should respond with status 409 and not insert a conflicted console", async () => {
      const createdConsole = await createConsole();
      const response = await api.post("/consoles").send({
        name: createdConsole.name
      });
      console.log(createdConsole)
      console.log(response.body)

      expect(response.status).toBe(httpStatus.CONFLICT);
    });
});

describe("GET /consoles", () => {
  it("should respond with status 200 and list all consoles", async () => {
    await createConsole();
    await createConsole();
    const response = await api.get("/consoles");

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String)
      })
    ]));
  });
});

describe("GET /consoles/:id", () => {
  it("should respond with status 404 if id is not found", async () => {
    const response = await api.get("/consoles/0");

    expect(response.status).toBe(httpStatus.NOT_FOUND);
  });

  it("should respond with status 200 if id is found", async () => {
    const insertedConsole = await createConsole();
    const response = await api.get(`/consoles/${insertedConsole.id}`);

    expect(response.status).toBe(httpStatus.OK);
    expect(response.body).toEqual(expect.objectContaining({
      name: expect.any(String)
    }));
  });
})