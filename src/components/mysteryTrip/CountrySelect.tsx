// src/components/mysteryTrip/CountrySelect.tsx
import React, {FC, useState} from 'react';
import Select, {SingleValue} from 'react-select';
import {CountryOption} from '../../pages/bookingMysteryTrip/BookingMysteryTripCountry';

interface Props {
    options: CountryOption[];
    onSelect: (value: string) => void;
}

const CountrySelect: FC<Props> = ({options, onSelect}) => {
    // on garde localement la sélection
    const [selectedOption, setSelectedOption] = useState<CountryOption | null>(null);

    const handleChange = (opt: SingleValue<CountryOption>) => {
        if (!opt) return;
        // on transmet au parent
        onSelect(opt.value);
        // on vide le champ pour que rien n'apparaisse fermé
        setSelectedOption(null);
    };

    return (
        <Select<CountryOption, false>
            options={options}
            isClearable
            placeholder="-- Select a country --"
            value={selectedOption}
            onChange={handleChange}
        />
    );
};

export default CountrySelect;
