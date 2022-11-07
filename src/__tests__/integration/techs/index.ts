import { DataSource } from "typeorm";
import AppDataSource from "../../../data-source";
import request from "supertest";
import app from "../../../app";
import { MockedPatchTestTech, MockedPatchTestTechID, mockedTechPost, mockedUser, mockedUserLogin } from "../../mocks";

let token: string;
let techIdTest: string;

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

    test("POST/technologies - must be able to create the tech", async () => {
        await request(app).post("/users").send(mockedUser)
        const login = await request(app).post("/login").send(mockedUserLogin);
        token = login.body.token;
        token = `Bearer ${token}`;
        const res = await request(app)
            .post("/technologies")
            .set("Authorization", token)
            .send(mockedTechPost)

        expect(res.body).toHaveProperty("name");
        expect(res.body).toHaveProperty("id");
        techIdTest = res.body.id

        expect(res.status).toBe(201)
    })

    test("PATCH/technologies - must be able to patch the tech", async () => {
        const res = await request(app)
        .patch(`/technologies/${techIdTest}`)
        .set("Authorization", token)
        .send(MockedPatchTestTech);

        expect(res.body).toHaveProperty("name")
        expect(res.body.name).toEqual("TypeScript");
        expect(res.status).toBe(200)
    })

    test("PATCH/technologies - must not be able to alter tech id", async () => {
        const res = await request(app)
            .patch(`/technologies/${techIdTest}`)
            .set("Authorization", token)
            .send(MockedPatchTestTechID);
    
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("id is read only");
        expect(res.status).toBe(400);
    });

    test("DELETE/technologies - should be able to delete all tech", async () => {
        const res = await request(app).delete(`/technologies/${techIdTest}/`).send();
        expect(res.status).toBe(204);
    });

})