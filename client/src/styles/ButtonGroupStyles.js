const label = {
    fontWeight: "700",
    marginRight: "15px",
    fontFamily: 'Abel, sans-serif',
    color: "rgb(193,109,214)"
}

const button = {
    border: "2px solid rgba(193,109,214,0.5)",
    fontWeight: "700",
    color: "rgb(193,109,214) !important",
    "&:hover": {
        border: "2px solid rgba(193,109,214)",
    },
    "&:disabled":{
        border: "0",
        backgroundColor: "rgba(193,109,214, 0.5)",
        color: "rgb(255,255,255) !important"
    }
}

export {
    label,
    button
}
