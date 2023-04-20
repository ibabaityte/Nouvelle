import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import {button} from "../../styles/ButtonGroupStyles";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const SortButtons = (props) => {
    const {
        sortParam,
        applySort
    } = props;
    return (
        <div>
            <ButtonGroup variant="outlined">
                <Button
                    sx={button}
                    onClick={(e) => applySort(e)}
                    value="relevance"
                    disabled={sortParam === "relevance"}
                >Aktualumą</Button>
                <Button
                    sx={button}
                    onClick={(e) => applySort(e)}
                    value="priceAsc"
                    disabled={sortParam === "priceAsc"}
                >
                    Kainą
                    <ArrowDownwardIcon
                        onClick={() => applySort({target: {value: "priceAsc"}})}
                    />
                </Button>
                <Button
                    sx={button}
                    onClick={(e) => applySort(e)}
                    value="priceDesc"
                    disabled={sortParam === "priceDesc"}
                >Kainą
                    <ArrowUpwardIcon
                        onClick={() => applySort({target: {value: "priceDesc"}})}
                    />
                </Button>
                <Button
                    sx={button}
                    onClick={(e) => applySort(e)}
                    value="az"
                    disabled={sortParam === "az"}
                >A-Z</Button>
                <Button
                    sx={button}
                    onClick={(e) => applySort(e)}
                    value="za"
                    disabled={sortParam === "za"}
                >Z-A</Button>
            </ButtonGroup>
        </div>
    );
}

export default SortButtons;
