import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { MockedPatchTestTech, mockedTechPost, mockedUserLogin } from "../../mocks";

let token: string;
let techIdTest: string

describe("/technologies", () => {
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

    test("POST/technologies", async () => {
        const login = await request(app).post("/login").send(mockedUserLogin);
        token = login.body.token;
        token = `Bearer ${token}`;
        const res = await request(app).post("/technologies").set("Authorization", token).send(mockedTechPost)
        expect(res.body).toHaveProperty("id");
        techIdTest = res.body.id
        expect(res.body).toHaveProperty("name");
        expect(res.body).toHaveProperty("userId")

        expect(res.status).toBe(201)
    })

    test("PATCH/technologies", async () => {
        const res = await request(app)
        .patch(`/projects/${techIdTest}`)
        .set("Authorization", token)
        .send(MockedPatchTestTech);

        expect(res.body.name).toBe("JavaScript");
        expect(res.status).toBe(200)
    })

})