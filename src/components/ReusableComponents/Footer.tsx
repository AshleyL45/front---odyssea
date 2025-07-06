import {FC} from 'react';
import logo from "../../assets/logo/logo_name.png";

const Footer: FC<{}> = ({}) => {
    return (
        <>
            <footer>
                <img src={logo} alt="Odyssea logo"/>
                <section>
                    <div>
                        <h3>OUR OFFER</h3>
                        <ul>
                            <li><a href="/trips">Our Trips</a></li>
                            <li><a href="/personalized-trip/summary">Custom Trip</a></li>
                            <li><a href="/mystery-trip">Surprise Trip</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3>LEARN MORE</h3>
                        <ul>
                            <li><a href="#">Our Blog</a></li>
                            <li><a href="/aboutUs">About Us</a></li>
                            <li><a href="/contact">Contact Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3>LEGAL INFORMATION</h3>
                        <ul>
                            <li><a href="/legal">Legal Notice</a></li>
                            <li><a href="/terms">Terms of Use</a></li>
                            <li><a href="/cookies">Cookie Policy</a></li>
                            <li><a href="/privacy">Privacy Preferences</a></li>
                        </ul>
                    </div>
                </section>
                <p>©Odyssea, All rights reserved</p>
            </footer>
        </>
    );
};

export default Footer;
