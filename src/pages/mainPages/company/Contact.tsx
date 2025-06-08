import {JSX, useState} from 'react';
import Pages from "../../../components/layout/Pages";
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import MailIcon from '@mui/icons-material/Mail';
import PinDropIcon from '@mui/icons-material/PinDrop';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import '../../../App.css';

const faqPages = [
    {
        question: 'How does the mystery trip generator work ?',
        paragraphOne: 'At Odyssea, the mystery trip becomes an exclusive experience. You begin by filling out a discreet form — travel dates, preferences, exclusions, number of travelers. Once your desires are captured, our generator selects the perfect journey for you from our curated collection of fully organized, high-end getaways.',
        paragraphTwo: 'The mystery remains untouched until we unveil the proposal. You then discover a carefully selected destination, paired with a bespoke itinerary. It\'s entirely up to you whether to accept the invitation to depart — or wait for the next call to escape.'
    },
    {
        question: 'Do the trips include activities ?',
        paragraphOne: 'Absolutely. Each journey in our curated catalog includes a selection of activities tailored to every destination. For each city you visit, experiences are thoughtfully arranged — whether cultural, culinary, or immersive — to elevate your stay beyond the ordinary.',
        paragraphTwo: 'These moments are not add-ons, but an integral part of the itinerary, crafted to ensure that every stage of your journey is both meaningful and memorable.',
    },
    {
        question: 'And if the proposed journey doesn’t quite resonate with me ?',
        paragraphOne: 'While the trips featured in our catalog are carefully designed to suit a wide range of preferences, we understand that some travelers seek something even more personal. That’s why we offer the Bespoke Journey — a fully tailored experience shaped entirely around your desires.',
        paragraphTwo: 'You choose the duration (9, 17, 25, or 33 days), the departure date, the countries and cities you wish to explore, the types of activities you enjoy, and the level of accommodation that suits your standards. From there, a day-by-day itinerary is created just for you. One of our dedicated travel advisors will then be in touch to review every detail and fine-tune your journey to ensure it feels entirely your own.'
    }
]

const Contact: ({}: {}) => JSX.Element = ({}) => {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

    return (
        <>
            <Pages title="Contact Us - Odyssea">
            </Pages>

            <section className='container-contact' style={{margin: "150px auto 70px", padding: '1.5rem'}}>
                <h1 style={{fontSize: '30px', textAlign: 'center'}}>Need help fast? Take a look at our <a href="#faq" style={{textDecoration: "underline", fontSize: '30px'}}>FAQ</a>!</h1>
                <div className='contact-layout'>
                    <div>
                        <h3 style={{fontSize: '20px',textTransform: 'uppercase'}}>Call us</h3>
                        <p style={{color: '#999999', marginBottom: '15px'}}>Call our team Monday to Friday.</p>
                        <div style={{display: 'flex', gap: "7px"}}>
                            <PhoneForwardedIcon />
                            <p><strong>Tel : </strong>0205025024</p>
                        </div>
                    </div>

                    <div>
                        <h3 style={{fontSize: '20px', textTransform: 'uppercase'}}>Send us a message</h3>
                        <p style={{color: '#999999', marginBottom: '15px'}}>Reach out to our team</p>
                        <div style={{display: 'flex', gap: "7px"}}>
                            <MailIcon />
                            <p><strong>Mail :</strong> contact@odyssea.com</p>
                        </div>
                    </div>

                    <div>
                        <h3 style={{fontSize: '20px', textTransform: 'uppercase'}}>Visit us</h3>
                        <p style={{color: '#999999', marginBottom: '15px'}}>Come and meet us in our offices.</p>
                        <div style={{display: 'flex', gap: "7px"}}>
                            <PinDropIcon />
                            <p><strong>Head office</strong></p>
                        </div>
                        <ul style={{listStyleType: "none"}}>
                            <li>Odyssea LLC</li>
                            <li>322 Liberty Avenue, Floor 7</li>
                            <li>New York, NY 10001</li>
                            <li>United States</li>
                        </ul>
                    </div>
                </div>

                <h2 id='faq' style={{fontSize: '40px', fontWeight: 'bold', marginTop: '5rem', paddingTop: '20px', textAlign: 'center'}}>- F.A.Q -</h2>
                <ul className='faq-list'>
                    {faqPages.map((faq, index) => (
                        <li key={index}>
                            <button onClick={() => setExpandedIndex(expandedIndex === index ? null : index)} style={{
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                backgroundColor: '#F8F1E5'
                            }}>
                                <div style={{padding: '7px'}}>{faq.question}</div>
                                {expandedIndex === index ? (
                                    <RemoveIcon/>
                                ) : (
                                    <AddIcon/>
                                )}
                            </button>
                            {expandedIndex === index && (
                                <div className={`text-expanded ${expandedIndex === index ? 'open' : ''}`}>
                                    <p>{faq.paragraphOne}</p><br/>
                                    <p>{faq.paragraphTwo}</p>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </section>
        </>
    );
};

export default Contact;
