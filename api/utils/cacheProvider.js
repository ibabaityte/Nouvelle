import NodeCache from "node-cache";

const myCache = new NodeCache({
    stdTTL: 500000
});

export {myCache};
