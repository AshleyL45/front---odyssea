import {FC, useEffect, useState, useCallback, useMemo} from 'react';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CustomButton from "../../components/ReusableComponents/CustomButton";
import CitySelecting from "../../components/persTrip/CitySelecting";
import "../../App.css";
import {useNavigate} from "react-router-dom";
import Pages from "../../components/layout/Pages";
import PersTripData from "../../assets/persTripData.json";
import {usePersonalizedTrip} from "../../contexts/PersonalizedTripContext";
import {post} from "../../API/api";

const CitySelect5: FC<{}> = () => {
    const navigate = useNavigate();
    const storedData = localStorage.getItem("questionnaireData");
    const {questionnaireAnswers} = usePersonalizedTrip();
    const numberOfDays = questionnaireAnswers.duration;

    const selectedTrip = PersTripData.find((opt) => opt.numberOfDays === numberOfDays);

    // 🔹 Mémorisation des pays pour éviter les re-renders inutiles
    const countries = useMemo(() => {
        return storedData ? JSON.parse(storedData).countrySelection : [];
    }, [storedData]);

    const selectedCitiesIds: number[] = [];

    countries.forEach((country: any) => {
        const selectedCitiesRaw = localStorage.getItem(`selectedCities_${country.id}`);
        const selectedCities = selectedCitiesRaw ? JSON.parse(selectedCitiesRaw) : [];
        const cityIds = selectedCities.map((city: any) => city.id);
        selectedCitiesIds.push(...cityIds); // Ajoute tous les IDs au tableau global
    });

    console.log(selectedCitiesIds)

    const generateStepFive = async () => {
        if(selectedCitiesIds){
            try {
                const response = await post("/generate/step5", {cities: selectedCitiesIds});
                if (response?.success === true) {
                    navigate("/personalized-trip/standing-selection");
                    console.log(response)
                }
            } catch (e) {
                console.error("Cannot generate cities")
            }
        } else {
            alert("Please select the cities")
        }
    }

    const [selectedCitiesCount, setSelectedCitiesCount] = useState<{ [key: number]: number }>({});

    // 🔥 Initialisation des villes sélectionnées depuis localStorage (Exécuté une seule fois)
    useEffect(() => {
        const initialCounts: { [key: number]: number } = {};

        countries.forEach((country: any) => {
            const storedCities = localStorage.getItem(`selectedCities_${country.id}`);
            const parsedCities = storedCities ? JSON.parse(storedCities) : [];
            initialCounts[country.id] = Array.isArray(parsedCities) ? parsedCities.length : 0;
        });

        setSelectedCitiesCount(prev => ({...prev, ...initialCounts}));
    }, [countries.length]); // ✅ Ajouté `.length` pour éviter les changements d'objet inutiles


    // 🔥 Met à jour le nombre de villes sélectionnées par pays
    const handleCitySelectionChange = useCallback((countryId: number, count: number) => {
        setSelectedCitiesCount(prev => ({
            ...prev,
            [countryId]: count
        }));
    }, []);

    // 🔥 Vérification : 6 villes sélectionnées au total
    const totalSelectedCities = useMemo(() => {
        return Object.values(selectedCitiesCount).reduce((acc, count) => acc + count, 0);
    }, [selectedCitiesCount]);


    return (
        <div>
            <Pages title="Personalized Trip">
            </Pages>

            <div className="progress-bar">
                <div style={{width: "100%", height: "6px", backgroundColor: "lightgrey"}}></div>
                <div style={{
                    width: "55.75%",
                    height: "6px",
                    borderRadius: "0 5px 5px 0",
                    backgroundColor: "#2C3E50",
                    position: "relative",
                    top: "-6px"
                }}></div>
            </div>

            <a href="#"
               style={{display: 'flex', alignItems: "center", fontSize: "16px", margin: "10px 40px", cursor: "pointer"}}
               onClick={() => navigate(-1)}>
                <ArrowBackIcon sx={{fontSize: "15px"}}/>
                previous step
            </a>

            <div className="container-city-selecting">
                <h1 style={{fontSize: "25px", margin: "30px 0", textAlign: "center"}}>Select your preferred cities:</h1>

                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "40px",
                    margin: "40px auto",
                    justifyContent: "center"
                }}>
                    {countries.map((country: any) => (
                        <div key={country.id}>
                            <div className="city-selecting">
                                <div>
                                    <h3 style={{margin: "10px 0", textAlign: "start"}}>{country.name}</h3>
                                    <p style={{color: "grey"}}>2 cities max.</p>
                                </div>
                            </div>
                            <CitySelecting countryId={country.id} onCitySelectionChange={handleCitySelectionChange}/>
                        </div>
                    ))}
                </div>

                <div style={{textAlign: "center", margin: "auto"}}>
                    <CustomButton
                        style={{width: "130px", marginTop: "70px"}}
                        variant="contained"
                        onClick={generateStepFive}
                        disabled={totalSelectedCities !== selectedTrip?.numberOfCities} // ✅ Désactivé tant que 6 villes ne sont pas sélectionnées
                    >Next</CustomButton>
                </div>
            </div>
        </div>
    );
};

export default CitySelect5;
