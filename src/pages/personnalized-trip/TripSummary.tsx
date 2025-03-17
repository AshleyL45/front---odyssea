import {FC} from 'react';
import {JSX} from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CustomButton from "../../components/ReusableComponents/CustomButton";

const TripSummary: ({}: {}) => JSX.Element = ({}) => {

    return (
        <div style={{padding: "30px 40px"}}>

                <a style={{display: 'flex', alignItems: "center", fontSize: "16px"}} href="#">
                    <ArrowBackIcon sx={{fontSize: "15px"}}  /*onClick={() => navigate(-1)}*/ />
                    quitter
                </a>


            <div style={{textAlign: "center", margin: "auto", width: "70%"}}>
                <h1 style={{fontSize: "30px", margin: "50px 0"}}>Créez l’itinéraire de vos rêves, sur mesure et sans limites</h1>
                <p style={{margin: "40px 0"}}>
                    Bienvenue dans l’atelier de votre voyage sur mesure, où chaque aventure est conçue selon vos envies
                    et vos attentes. Ici, chaque détail compte : ajustez votre itinéraire, ajoutez des étapes
                    inoubliables et façonnez un périple unique qui vous ressemble.<br/><br/>

                    Que vous rêviez d’une escapade secrète dans des lieux méconnus ou d’un voyage soigneusement
                    orchestré à travers plusieurs cultures, nous vous offrons la possibilité de créer un itinéraire
                    personnalisé, pensé spécialement pour vous. Nos voyages sont exclusivement conçus sur une durée de
                    12 jours et vous permettent d’explorer jusqu’à 3 pays au maximum.<br/><br/>

                    Laissez libre cours à votre imagination et composez un voyage d’exception, à votre image. Des
                    paysages grandioses aux expériences immersives, chaque moment sera soigneusement planifié pour
                    transformer votre rêve en réalité. Parce qu’un voyage ne se vit qu’une fois, faites-en une
                    expérience inoubliable.
                </p>

                <CustomButton variant="contained">Commencer</CustomButton>
            </div>


        </div>
    );
};

export default TripSummary;
