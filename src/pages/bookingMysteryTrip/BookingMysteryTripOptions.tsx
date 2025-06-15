import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CustomButton from '../../components/ReusableComponents/CustomButton';
import {useBooking} from '../../contexts/BookingContext';
import Pages from '../../components/layout/Pages';
import OptionsSelectingMysteryTrip from '../../components/mysteryTrip/OptionSelectingMysteryTrip';
import {post} from '../../API/api';

const BookingFormOptions: React.FC = () => {
    const navigate = useNavigate();
    const {questionnaireAnswers} = useBooking();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handlePrevious = () => navigate(-1);

    const handleNext = async () => {
        setLoading(true);
        setError(null);
        try {
            await post('/book/step3', {options: questionnaireAnswers.optionIds});
            navigate('/booking-mystery-trip/billing');
        } catch (err: any) {
            console.error(err);
            setError('Impossible d’enregistrer les options. Réessaie.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>

            <Pages title="Booking – Mystery Trip">
            </Pages>
<header>
            <div className="progress-bar">
                <div style={{width: '100%', height: '6px', backgroundColor: 'lightgrey'}}/>
                <div
                    style={{
                        width: '60%',
                        height: '6px',
                        borderRadius: '0 5px 5px 0',
                        backgroundColor: '#2C3E50',
                        position: 'relative',
                        top: '-6px',
                    }}
                />
            </div>

            <a
                onClick={handlePrevious}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    fontSize: '16px',
                    margin: '10px 40px',
                    cursor: 'pointer',
                }}
            >
                <ArrowBackIcon sx={{fontSize: '15px'}}/> previous step
            </a>
        </header>
            <main>
            <div className="option-select" style={{textAlign: 'center', width: '95%', margin: 'auto'}}>
                <h1 style={{fontSize: '25px', margin: '40px 0 10px'}}>
                    Would you like to add any options to your itinerary?
                </h1>
                <h2 style={{color: 'grey', fontWeight:'lighter'}}>Optional</h2>

                {/* Ce composant met à jour questionnaireAnswers.optionIds via updateResponse */}
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleNext();
                }}>
                <OptionsSelectingMysteryTrip/>

                {error && <p style={{color: 'red'}}>{error}</p>}
                </form>
                <div style={{display: 'block', marginTop: '1rem'}}>
                    <CustomButton
                        style={{width: '130px'}}
                        variant="contained"
                        onClick={handleNext}
                        disabled={loading}
                    >
                        {loading ? 'Saving…' : 'Next'}
                    </CustomButton>
                </div>
            </div>
            </main>
        </>
    );
};

export default BookingFormOptions;
