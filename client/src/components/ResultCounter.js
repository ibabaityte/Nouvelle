import React from "react";

const ResultCounter = (props) => {
    const {
        pages,
        results
    } = props;

    return(
        <div>Found {results.length} items in {pages.length} pages</div>
    );
};

export default ResultCounter;
