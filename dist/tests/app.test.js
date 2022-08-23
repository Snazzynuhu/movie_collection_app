"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = require("typescript");
describe('Sample Test', () => {
    (0, typescript_1.idText)('should test that true === true', () => {
        expect(true).toBe(true);
    });
});
