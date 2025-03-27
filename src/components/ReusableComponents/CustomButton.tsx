// CustomButton.tsx
import {Button, ButtonProps} from "@mui/material";
import {styled} from "@mui/system";


const CustomButton = styled(Button)<ButtonProps>({
    backgroundColor: "#2C3E50",
    borderRadius: "12px",
    margin: "20px",
    height: "auto",
    transition: "transform 0.3s ease-in-out",
    "&:hover": {
        transform: "scale(1.05)", // Effet zoom au hover
    },
});

export default CustomButton;
