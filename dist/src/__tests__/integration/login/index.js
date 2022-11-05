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
describe("/login", () => {
    let connection;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield data_source_1.default.initialize()
            .then((res) => {
            connection = res;
        })
            .catch((e) => {
            console.error("Error during DataSource inicialization", e);
        });
        yield (0, supertest_1.default)(app_1.default).post("/users").send(mocks_1.mockedUser);
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield connection.destroy();
    }));
    test("POST/login - should be able to login and return token", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default).post("/login").send(mocks_1.mockedUserLogin);
        expect(res.body).toHaveProperty("token");
        expect(res.status).toBe(200);
    }));
    test("POST/login - should not be able to login a user without email", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(mocks_1.mockedLoginErrorFieldEmail);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("email is a field required");
        expect(res.status).toBe(400);
    }));
    test("POST/login - should not be able to login a user without password", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app_1.default)
            .post("/login")
            .send(mocks_1.mockedLoginErrorFieldPassword);
        expect(res.body).toHaveProperty("message");
        expect(res.body.message).toEqual("password is a field required");
        expect(res.status).toBe(400);
    }));
});
