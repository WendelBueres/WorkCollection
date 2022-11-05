import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedProject,
  mockedProjectPatchId,
  mockedProjectPatchName,
  mockedUser,
} from "../../mocks";

let projectIdTest: string;

describe("/projects", () => {
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

  test("POST/projects - must be able to create the project", async () => {
    const user = await request(app).post("/users").send(mockedUser);
    mockedProject.userId = user.body.id;
    const res = await request(app).post("/projects").send(mockedProject);

    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("id");
    projectIdTest = res.body.id;
    expect(res.body).toHaveProperty("category");
    expect(res.body).toHaveProperty("image");
    expect(res.body).toHaveProperty("technology");
    expect(res.body).toHaveProperty("userId");
    expect(res.body.name).toBe("Floricultura Online");
    expect(res.body.image).toBe("imageproject.com/img.jpeg");
    expect(res.body.link).toBe("floresonline.com");
    expect(res.status).toBe(201);
  });

  test("PATCH/projects - must be able to patch the project", async () => {
    const res = await request(app)
      .patch(`/projects/${projectIdTest}`)
      .send(mockedProjectPatchName);

    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("category");
    expect(res.body).toHaveProperty("image");
    expect(res.body).toHaveProperty("technology");
    expect(res.body).toHaveProperty("userId");
    expect(res.body.name).toBe("Flores Online");
    expect(res.status).toBe(200);
  });

  test("PATCH/projects - must not be able to alter project id", async () => {
    const res = await request(app)
      .patch(`/projects/${projectIdTest}`)
      .send(mockedProjectPatchId);

    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toEqual("id is read only");
    expect(res.status).toBe(400);
  });
});
