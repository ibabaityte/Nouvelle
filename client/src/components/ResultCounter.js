import React from "react";
import {resultCounter} from "../styles/ResultCounterStyles";

const ResultCounter = (props) => {
    const {
        pageSize,
        results
    } = props;

    return(
        <div>
            {
                results.length > 0 ?
                    <h3 style={resultCounter}>Rasta {results.length} produktų {pageSize} puslapiuose</h3>
                    :
                    <h3 style={resultCounter}>Pradėk paiešką</h3>
            }
        </div>
    );
};

export default ResultCounter;
