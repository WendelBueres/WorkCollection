"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = __importDefault(require("../../../data-source"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
const mocks_1 = require("../../mocks");
let projectIdTest;
describe("/projects", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then((res) => {
            connection = res;
        })
            .catch((e) => {
            console.error("Error during DataSource inicialization", e);
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("POST/projects - must be able to create the project", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUser);
        mocks_1.mockedProject.userId = user.body.id;
        const res = yield (0, supertest_1.default)(app_1.default).post("/projects").send(mocks_1.mockedProject);
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
    }));
    test("PATCH/projects - must be able to patch the project", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .patch(`/projects/${projectIdTest}`)
            .send(mocks_1.mockedProjectPatchName);
        expect(res.body).toHaveProperty("name");
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("category");
        expect(res.body).toHaveProperty("image");
        expect(res.body).toHaveProperty("technology");
        expect(res.body).toHaveProperty("userId");
        expect(res.body.name).toBe("Flores Online");
        expect(res.status).toBe(200);
    }));
    test("PATCH/projects - must not be able to alter project id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .patch(`/projects/${projectIdTest}`)
            .send(mocks_1.mockedProjectPatchId);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("id is read only");
        expect(res.status).toBe(400);
    }));
});
