import styles from "./BookingInfo.module.css";
import {Option} from "../../../@types/Option";


interface OptionInfoProps {
    options: Option[];
}

const OptionInfo = ({options} : OptionInfoProps) => {

    return (
        <div className={styles['booking-info__container']}>
            <h2 className={styles['booking-info__title']}>Options</h2>
            {
                options && options.length > 0 ? options.map ((option, index) =>
                    <dl className={styles['booking-info__content']} key={option.id}>
                        <dt>{option.name}</dt>
                        <dd>{option.price}€ </dd>
                    </dl>
                ) : (
                    <p style={{fontSize: "1.3rem"}}>No options were chosen.</p>
                )
            }
        </div>
    );
};

export default OptionInfo;
