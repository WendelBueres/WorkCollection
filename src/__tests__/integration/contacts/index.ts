import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedContactGithub,
  mockedContactLinkedin,
  mockedContactPatchId,
  mockedContactPhone,
  mockedUser,
} from "../../mocks";

describe("/contacts", () => {
  let userId: string;
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

  test("PATCH/contacts - must be able to patch the contacts", async () => {
    const user = await request(app).post("/users").send(mockedUser);
    userId = await user.body.id;
    const res = await request(app)
      .patch(`/contacts/${userId}`)
      .send(mockedContactGithub);

    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("github");
    expect(res.body).toHaveProperty("linkedin");
    expect(res.body).toHaveProperty("phone");
    expect(res.body.github).toBe("github.com/newlinkuser");
    expect(res.status).toBe(200);
  });

  test("PATCH/contacts - must be able to patch the contacts", async () => {
    const res = await request(app)
      .patch(`/contacts/${userId}`)
      .send(mockedContactLinkedin);

    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("github");
    expect(res.body).toHaveProperty("linkedin");
    expect(res.body).toHaveProperty("phone");
    expect(res.body.linkedin).toBe("linkedin.com/newlinkuser");
    expect(res.status).toBe(200);
  });

  test("PATCH/contacts - must be able to patch the contacts", async () => {
    const res = await request(app)
      .patch(`/contacts/${userId}`)
      .send(mockedContactPhone);

    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("github");
    expect(res.body).toHaveProperty("linkedin");
    expect(res.body).toHaveProperty("phone");
    expect(res.body.phone).toBe("+55 96 98200-0000");
    expect(res.status).toBe(200);
  });

  test("PATCH/contacts - must not be able to alter user id", async () => {
    const res = await request(app)
      .patch(`/contacts/${userId}`)
      .send(mockedContactPatchId);

    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toEqual("id is read only");
    expect(res.status).toBe(400);
  });

  test("DELETE/contacts - should be able to delete contact github", async () => {
    const res = await request(app).delete(`/contacts/${userId}/github`).send();
    expect(res.status).toBe(204);
  });

  test("DELETE/contacts - should be able to delete all contacts", async () => {
    const res = await request(app).delete(`/contacts/${userId}/`).send();
    expect(res.status).toBe(204);
  });
});
