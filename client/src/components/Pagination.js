import React from "react";
import { Button, ButtonGroup } from "@mui/material";
import {button} from "../styles/ButtonGroupStyles";
import {pagination} from "../styles/PaginationStyles";

const Pagination = (props) => {
    const {
        pages,
        activePage,
        setActivePage
    } = props;

    return (
        <div id="pagination" style={pagination}>
            <ButtonGroup variant="outlined">
                {pages.length > 0 ?
                    <Button
                        sx={button}
                        disabled={activePage === 0}
                        onClick={() => setActivePage(activePage - 1)}
                    >{`<`}</Button>
                    : ''
                }
                {pages.map((page, index) => {
                    return <Button
                        key={`pageBtn-${index}`}
                        sx={button}
                        disabled={index === activePage}
                        onClick={() => setActivePage(index)}
                    >{index + 1}</Button>
                })}
                {pages.length > 0 ?
                    <Button
                        sx={button}
                        disabled={activePage === pages.length - 1}
                        onClick={() => setActivePage(activePage + 1)}
                    >{`>`}</Button>
                    : ''
                }
            </ButtonGroup>
        </div>
    );
};

export default Pagination;
