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
exports.createdUserIdTest = void 0;
const data_source_1 = __importDefault(require("../../../data-source"));
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../../app"));
const mocks_1 = require("../../mocks");
let createdUserIdTest;
exports.createdUserIdTest = createdUserIdTest;
describe("/users", () => {
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
    test("POST/users - Must be able to create user", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUser);
        expect(res.body).toHaveProperty("id");
        exports.createdUserIdTest = createdUserIdTest = res.body.id;
        expect(res.body).toHaveProperty("name");
        expect(res.body).toHaveProperty("email");
        expect(res.body).toHaveProperty("bio");
        expect(res.body).toHaveProperty("image");
        expect(res.body).not.toHaveProperty("password");
        expect(res.body.name).toEqual("Jonas");
        expect(res.body.email).toEqual("jonas@email.com");
        expect(res.body.image).toEqual("https://media.istockphoto.com/vectors/green-alien-climbs-out-from-the-hole-of-space-with-stars-in-flat-vector-id1173828830?k=20&m=1173828830&s=612x612&w=0&h=bXd7sIQWbx7HJoDbvSb8BELPHZICLzgwioOaVmwIeJE=");
        expect(res.body.bio).toEqual("Olá, eu sou um dev!");
        expect(res.status).toBe(201);
    }));
    test("POST/users - should not be able to create a user that already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUser);
        expect(res.body).toHaveProperty("message");
        expect(res.status).toBe(400);
    }));
    test("POST/users - should not be able to create a user that already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUser);
        expect(res.body).toHaveProperty("message");
        expect(res.status).toBe(400);
    }));
    test("POST/users - must not be able to create a user without name", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserErrorName);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("name is a field required");
        expect(res.status).toBe(400);
    }));
    test("POST/users - must not be able to create a user without email", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserErrorEmail);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("email is a field required");
        expect(res.status).toBe(400);
    }));
    test("POST/users - must not be able to create a user without bio", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserErrorBio);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("bio is a field required");
        expect(res.status).toBe(400);
    }));
    test("POST/users - must not be able to create a user without password", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUserErrorPassword);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("password is a field required");
        expect(res.status).toBe(400);
    }));
    test("PATCH/users - should be able to change email", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .patch(`/users/${createdUserIdTest}`)
            .send(mocks_1.mockedUserPatch);
        expect(res.body).toHaveProperty("email");
        expect(res.body.email).toEqual("james@mail.com");
        expect(res.status).toBe(200);
    }));
    test("PATCH/users - must not be able to alter user id", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .patch(`/users/${createdUserIdTest}`)
            .send(mocks_1.mockedUserPatchId);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("id is read only");
        expect(res.status).toBe(400);
    }));
});
