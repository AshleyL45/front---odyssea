import {FC} from 'react';

const LegalInformation: FC<{}> = ({}) => {

    return (
        <div className="legal-information">
            <h2>Mentions Légales</h2>
            <h2>Odyssea</h2>
            <p><strong>Dernière mise à jour :</strong> 25/02/2025</p>

            <p>Conformément aux dispositions légales en vigueur, nous mettons à disposition les informations relatives à
                l'exploitation du site Odyssea.</p>

            <h3>1. Éditeur du Site</h3>
            <p><strong>Nom de l'entreprise :</strong> Odyssea</p>
            <p><strong>Statut juridique :</strong> SARL</p>
            <p><strong>Siège social :</strong> 28 rue des Tulipes, 75001 Paris</p>
            <p><strong>Numéro d'immatriculation :</strong> 950024899633210</p>
            <p><strong>Capital social :</strong> 1 650 000€</p>
            <p><strong>Directeur de la publication :</strong> Ashley-Kenza Amangoua</p>
            <p><strong>Contact :</strong> Greta</p>

            <h3>2. Hébergeur du Site</h3>
            <p><strong>Nom de l’hébergeur :</strong> Shopify</p>
            <p><strong>Adresse :</strong> Shopify</p>
            <p><strong>Contact :</strong> Shopify</p>

            <h3>3. Propriété Intellectuelle</h3>
            <p>Le contenu du site Odyssea (textes, images, logos, etc.) est protégé par les lois sur la propriété
                intellectuelle. Toute reproduction ou utilisation sans autorisation est interdite.</p>

            <h3>4. Responsabilité</h3>
            <p>L'éditeur ne pourra être tenu responsable des erreurs ou indisponibilités du site. L'utilisation du site
                est faite sous la seule responsabilité de l'utilisateur.</p>

            <h3>5. Protection des Données Personnelles</h3>
            <p>Pour toute information relative à la collecte et au traitement des données personnelles, veuillez
                consulter notre <a href="#">Politique de Confidentialité</a>.</p>

            <h3>6. Liens Hypertextes</h3>
            <p>Le site peut contenir des liens vers des sites tiers. Nous ne pouvons être tenus responsables du contenu
                ou des pratiques de ces sites.</p>

            <h3>7. Droit Applicable</h3>
            <p>Les présentes mentions légales sont soumises au droit <strong>[juridiction applicable]</strong>. En cas
                de litige, les tribunaux compétents seront ceux de <strong>[ville ou pays]</strong>.</p>

            <h3>8. Contact</h3>
            <p>Pour toute question relative aux mentions légales, vous pouvez nous contacter à : <strong>[adresse
                e-mail/contact]</strong>.</p>
        </div>
    );
};

export default LegalInformation;
