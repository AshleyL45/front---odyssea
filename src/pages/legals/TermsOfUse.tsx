import {FC} from 'react';
import Pages from "../../components/layout/Pages";

const TermsOfUse: FC<{}> = ({}) => {

    return (
        <>
            <Pages title="Terms of Use - Odyssea">
            </Pages>

            <div className="terms-of-use">
                <h2>Terms of Use</h2>
                <h2>Odyssea</h2>
                <p><strong>Last update:</strong> 25.02.2025</p>
                <p>Welcome to the Odyssea website. By accessing and using our site, you agree to these Terms of Use. Please read them carefully before using the site.</p>

                <h3>1. Acceptance of Terms</h3>
                <p>Using this site implies full and unconditional acceptance of these Terms of Use. If you do not agree with them, please do not use our website.</p>

                <h3>2. Changes to the Terms</h3>
                <p>Odyssea reserves the right to modify these terms at any time. Changes will take effect upon publication on the site. We encourage you to check this page regularly.</p>

                <h3>3. Site Access</h3>
                <p>Access to the site is provided free of charge but may be suspended, restricted, or modified at any time without notice. We do not guarantee uninterrupted or error-free access.</p>

                <h3>4. Intellectual Property</h3>
                <p>All content on the site (texts, images, logos, etc.) is the exclusive property of Odyssea or its partners and is protected by intellectual property laws. Any unauthorized reproduction, distribution, or use is strictly prohibited.</p>

                <h3>5. Use of the Site</h3>
                <p>You agree to use this site lawfully and appropriately. Any attempt at fraud, intrusion, or misuse of
                    the services is strictly prohibited and may lead to legal action.</p>

                <h3>6. Liability</h3>
                <p>Odyssea cannot be held liable for any direct or indirect damages resulting from the use of its site, including viruses or errors in the content. Use of the site is at your own risk.</p>

                <h3>7. External Links</h3>
                <p>Our site may contain links to third-party websites. We have no control over these sites and disclaim any responsibility for their content or privacy policies.</p>

                <h3>8. Personal Data Protection</h3>
                <p>We collect and process your personal data in accordance with our privacy policy, available <a href="#">here</a>.</p>

                <h3>9. Governing Law and Jurisdiction</h3>
                <p>These terms are governed by the laws of <strong>[specify your jurisdiction]</strong>. In case of dispute, the competent courts will be those of <strong>[city or country]</strong>.</p>

                <h3>10. Contact</h3>
                <p>If you have any questions regarding these Terms of Use, you can contact us at the following address: <strong>[email/contact address]</strong>.</p>
            </div>
        </>
    );
};

export default TermsOfUse;
