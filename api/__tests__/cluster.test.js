import {initCluster} from "../utils/scrapeUtils.js";

describe("Cluster init __tests__", () => {
    test("Returns a cluster object", async () => {
        const cluster = await initCluster();
        await cluster.close();
        expect(cluster).toBeTruthy();
        expect(cluster && typeof cluster === 'object').toBe(true);
        expect(cluster.options.maxConcurrency).toBe(4);
    });
});
