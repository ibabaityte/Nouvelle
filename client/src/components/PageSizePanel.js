import React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import {Button} from "@mui/material";
import {pageSizePanel} from "../styles/PageSizePanelStyles";
import {button, label} from "../styles/ButtonGroupStyles";

const PageSizePanel = (props) => {
    const {
        changePageSize,
        pageSize
    } = props;

    return(
        <div style={pageSizePanel}>
            <div style={label}>Rodyti:</div>
            <ButtonGroup variant="outlined">
                <Button
                    sx={button}
                    onClick={e => changePageSize(e)}
                    value={10}
                    disabled={pageSize === 10}
                >10</Button>
                <Button
                    sx={button}
                    onClick={e => changePageSize(e)}
                    value={20}
                    disabled={pageSize === 20}
                >20</Button>
                <Button
                    sx={button}
                    onClick={e => changePageSize(e)}
                    value={50}
                    disabled={pageSize === 50}
                >50</Button>
            </ButtonGroup>
        </div>
    );
};

export default PageSizePanel;
