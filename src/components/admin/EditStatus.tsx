import {Dialog, DialogTitle, InputLabel, MenuItem, Select} from "@mui/material";

interface EditStatusProps {
    isOpen: boolean;
}
const EditStatus = ({isOpen} : EditStatusProps) => {

    return (
        <Dialog open={isOpen}>
            <DialogTitle component="h2">
                Update Booking Status
            </DialogTitle>
        </Dialog>
    );
};

export default EditStatus;
