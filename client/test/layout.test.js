/**
 * @jest-environment jsdom
 */
const fs = require("fs");
const path = require("path");
const html = fs.readFileSync(
    path.resolve(__dirname, "/client/index.html"),
    "utf8"
);

describe("index.html", () => {
    beforeEach(() => {
        document.documentElement.innerHTML = html.toString();
    });

    describe("head", () => {
        test("it has a title", () => {
            const head = document.querySelector("head");
            expect(head).toBeTruthy();
            expect(head.textContent).toContain("Habitual");
        });

        test("there is a css stylesheet", () => {
            const head = document.querySelector("head");
            expect(head.innerHTML).toContain('link rel="stylesheet"');
        });
    });
});