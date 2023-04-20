const searchElement = {
    height: "20vh",
    minHeight: "200px",
    width: "90%",
    margin: "0 auto",
    marginTop: "20px",
    borderRadius: "20px",
    background: "linear-gradient(90deg, rgba(188,86,251,1) 0%, rgba(214,200,68,1) 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gridArea: "1 / 1"
}

const searchWrapper = {
    backgroundColor: "white",
    gridArea: "1 / 1",
    margin: "180px auto 50px auto",
    width: "50%",
    height: "15%",
    minHeight: "50px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "-2px 15px 41px -2px rgba(198,129,181,0.75)",
    padding: "5px"
}

const searchForm = {
    display: "flex",
    flexDirection: "row",
    width: "90%",
    alignItems: "center",
    justifyContent: "center"
}

const searchInput = {
    width: "70%",
    "& .css-aqpgxn-MuiFormLabel-root-MuiInputLabel-root": {
        lineHeight: "0.8"
    },
    '& .css-v4u5dn-MuiInputBase-root-MuiInput-root:before': {
        border: "0"
    },
    '& .css-v4u5dn-MuiInputBase-root-MuiInput-root:after': {
        border: "0"
    },
    label: {
        color: "rgb(193,109,214) !important"
    },
}

const searchButton = {
    border: "0",
    height: "30px",
    backgroundColor: "rgb(193,109,214)",
    color: "white",
    marginLeft: "5px",
    "&:hover": {
        border: "0",
        backgroundColor: "rgba(193,109,214, 0.5)"
    }
}

export {
    searchElement,
    searchWrapper,
    searchInput,
    searchButton,
    searchForm
}
