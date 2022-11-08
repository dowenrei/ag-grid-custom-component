import React, { useState, useEffect } from 'react';


const Headline = (props) => {

  const checkedHandler = () => {
    let checked = event.target.checked;
    let colId = props.column.colId;
    props.node.setDataValue(colId, checked);
  }
  
  return (
    <input
      type="checkbox"
      onClick={checkedHandler}
      checked={props.value}
    />
  );
};

export default Headline;