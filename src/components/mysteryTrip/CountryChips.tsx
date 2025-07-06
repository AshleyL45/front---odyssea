import React, {FC} from 'react';
import styles from '../../components/mysteryTrip/CountryChips.module.css';

interface Props {
    countries: string[];
    onRemove: (c: string) => void;
}

const CountryChips: FC<Props> = ({countries, onRemove}) => (
    <div className={styles.chipContainer} role="list" aria-label="Excluded countries">
        {countries.map(country => (
            <div key={country} className={styles.chip} role="listitem">
                <span>{country}</span>
                <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => onRemove(country)}
                    aria-label={`Remove ${country}`}
                >
                    ×
                </button>
            </div>
        ))}
    </div>
);

export default CountryChips;
