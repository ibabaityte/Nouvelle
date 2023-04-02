import React from "react";

const Pagination = (props) => {
    const {
        pages,
        activePage,
        setActivePage
    } = props;

    return(
        <div>
            {pages.length > 0 ?
                <button
                    disabled={activePage === 0}
                    onClick={() => setActivePage(activePage - 1)}
                >{`<`}</button>
                : ''
            }
            {pages.map((page, index) => {
                return <button
                    key={`pageBtn-${index}`}
                    disabled={index === activePage}
                    onClick={() => setActivePage(index)}
                >{index + 1}</button>
            })}
            {pages.length > 0 ?
                <button
                    disabled={activePage === pages.length - 1}
                    onClick={() => setActivePage(activePage + 1)}
                >{`>`}</button>
                : ''
            }
        </div>
    );
};

export default Pagination;
