import supertest from "supertest";
import app from "app";
import prisma from "config/database";
import httpStatus from "http-status";
import createConsole from "./factories/consoles-factory";

beforeEach(async () => {
    await prisma.console.deleteMany({});
  });

const api = supertest(app);

describe("POST /console", () => {
    it("should respond with status 201 and create a new console", async () => {
        const CreatedConsole = await createConsole();
        const insertedConsole = await prisma.console.findFirst({
          where: {
            name: CreatedConsole.name
          }
        })

        expect(insertedConsole.name).toBe(CreatedConsole.name);
    });
});