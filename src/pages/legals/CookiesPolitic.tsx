import {FC} from 'react';

const CookiesPolitic: FC<{}> = ({}) => {

    return (
        <div className="cookies-politic">
            <h2>Politique de Cookies</h2>
            <h2>Odyssea</h2>
            <p><strong>Dernière mise à jour :</strong> 25/02/2025</p>

            <p>Chez Odyssea, nous utilisons des cookies afin d’améliorer votre expérience utilisateur et d’optimiser nos
                services. Cette politique explique ce que sont les cookies, comment nous les utilisons et comment vous
                pouvez les gérer.</p>

            <h3>1. Qu’est-ce qu’un Cookie ?</h3>
            <p>Un cookie est un petit fichier texte déposé sur votre appareil (ordinateur, smartphone, tablette) lorsque
                vous visitez un site web. Il permet de collecter des informations sur votre navigation pour améliorer
                votre expérience.</p>

            <h3>2. Quels Types de Cookies Utilisons-nous ?</h3>
            <p>Nous utilisons plusieurs types de cookies :</p>
            <ul>
                <li><strong>Cookies essentiels :</strong> Indispensables au bon fonctionnement du site.</li>
                <li><strong>Cookies analytiques :</strong> Permettent de mesurer l’audience et d’améliorer la
                    performance du site.
                </li>
                <li><strong>Cookies fonctionnels :</strong> Améliorent votre expérience utilisateur (ex. : mémorisation
                    des préférences).
                </li>
                <li><strong>Cookies publicitaires :</strong> Utilisés pour vous proposer des publicités ciblées.</li>
            </ul>

            <h3>3. Gestion des Cookies</h3>
            <p>Lors de votre première visite, un bandeau vous informe de l’utilisation des cookies et vous permet
                d’accepter, de refuser ou de personnaliser vos choix. Vous pouvez modifier vos préférences à tout moment
                via notre <a href="#">Gestionnaire de Cookies</a>.</p>

            <h3>4. Comment Désactiver les Cookies ?</h3>
            <p>Vous pouvez configurer votre navigateur pour bloquer ou supprimer les cookies :</p>
            <ul>
                <li>Google Chrome : <a href="#">Lien vers l’aide Chrome</a></li>
                <li>Mozilla Firefox : <a href="#">Lien vers l’aide Firefox</a></li>
                <li>Safari : <a href="#">Lien vers l’aide Safari</a></li>
                <li>Microsoft Edge : <a href="#">Lien vers l’aide Edge</a></li>
            </ul>

            <h3>5. Durée de Conservation des Cookies</h3>
            <p>Les cookies ont une durée de validité maximale de <strong>[durée précisée]</strong>, après quoi ils
                seront supprimés automatiquement, sauf si vous les supprimez manuellement.</p>

            <h3>6. Contact</h3>
            <p>Pour toute question concernant notre politique de cookies, contactez-nous à : <strong>[adresse
                e-mail/contact]</strong>.</p>

            <p>Nous vous remercions de votre confiance et vous assurons de notre engagement à respecter votre vie
                privée.</p>
        </div>

    );
};

export default CookiesPolitic;
