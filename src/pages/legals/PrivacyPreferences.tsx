import {FC} from 'react';
import Pages from "../../components/layout/Pages";

const PrivacyPreferences: FC<{}> = ({}) => {

    return (
        <>
            <Pages title="Privacy Preferences - Odyssea">
            </Pages>

            <div className="privacy-preferences">
                <h2>Manage Privacy Preferences</h2>
                <h2>Odyssea</h2>
                <p><strong>Last update:</strong> 2025/02/25</p>
                <p>At Odyssea, we are committed to protecting your privacy and providing you with full control over your personal data. This page allows you to manage your privacy preferences.</p>

                <h3>1. Your Privacy Rights</h3>
                <p>In accordance with applicable regulations, you have the following rights:</p>
                <ul>
                    <li>Access your personal data.</li>
                    <li>Edit or correct your information.</li>
                    <li>Delete your personal data.</li>
                    <li>Restrict or limit the processing of your data.</li>
                    <li>Object to the use of your data for certain purposes.</li>
                    <li>Export your data to another service (data portability).</li>
                </ul>

                <h3>2. Cookie Management</h3>
                <p>You can adjust your cookie preferences by accessing our <a href="#">Cookie Manager</a>. You have the option to:</p>
                <ul>
                    <li>Accept all cookies.</li>
                    <li>Reject all cookies (except essential ones).</li>
                    <li>Customize your choices for each cookie category.</li>
                </ul>

                <h3>3. Communication Settings</h3>
                <p>We allow you to manage your communication preferences, including:</p>
                <ul>
                    <li>Opt in or out of newsletters and promotional offers.</li>
                    <li>Set the frequency of communications.</li>
                    <li>Unsubscribe from non-essential notifications.</li>
                </ul>

                <h3>4. Account and Data Deletion</h3>
                <p>If you wish to delete your account and all your personal data, please contact us at: <strong>[email/contact address]</strong>. Data deletion is irreversible.</p>

                <h3>5. Data Security and Protection</h3>
                <p>We implement advanced security measures to protect your information from unauthorized access or misuse.</p>

                <h3>6. Contact and Support</h3>
                <p>If you have any questions or requests related to managing your privacy preferences, you can contact us at: <strong>[email/contact address]</strong>.</p>
                <p>We thank you for your trust and remain at your disposal for any further assistance.</p>
            </div>
        </>
    );
};

export default PrivacyPreferences;
