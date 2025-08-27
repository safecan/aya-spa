import React, { useState } from 'react';
import { FiChevronDown } from "react-icons/fi";
import './AccordionArray.css';

const AccordionArray = ({ item }) => {

  return (
    <div className="aya-accordion-array">
      <div className="horizontal-stack">
        <item.icon size={18} className="icons"/>
        <strong>{item.title}</strong>
        <FiChevronDown size={24} className="icons" />
      </div>
      <div className="content">
        <div>{item.content}</div>
      </div>
    </div>
  );
};

export default AccordionArray;