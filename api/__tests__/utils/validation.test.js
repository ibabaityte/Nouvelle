import {validateRequest, validateResults} from "../../utils/validation.js";

describe("Request validation __tests__", () => {
    test("Returns true when all params present", () => {
        const req = {
            query: {
                query: "query",
                currentPage: 0,
                kristianaCurrentPage: 0,
                productOffset: 10
            }
        };
        const result = validateRequest(req);
        expect(result).toBeTruthy();
    });

    test("Returns false when product offset missing", () => {
        const req = {
            query: {
                query: "query",
                currentPage: 0,
                kristianaCurrentPage: 0
            }
        };
        const result = validateRequest(req);
        expect(result).toBeFalsy();
    });
});

describe("Result validation __tests__", () => {
    test("Returns true when results are found", () => {
        const results = [
            {
                link: "link",
                name: "name",
                price: "price",
                image: "image"
            }
        ];
        const result = validateResults(results);
        expect(result).toBeTruthy();
    });

    test("Returns false when results are not found", () => {
        const results = [];
        const result = validateResults(results);
        expect(result).toBeFalsy();
    });
});
