import React from "react";
import {pagination} from "../styles/PaginationStyles";
import ReactPaginate from 'react-paginate';
import "../App.css";

const PaginationPanel = (props) => {
    const {
        pages,
        setActivePage
    } = props;

    return (
        <div id="pagination" style={pagination}>
            {
                pages.length > 0 ?
                    <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    previousLabel="<"
                    onPageChange={(e) => setActivePage(e.selected)}
                    pageRangeDisplayed={2}
                    pageCount={pages.length}
                />
                    : null
            }
        </div>
    );
};

export default PaginationPanel;
