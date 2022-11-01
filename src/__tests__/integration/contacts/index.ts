import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedContact,
  mockedContactGithub,
  mockedContactLinkedin,
  mockedContactPhone,
} from "../../mocks";

describe("/contacts", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((e) => {
        console.error("Error during DataSource inicialization", e);
      });
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST/contacts - must be able to create the contacts", async () => {
    const res = await request(app).post("/contacts").send(mockedContact);

    expect(res.body).toHaveProperty("userId");
    expect(res.body).toHaveProperty("github");
    expect(res.body).toHaveProperty("linkedin");
    expect(res.body).toHaveProperty("phone");
    expect(res.body.github).toBe("github.com/linkuser");
    expect(res.body.linkedin).toBe("linkedin.com/linkuser");
    expect(res.body.phone).toBe("+55 96 99999-9999");
    expect(res.status).toBe(201);
  });

  test("PATCH/contacts - must be able to patch the contacts", async () => {
    const res = await request(app).patch("/contacts").send(mockedContactGithub);

    expect(res.body).toHaveProperty("userId");
    expect(res.body).toHaveProperty("github");
    expect(res.body).toHaveProperty("linkedin");
    expect(res.body).toHaveProperty("phone");
    expect(res.body.github).toBe("github.com/newlinkuser");
    expect(res.status).toBe(200);
  });

  test("PATCH/contacts - must be able to patch the contacts", async () => {
    const res = await request(app)
      .patch("/contacts")
      .send(mockedContactLinkedin);

    expect(res.body).toHaveProperty("userId");
    expect(res.body).toHaveProperty("github");
    expect(res.body).toHaveProperty("linkedin");
    expect(res.body).toHaveProperty("phone");
    expect(res.body.linkedin).toBe("linkedin.com/newlinkuser");
    expect(res.status).toBe(200);
  });

  test("PATCH/contacts - must be able to patch the contacts", async () => {
    const res = await request(app).patch("/contacts").send(mockedContactPhone);

    expect(res.body).toHaveProperty("userId");
    expect(res.body).toHaveProperty("github");
    expect(res.body).toHaveProperty("linkedin");
    expect(res.body).toHaveProperty("phone");
    expect(res.body.phone).toBe("+55 96 98200-0000");
    expect(res.status).toBe(200);
  });
});
