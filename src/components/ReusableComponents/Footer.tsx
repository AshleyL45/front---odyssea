import {FC} from 'react';
import logo from "../../images/logo_name.png";

const MyComponent: FC<{}> = ({}) => {
    return (
        <>

            <footer>
                <img src={logo} alt="Odyssea logo"/>

                <section>
                    <div>
                        <h3>OUR OFFER</h3>
                        <ul>
                            <li><a href="#">Your Trips</a></li>
                            <li><a href="#">Custom Trip</a></li>
                            <li><a href="#">Surprise Trip</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3>LEARN MORE</h3>
                        <ul>
                            <li><a href="#">Our Blog</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Contact Us</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3>LEGAL INFORMATION</h3>
                        <ul>
                            <li><a href="#">Legal Notice</a></li>
                            <li><a href="#">Terms of Use</a></li>
                            <li><a href="#">Cookie Policy</a></li>
                            <li><a href="#">Privacy Preferences</a></li>
                        </ul>
                    </div>
                </section>


                <p>©Odyssea, All rights reserved</p>

            </footer>

        </>
    );
};

export default MyComponent;
