import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import {
  mockedProject,
  mockedProjectPatchId,
  mockedProjectPatchName,
  mockedTech,
  mockedTech2,
  mockedTech3,
  mockedUser,
  mockedUserLogin,
  mockedUserLogin2,
} from "../../mocks";
import { ITechRegisterRegister } from "../../../interfaces/techs";

let projectIdTest: string;
let techArray: ITechRegisterRegister[];
let tech: { id: string };
let tech2: { id: string };
let tech3: { id: string };
let techName: { name: string };
let techName2: { name: string };
let techName3: { name: string };
let token: string;
let token2: string;

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

  test("POST/projects - should be able to create project by passing technology id and name", async () => {
    await request(app).post("/users").send(mockedUser);
    const login = await request(app).post("/login").send(mockedUserLogin);
    token = login.body.token;
    token = `Bearer ${token}`;
    const resTech1 = await request(app)
      .post("/technologies")
      .set("Authorization", token)
      .send(mockedTech);
    const resTech2 = await request(app)
      .post("/technologies")
      .set("Authorization", token)
      .send(mockedTech2);
    const resTech3 = await request(app)
      .post("/technologies")
      .set("Authorization", token)
      .send(mockedTech3);
    tech = { id: resTech1.body.id };
    tech2 = { id: resTech2.body.id };
    tech3 = { id: resTech3.body.id };
    techName = { name: resTech1.body.name };
    techName2 = { name: resTech2.body.name };
    techName3 = { name: resTech3.body.name };
    techArray = [tech, techName, tech3];
    mockedProject.techsId = techArray;
    const res = await request(app)
      .post("/projects")
      .set("Authorization", token)
      .send(mockedProject);

    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("id");
    projectIdTest = res.body.id;
    expect(res.body).toHaveProperty("category");
    expect(res.body).toHaveProperty("image");
    expect(res.body).toHaveProperty("techs");
    expect(res.body.name).toBe("Floricultura Online");
    expect(res.body.image).toBe("imageproject.com/img.jpeg");
    expect(res.body.link).toBe("floresonline.com");
    expect(res.status).toBe(201);
  });

  test("POST/projects - should be able to create project by passing technology name", async () => {
    techArray = [techName, techName2, techName3];
    mockedProject.techsId = techArray;
    const res = await request(app)
      .post("/projects")
      .set("Authorization", token)
      .send(mockedProject);

    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("id");
    projectIdTest = res.body.id;
    expect(res.body).toHaveProperty("category");
    expect(res.body).toHaveProperty("image");
    expect(res.body).toHaveProperty("techs");
    expect(res.body.name).toBe("Floricultura Online");
    expect(res.body.image).toBe("imageproject.com/img.jpeg");
    expect(res.body.link).toBe("floresonline.com");
    expect(res.status).toBe(201);
  });

  test("POST/projects - should be able to create project by passing technology id", async () => {
    techArray = [tech, tech2, tech3];
    mockedProject.techsId = techArray;
    const res = await request(app)
      .post("/projects")
      .set("Authorization", token)
      .send(mockedProject);

    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("id");
    projectIdTest = res.body.id;
    expect(res.body).toHaveProperty("category");
    expect(res.body).toHaveProperty("image");
    expect(res.body).toHaveProperty("techs");
    expect(res.body.name).toBe("Floricultura Online");
    expect(res.body.image).toBe("imageproject.com/img.jpeg");
    expect(res.body.link).toBe("floresonline.com");
    expect(res.status).toBe(201);
  });

  test("PATCH/projects - it should not be possible to patch project that does not belong to the user", async () => {
    const login2 = await request(app).post("/login").send(mockedUserLogin2);
    token2 = login2.body.token;
    token2 = `Bearer ${token}`;
    const res = await request(app)
      .patch(`/projects/${projectIdTest}`)
      .set("Authorization", token2)
      .send(mockedProjectPatchName);

    expect(res.status).toBe(403);
  });

  test("DELETE/projects - it should not be possible to delete project that does not belong to the user", async () => {
    const res = await request(app)
      .delete(`/projects/${projectIdTest}`)
      .set("Authorization", token2)
      .send(mockedProjectPatchName);

    expect(res.status).toBe(403);
  });

  test("PATCH/projects - must be able to patch the project", async () => {
    const login = await request(app).post("/login").send(mockedUserLogin);
    token = login.body.token;
    token = `Bearer ${token}`;
    const res = await request(app)
      .patch(`/projects/${projectIdTest}`)
      .set("Authorization", token)
      .send(mockedProjectPatchName);

    expect(res.body).toHaveProperty("name");
    expect(res.body).toHaveProperty("id");
    expect(res.body).toHaveProperty("category");
    expect(res.body).toHaveProperty("image");
    expect(res.body).toHaveProperty("techs");
    expect(res.body.name).toBe("Flores Online");
    expect(res.status).toBe(200);
  });

  test("PATCH/projects - must not be able to alter project id", async () => {
    const res = await request(app)
      .patch(`/projects/${projectIdTest}`)
      .set("Authorization", token)
      .send(mockedProjectPatchId);

    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toEqual("id is read only");
    expect(res.status).toBe(400);
  });

  test("DELETE/projects - must be able to delete the project", async () => {
    const res = await request(app)
      .delete(`/projects/${projectIdTest}`)
      .set("Authorization", token)
      .send(mockedProjectPatchName);

    expect(res.status).toBe(204);
  });
});
