const validateRequest = (request) => {
    if (request.query.query === undefined || request.query.query.length < 1) {
        return false;
    }
    if (request.query.currentPage === undefined) {
        return false;
    }
    if (request.query.kristianaCurrentPage === undefined) {
        return false;
    }
    if (request.query.productOffset === undefined) {
        return false;
    }
    return true;
}

const validateResults = (results) => {
    return results.length > 0;
}

export {validateRequest, validateResults}
