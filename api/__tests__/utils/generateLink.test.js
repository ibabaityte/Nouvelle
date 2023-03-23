import {generateLink} from "../../utils/scrapeUtils.js";

describe("Link generation __tests__", () => {
    test("Returns the generated link", () => {
        const result = generateLink(1, "kremas", 0, 0, 0);
        expect(result).toBeTruthy();
        expect(result.length).toBeGreaterThanOrEqual(1);
    });
});
