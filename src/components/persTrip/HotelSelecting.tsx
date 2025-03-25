import {FC, useEffect, useState} from "react";
import {TextField, Menu, MenuItem} from "@mui/material";
import {usePersonalizedTrip} from "../../contexts/PersonalizedTripContext";

const options = [4, 5];

const HotelSelecting: FC = () => {
    const {questionnaireAnswers, updateResponse} = usePersonalizedTrip();
    const {hotelStanding} = questionnaireAnswers;
    console.log(questionnaireAnswers)

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    useEffect(() => {
        if (!hotelStanding) {
            updateResponse("hotelStanding", 4);
        }
    }, []);

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (option: number) => {
        updateResponse("hotelStanding", option);
        setAnchorEl(null);
    };

    return (
        <div>
            <TextField
                className="hotel-input-selecting"
                variant="outlined"
                value={`${hotelStanding} star`}
                placeholder="Click here"
                onClick={handleClick}
                sx={{width: "400px"}}
                InputProps={{readOnly: true}}
            />
            <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
                {options.map((option) => (
                    <MenuItem key={option} onClick={() => handleClose(option)} style={{padding: "12px 50px 12px 20px"}}>
                        {`${option} star`}
                    </MenuItem>
                ))}
            </Menu>
        </div>
    );
};

export default HotelSelecting;