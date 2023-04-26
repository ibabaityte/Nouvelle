import React from "react";
import {resultCounter} from "../styles/ResultCounterStyles";
import {searchElement} from "../styles/SearchStyles";

const ResultCounter = (props) => {
    const {
        pages,
        results
    } = props;

    return(
        <div style={searchElement}>
            {
                results.length > 0 ?
                    <h3 style={resultCounter}>Rasta {results.length} produktų {pages.length} puslapiuose</h3>
                    :
                    <h3 style={resultCounter}>Pradėk paiešką</h3>
            }
        </div>
    );
};

export default ResultCounter;
