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
  });

  afterAll(async () => {
    await connection.destroy();
  });

  test("POST/users - Must be able to create user", async () => {
    const res = await request(app).post("/users").send(mockedUser);

    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("email");
    expect(res.body).toHaveProperty("bio");
    expect(res.body).toHaveProperty("image");
    expect(res.body).not.toHaveProperty("password");
    expect(res.body.name).toEqual("Jonas");
    expect(res.body.email).toEqual("jonas@email.com");
    expect(res.body.image).toEqual(
      "https://media.istockphoto.com/vectors/green-alien-climbs-out-from-the-hole-of-space-with-stars-in-flat-vector-id1173828830?k=20&m=1173828830&s=612x612&w=0&h=bXd7sIQWbx7HJoDbvSb8BELPHZICLzgwioOaVmwIeJE="
    );
    expect(res.body.bio).toEqual("Olá, eu sou um dev!");
    expect(res.status).toBe(201);
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
