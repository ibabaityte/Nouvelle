import NodeCache from "node-cache";

const myCache = new NodeCache({
    stdTTL: 300000
});

export {myCache};
