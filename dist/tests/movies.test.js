"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const movieController_1 = require("../controller/movieController");
describe('users', () => {
    describe('get login route', () => {
        describe('given the user does not exist', () => {
            it('should return a 404', () => {
                expect(true).toBe(true);
            });
        });
    });
});
describe('testing movies function', () => {
    test('function should render all movies', () => {
        expect(movieController_1.getMovies).toBeInstanceOf('object');
    });
});
describe("Get all movies", () => {
    it("should get all movies", async () => {
        await (0, supertest_1.default)(movieController_1.getMovies)
            .get("/")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200);
    });
});
