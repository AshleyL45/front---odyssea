import {FC, JSX, useEffect, useState} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OptionsSelecting from "../../components/OptionsSelecting";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import {get} from "../../API/api";


const BookingFormOptions: ({}: {}) => JSX.Element = ({}) => {
    const [options, setOptions] = useState<>([]);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const getOptions = await get("/options/all");
                if(getOptions){
                    setOptions(getOptions);
                }
            } catch (e) {
                console.error("Cannot get options", e);
            }
        }

        fetchOptions()
    }, []);

    return (
        <div>
            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div style={{
                    width: "70%",
                    height: "6px",
                    borderRadius: "0 5px 5px 0",
                    backgroundColor: "#2C3E50",
                    position: "relative",
                    top: "-6px"
                }}></div>
            </div>

            <a style={{display: 'flex', alignItems: "center", fontSize: "16px", margin: "10px 40px"}} href="#">
                <ArrowBackIcon sx={{fontSize: "15px"}} /*onClick={() => navigate(-1)}*//>
                previous step
            </a>

            <div className="option-select" style={{margin: "50px auto", textAlign: "center"}}>
                <h1 style={{fontSize: "25px", margin: "10px 0"}}>Would you like to add any options to your
                    itinerary?</h1>

                <OptionsSelecting options={options}/>

                <div style={{display: "block"}}>
                    <CustomButton style={{width: "130px"}} variant="contained">Next</CustomButton>
                </div>

            </div>

        </div>
    );
};

export default BookingFormOptions;
