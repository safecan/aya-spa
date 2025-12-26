import React from "react";
import { FiChevronDown } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import "./Accordion.css";

const AccordionContext = React.createContext({});
const useAccordion = () => React.useContext(AccordionContext);

function Accordion({ children, multiple, defaultIndex, value, onChange }) {
  const isControlled = value !== undefined;
  const [internalActiveIndex, setInternalActiveIndex] = React.useState(
    multiple ? [defaultIndex] : defaultIndex
  );

  const activeIndex = isControlled ? value : internalActiveIndex;

  function handleChangeIndex(index) {
    if (!multiple) {
      const newValue = index === activeIndex ? -1 : index;
      if (isControlled) {
        onChange?.(newValue);
      } else {
        setInternalActiveIndex(newValue);
      }
      return;
    }

    // Multiple mode
    const currentArray = Array.isArray(activeIndex) ? activeIndex : [];
    let newValue;
    if (currentArray.includes(index)) {
      newValue = currentArray.filter((i) => i !== index);
    } else {
      newValue = [...currentArray, index];
    }
    
    if (isControlled) {
      onChange?.(newValue);
    } else {
      setInternalActiveIndex(newValue);
    }
  }

  return React.Children.map(children, (child, index) => {
    const isActive =
      multiple && Array.isArray(activeIndex)
        ? activeIndex.includes(index)
        : activeIndex === index;

    return (
      <AccordionContext.Provider value={{ isActive, index, onChangeIndex: handleChangeIndex }}>
        {child}
      </AccordionContext.Provider>
    );
  });
}

function AccordionItem({ children }) {
  return <div className="accordion-item">{children}</div>;
}

function AccordionHeader({ FiIcon, Title }) {
  const { isActive, index, onChangeIndex } = useAccordion();

  return (
    <motion.div
      className={`accordion-header ${isActive ? "active" : ""}`}
      onClick={() => onChangeIndex(index)}
    >
      <div className="horizontal-stack">
        {FiIcon && <FiIcon className="icon" />}
        {Title && <strong className="title">{Title}</strong>}
        <FiChevronDown className={`chevron ${isActive ? "active" : ""}`} />
      </div>
    </motion.div>
  );
}

function AccordionPanel({ children }) {
  const { isActive } = useAccordion();

  return (
    <AnimatePresence initial={false}>
      {isActive && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ type: "spring", duration: 0.4, bounce: 0 }}
        >
          <div className="accordion-panel">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { Accordion, AccordionItem, AccordionHeader, AccordionPanel };
