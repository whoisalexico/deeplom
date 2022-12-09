import React from "react";
import styles from './RadioButton.module.scss';
const RadioButton = (props) => {
    const handleRadioChange = (e) => {
        props.handleChange(e.currentTarget.id.toLowerCase());
    };
    return <label className={styles.container}> {props.value}
        <input id={props.value} onChange={handleRadioChange} type="radio" defaultChecked={props.isChecked} className={styles.input} name={props.name}/>
        <span className={styles.checkmark}></span>
    </label>
};

export default RadioButton;
