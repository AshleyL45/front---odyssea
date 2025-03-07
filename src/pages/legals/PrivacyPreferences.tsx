import {FC} from 'react';

const PrivacyPreferences: FC<{}> = ({}) => {

    return (
        <div className="privacy-preferences">
            <h2>Gérer les Préférences de Confidentialité</h2>
            <h2>Odyssea</h2>
            <p><strong>Dernière mise à jour :</strong> 25/02/2025</p>

            <p>Chez Odyssea, nous nous engageons à protéger votre vie privée et à vous offrir un contrôle total sur vos
                données personnelles. Cette page vous permet de gérer vos préférences en matière de confidentialité.</p>

            <h3>1. Vos Droits en Matière de Confidentialité</h3>
            <p>Conformément aux réglementations en vigueur, vous disposez des droits suivants :</p>
            <ul>
                <li>Accéder à vos données personnelles.</li>
                <li>Modifier ou rectifier vos informations.</li>
                <li>Supprimer vos données personnelles.</li>
                <li>Restreindre ou limiter le traitement de vos données.</li>
                <li>Vous opposer à l'utilisation de vos données à certaines fins.</li>
                <li>Exporter vos données vers un autre service (portabilité des données).</li>
            </ul>

            <h3>2. Gestion des Cookies</h3>
            <p>Vous pouvez ajuster vos préférences en matière de cookies en accédant à notre <a href="#">Gestionnaire de
                Cookies</a>. Vous avez la possibilité de :</p>
            <ul>
                <li>Accepter tous les cookies.</li>
                <li>Refuser tous les cookies (sauf les essentiels).</li>
                <li>Personnaliser vos choix pour chaque catégorie de cookies.</li>
            </ul>

            <h3>3. Paramètres de Communication</h3>
            <p>Nous vous offrons la possibilité de gérer vos préférences de communication, notamment :</p>
            <ul>
                <li>Recevoir ou refuser les newsletters et offres promotionnelles.</li>
                <li>Définir la fréquence de réception des communications.</li>
                <li>Se désinscrire des notifications non essentielles.</li>
            </ul>

            <h3>4. Suppression de Compte et Données</h3>
            <p>Si vous souhaitez supprimer votre compte et l’ensemble de vos données personnelles, veuillez nous
                contacter via <strong>[adresse e-mail/contact]</strong>. La suppression de vos données est irréversible.
            </p>

            <h3>5. Sécurité et Protection des Données</h3>
            <p>Nous mettons en place des mesures de sécurité avancées pour protéger vos informations contre tout accès
                non autorisé ou toute utilisation abusive.</p>

            <h3>6. Contact et Assistance</h3>
            <p>Pour toute question ou demande liée à la gestion de vos préférences de confidentialité, vous pouvez nous
                contacter à : <strong>[adresse e-mail/contact]</strong>.</p>

            <p>Nous vous remercions de votre confiance et restons à votre disposition pour toute assistance
                supplémentaire.</p>
        </div>

    );
};

export default PrivacyPreferences;
