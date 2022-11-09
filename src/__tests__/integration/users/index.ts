import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedUser,
  mockedUserErrorBio,
  mockedUserErrorEmail,
  mockedUserErrorName,
  mockedUserErrorPassword,
  mockedUserLogin,
  mockedUserPatch,
  mockedUserPatchId,
} from "../../mocks";

let createdUserIdTest: string;
let token: string;

describe("/users", () => {
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
    createdUserIdTest = res.body.id;
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

  test("POST/users - should not be able to create a user that already exists", async () => {
    const res = await request(app).post("/users").send(mockedUser);

    expect(res.body).toHaveProperty("message");
    expect(res.status).toBe(400);
  });

  test("POST/users - should not be able to create a user that already exists", async () => {
    const res = await request(app).post("/users").send(mockedUser);

    expect(res.body).toHaveProperty("message");
    expect(res.status).toBe(400);
  });

  test("POST/users - must not be able to create a user without name", async () => {
    const res = await request(app).post("/users").send(mockedUserErrorName);

    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toEqual("name is a field required");
    expect(res.status).toBe(400);
  });

  test("POST/users - must not be able to create a user without email", async () => {
    const res = await request(app).post("/users").send(mockedUserErrorEmail);

    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toEqual("email is a field required");
    expect(res.status).toBe(400);
  });

  test("POST/users - must not be able to create a user without bio", async () => {
    const res = await request(app).post("/users").send(mockedUserErrorBio);

    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toEqual("bio is a field required");
    expect(res.status).toBe(400);
  });

  test("POST/users - must not be able to create a user without password", async () => {
    const res = await request(app).post("/users").send(mockedUserErrorPassword);

    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toEqual("password is a field required");
    expect(res.status).toBe(400);
  });

  test("PATCH/users - should be able to change email", async () => {
    const login = await request(app).post("/login").send(mockedUserLogin);
    token = login.body.token;
    token = `Bearer ${token}`;
    const res = await request(app)
      .patch(`/users`)
      .set("Authorization", token)
      .send(mockedUserPatch);

    expect(res.body).toHaveProperty("email");
    expect(res.body.email).toEqual("james@mail.com");
    expect(res.status).toBe(200);
  });

  test("PATCH/users - must not be able to alter user id", async () => {
    const res = await request(app)
      .patch(`/users`)
      .set("Authorization", token)
      .send(mockedUserPatchId);

    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toEqual("id is read only");
    expect(res.status).toBe(400);
  });

  test("GET/users - should be able to list users", async () => {
    const res = await request(app).get("/users");

    expect(res.body).toHaveLength(1);
  });

  test("DELETE/users - should be able to delete user", async () => {
    const res = await request(app)
      .delete(`/users`)
      .set("Authorization", token)
      .send();
    expect(res.status).toBe(204);
  });
});

export { createdUserIdTest };
