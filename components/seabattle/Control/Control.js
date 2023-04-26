import React from "react";
import {useHistory} from "react-router";
import {useDispatch} from "react-redux";
import {resetStore} from "../redux/actions/actionCreators";
import {privateComputerLocation, privateUserLocation} from "../constants/constants";
import cn from 'classnames';
import styles from "./Control.module.scss";

const Control = ( { value, type = 'button', target } ) => {

    const history = useHistory()
    const dispatch = useDispatch()

    const handleControlClick = (event) => {
        const { id } = event.target.dataset
        switch (id){
            case 'exit':
                return reset()
            default:
                return history.push('/auth')
        }
    }

    const reset = () => {
        dispatch( resetStore() )
        privateComputerLocation.length = 0
        privateUserLocation.length = 0
        //return history.push('/auth')
    }

    return (
        <button
            type={type}
            className={styles.control}
            data-id={ target }
            onClick={ handleControlClick }
        >
            { value }
        </button>
    )
}


export default Control