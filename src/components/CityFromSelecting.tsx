import {FC, JSX, useState} from 'react';
import {TextField, Menu, MenuItem} from "@mui/material";

const options = ["Option 1", "Option 2", "Option 3", "Option 4"];

const CityFromSelecting: ({}: {}) => JSX.Element = ({}) => {

    const [selected, setSelected] = useState<string[]>([]);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (option: string) => {
        let newSelection = selected.includes(option)
            ? selected.filter((item) => item !== option)
            : [...selected, option];
        if (newSelection.length > 1) {
            newSelection = newSelection.slice(1);
        }
        setSelected(newSelection);
    };

    return (

        <div>
            <TextField
                variant="outlined"
                value={selected.join(", ")}
                placeholder="Sélectionnez les villes"
                onClick={handleClick}
                sx={{width: "400px"}}
                InputProps={{readOnly: true}}
            />
            <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
                {options.map((option) => (
                    <MenuItem key={option}
                              onClick={() => handleClose(option)}
                              style={{padding: "12px 30px"}}>
                        {selected.includes(option) ? "✔ " : ""}
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default CityFromSelecting;
