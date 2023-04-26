import React  from "react";
import {field} from "../constants/constants";
import ComputerCell from "./ComputerCell";


const ComputerField = () => {

    return (
        <>
            {
                field.map( (elem, index) => (
                    <tr key={index}>
                        {
                            elem.map( (cell, cellIndex) => (
                                <ComputerCell
                                    key={''+index+cellIndex}
                                    cellId={index+ '' + cellIndex}
                                />
                            ))
                        }
                    </tr>
                ))
            }
        </>
    )
}

export default React.memo(ComputerField)