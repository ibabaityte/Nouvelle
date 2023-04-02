import React from "react";

const PageSizePanel = (props) => {
    const {
        changePageSize,
        pageSize
    } = props;

    return(
        <div>
            Page size:
            <button
                onClick={e => changePageSize(e)}
                value={10}
                disabled={pageSize === 10}
            >10</button>
            <button
                onClick={e => changePageSize(e)}
                value={20}
                disabled={pageSize === 20}
            >20</button>
            <button
                onClick={e => changePageSize(e)}
                value={50}
                disabled={pageSize === 50}
            >50</button>
        </div>
    );
};

export default PageSizePanel;
