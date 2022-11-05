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
describe("/contacts", () => {
    let userId;
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
    test("PATCH/contacts - must be able to patch the contacts", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUser);
        userId = yield user.body.id;
        const res = yield (0, supertest_1.default)(app_1.default)
            .patch(`/contacts/${userId}`)
            .send(mocks_1.mockedContactGithub);
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("github");
        expect(res.body).toHaveProperty("linkedin");
        expect(res.body).toHaveProperty("phone");
        expect(res.body.github).toBe("github.com/newlinkuser");
        expect(res.status).toBe(200);
    }));
    test("PATCH/contacts - must be able to patch the contacts", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .patch(`/contacts/${userId}`)
            .send(mocks_1.mockedContactLinkedin);
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("github");
        expect(res.body).toHaveProperty("linkedin");
        expect(res.body).toHaveProperty("phone");
        expect(res.body.linkedin).toBe("linkedin.com/newlinkuser");
        expect(res.status).toBe(200);
    }));
    test("PATCH/contacts - must be able to patch the contacts", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .patch(`/contacts/${userId}`)
            .send(mocks_1.mockedContactPhone);
        expect(res.body).toHaveProperty("id");
        expect(res.body).toHaveProperty("github");
        expect(res.body).toHaveProperty("linkedin");
        expect(res.body).toHaveProperty("phone");
        expect(res.body.phone).toBe("+55 96 98200-0000");
        expect(res.status).toBe(200);
    }));
    test("PATCH/contacts - must not be able to alter user id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .patch(`/contacts/${userId}`)
            .send(mocks_1.mockedContactPatchId);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("id is read only");
        expect(res.status).toBe(400);
    }));
    test("DELETE/contacts - should be able to delete contact github", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).delete(`/contacts/${userId}/github`).send();
        expect(res.status).toBe(204);
    }));
    test("DELETE/contacts - should be able to delete all contacts", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).delete(`/contacts/${userId}/`).send();
        expect(res.status).toBe(204);
    }));
});
