import {FC} from 'react';
import logo from "../images/logo_name.png";

const MyComponent: FC<{}> = ({}) => {
    return (
        <>

            <footer>
                <img src={logo} alt="Odyssea logo"/>

                <section>
                    <div>
                        <h3>NOTRE OFFRE</h3>
                        <ul>
                            <li><a href="#">Vos Voyages</a></li>
                            <li><a href="#">Voyage Personnalisé</a></li>
                            <li><a href="#">Voyage Surprise</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3>EN SAVOIR PLUS</h3>
                        <ul>
                            <li><a href="#">Notre Blog</a></li>
                            <li><a href="#">À Propos</a></li>
                            <li><a href="#">Nous Contacter</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3>INFOS LÉGALES</h3>
                        <ul>
                            <li><a href="#">Mentions Légales</a></li>
                            <li><a href="#">Conditions d'Utilisation</a></li>
                            <li><a href="#">Politique de Cookie</a></li>
                            <li><a href="#">Préférences de Confidentialité</a></li>
                        </ul>
                    </div>
                </section>


                <p>©Odyssea, Tous droits réservés</p>

            </footer>

        </>
    );
};

export default MyComponent;
