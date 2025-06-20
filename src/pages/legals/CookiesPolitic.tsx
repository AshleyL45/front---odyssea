import {FC} from 'react';
import "../../components/layout/Pages"
import Pages from "../../components/layout/Pages";

const CookiesPolitic: FC<{}> = ({}) => {

    return (
        <>
            <Pages title="Cookies Politics - Odyssea">
            </Pages>
            <div className="cookies-politic">
                <h2>Cookies policy</h2>
                <h2>Odyssea</h2>
                <p><strong>Last update :</strong> 2025/02/25</p>

                <p>At Odyssea, we use cookies to enhance your user experience and optimize our services. This policy
                    explains what cookies are, how we use them and how you can manage them.</p>
                <h3>1. What is a Cookie?</h3>
                <p>A cookie is a small text file deposited on your device (computer, smartphone, tablet) when you visit
                    a website. It is used to collect information about your browsing to improve your experience.</p>
                <h3>2. What types of cookies do we use?</h3>
                <p>We use several types of cookies:</p>
                <ul>
                    <li><strong>Essential cookies:</strong> Essential for the smooth running of the site.</li>
                    <li><strong>Analytics cookies:</strong> Allow us to measure traffic and improve site performance.
                    </li>
                    <li><strong>Functional cookies:</strong> Improve your user experience (e.g., remembering
                        preferences).
                    </li>
                    <li><strong>Advertising cookies:</strong> Used to offer you targeted advertisements.</li>
                </ul>

                <h3>3. Cookie Management</h3>
                <p>During your first visit, a banner informs you about the use of cookies and allows you to accept,
                    refuse, or customize your choices. You can change your preferences at any time via our <a href="#">Cookie
                        Manager</a>.</p>

                <h3>4. How to Disable Cookies?</h3>
                <p>You can configure your browser to block or delete cookies:</p>
                <ul>
                    <li>Google Chrome: <a href="#">Link to Chrome Help</a></li>
                    <li>Mozilla Firefox: <a href="#">Link to Firefox Help</a></li>
                    <li>Safari: <a href="#">Link to Safari Help</a></li>
                    <li>Microsoft Edge: <a href="#">Link to Edge Help</a></li>
                </ul>

                <h3>5. Cookie Retention Period</h3>
                <p>Cookies have a maximum validity period of <strong>[specified duration]</strong>, after which they
                    will be automatically deleted unless you manually delete them beforehand.</p>

                <h3>6. Contact</h3>
                <p>If you have any questions regarding our cookie policy, please contact us at: <strong>[email/contact
                    address]</strong>.</p>

                <p>We thank you for your trust and assure you of our commitment to respecting your privacy.</p>
            </div>
        </>
    );
};

export default CookiesPolitic;
