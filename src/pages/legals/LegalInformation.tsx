import {FC} from 'react';
import Pages from "../../components/layout/Pages";

const LegalInformation: FC<{}> = ({}) => {

    return (
        <>
            <Pages title="Legal Information - Odyssea">
            </Pages>

            <div className="legal-information">
                <h2>Legal Information</h2>
                <h2>Odyssea</h2>
                <p><strong>Last update:</strong> 2025/02/25</p>

                <p>In accordance with current legal provisions, we provide the following information regarding the operation of the Odyssea website.</p>

                <h3>1. Website Publisher</h3>
                <p><strong>Company name:</strong> Odyssea</p>
                <p><strong>Legal status:</strong> SARL</p>
                <p><strong>Head office:</strong> 28 rue des Tulipes, 75001 Paris</p>
                <p><strong>Registration number:</strong> 950024899633210</p>
                <p><strong>Share capital:</strong> €1,650,000</p>
                <p><strong>Publishing director:</strong> Ashley-Kenza Amangoua</p>
                <p><strong>Contact:</strong> Greta</p>

                <h3>2. Website Host</h3>
                <p><strong>Hosting provider:</strong> Shopify</p>
                <p><strong>Address:</strong> Shopify</p>
                <p><strong>Contact:</strong> Shopify</p>

                <h3>3. Intellectual Property</h3>
                <p>The content of the Odyssea website (texts, images, logos, etc.) is protected by intellectual property laws. Any reproduction or use without permission is prohibited.</p>

                <h3>4. Liability</h3>
                <p>The publisher cannot be held responsible for errors or unavailability of the site. The use of the site is at the user's sole responsibility.</p>

                <h3>5. Personal Data Protection</h3>
                <p>For all information related to the collection and processing of personal data, please refer to our <a href="#">Privacy Policy</a>.</p>

                <h3>6. Hyperlinks</h3>
                <p>The site may contain links to third-party websites. We are not responsible for the content or practices of those sites.</p>

                <h3>7. Applicable Law</h3>
                <p>This legal notice is governed by the laws of <strong>[applicable jurisdiction]</strong>. In the event of a dispute, the competent courts will be those of <strong>[city or country]</strong>.</p>

                <h3>8. Contact</h3>
                <p>If you have any questions regarding the legal notice, you can contact us at: <strong>[email/contact address]</strong>.</p>
            </div>
        </>
    );
};

export default LegalInformation;
