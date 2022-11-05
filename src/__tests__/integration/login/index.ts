import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedLoginErrorFieldEmail,
  mockedLoginErrorFieldPassword,
  mockedUser,
  mockedUserLogin,
} from "../../mocks";

describe("/login", () => {
  let connection: DataSource;

  beforeAll(async () => {
    await AppDataSource.initialize()
      .then((res) => {
        connection = res;
      })
      .catch((e) => {
        console.error("Error during DataSource inicialization", e);
      });

    await request(app).post("/users").send(mockedUser);
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST/login - should be able to login and return token", async () => {
    const res = await request(app).post("/login").send(mockedUserLogin);
    expect(res.body).toHaveProperty("token");
    expect(res.status).toBe(200);
  });

  test("POST/login - should not be able to login a user without email", async () => {
    const res = await request(app)
      .post("/login")
      .send(mockedLoginErrorFieldEmail);

    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toEqual("email is a field required");
    expect(res.status).toBe(400);
  });

  test("POST/login - should not be able to login a user without password", async () => {
    const res = await request(app)
      .post("/login")
      .send(mockedLoginErrorFieldPassword);

    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toEqual("password is a field required");
    expect(res.status).toBe(400);
  });
});
