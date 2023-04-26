import React from "react";
import {field} from "../constants/constants";

const withField = (Component) => {

  return () => (
    <>
      {
        field.map( (elem, index) => (
          <tr key={index}>
            {
              elem.map( (cell, cellIndex) => (
                <Component
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
export default withField