import React from "react";
import {resultCounter} from "../styles/ResultCounterStyles";
import {errorElement} from "../styles/SearchStyles";

const ErrorIndicator = (props) => {
    const {
        errorMessage
    } = props;

    return (
        <div style={errorElement}>
            <h3 style={resultCounter}>{errorMessage}</h3>
        </div>
    );
};

export default ErrorIndicator;
