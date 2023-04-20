import MenuItem from "@mui/material/MenuItem";
import {selectElement, selectOption} from "../../styles/SortSelectStyles";
import TextField from "@mui/material/TextField";

const SortSelect = (props) => {
    const {
        sortParam,
        applySort
    } = props;

    return (
        <TextField
            select
            label="Rūšiuoti"
            sx={selectElement}
            value={sortParam}
            onChange={(e) => applySort(e)}
        >
            <MenuItem value="relevance" sx={selectOption}>Aktualumą</MenuItem>
            <MenuItem value="priceAsc" sx={selectOption}>Kainą mažėjančiai</MenuItem>
            <MenuItem value="priceDesc" sx={selectOption}>Kainą didėjančiai</MenuItem>
            <MenuItem value="az" sx={selectOption}>Abėcėlę A-Z</MenuItem>
            <MenuItem value="za" sx={selectOption}>Abėcėlę Z-A</MenuItem>
        </TextField>
    );
}

export default SortSelect;
