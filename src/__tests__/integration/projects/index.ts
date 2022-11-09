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
} from "../../mocks";
import { ITechRegister, ITechs } from "../../../interfaces/techs";

let projectIdTest: string;
let techArray: ITechRegister[];
let tech: { id: string };
let tech2: { id: string };
let tech3: { id: string };
let token: string;

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
});
