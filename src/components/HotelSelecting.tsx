import {FC, useState} from "react";
import {TextField, Menu, MenuItem} from "@mui/material";

const options = ["3 étoiles", "4 étoiles", "5 étoiles"];

const HotelSelecting: FC<{}> = ({}) => {
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
                className="hotel-input-selecting"
                variant="outlined"
                value={selected.join(", ")}
                placeholder="Type here"
                onClick={handleClick}
                sx={{width: "400px"}}
                InputProps={{readOnly: true}}
            />
            <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
                {options.map((option) => (
                    <MenuItem key={option}
                              onClick={() => handleClose(option)}
                              style={{padding: "12px 50px 12px 20px"}}>
                        {selected.includes(option) ? "✔ " : ""}
                        {option}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default HotelSelecting;