import "./App.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Carousel from "./components/swiper/carousel";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
} from "./components/accordion/Accordion";

import { FiMapPin, FiCheckSquare, FiClock } from "react-icons/fi";

function App() {
  const customImages = [
    "src/assets/aya-photos/aya1.webp",
    "src/assets/aya-photos/aya2.webp",
    "src/assets/aya-photos/aya3.webp",
    "src/assets/aya-photos/aya4.webp",
    "src/assets/aya-photos/aya5.webp",
    "src/assets/aya-photos/aya6.webp",
    "src/assets/aya-photos/aya7.webp",
    "src/assets/aya-photos/aya8.webp",
    "src/assets/aya-photos/aya9.webp",
  ];

  return (
    <>
      <h1>Alba y Andrea</h1>
      
      <section>
        <Carousel images={customImages} />  
      </section>
      <br />
      <section>
        <Accordion>
          <AccordionItem>
            <AccordionHeader FiIcon={FiMapPin} Title="Lugar" />

            <AccordionPanel>
              <p>Plaza de la Villa, 1, 28005 Madrid</p>
            </AccordionPanel>

          </AccordionItem>
          
          <AccordionItem>
            <AccordionHeader FiIcon={FiClock} Title="Itinerario" />

            <AccordionPanel>
              <li> Recepción </li>
              <li> Ceremonia </li>
              <li> Banquete </li>
            </AccordionPanel>

          </AccordionItem>
          
          <AccordionItem>
            <AccordionHeader FiIcon={FiCheckSquare} Title="Confirmar Asistencia" />

            <AccordionPanel>
              <li> Nombre </li>
              <li> Bus </li>
              <li> Menú </li>
            </AccordionPanel>

          </AccordionItem>
        
        </Accordion>
      </section>
      <br />
    </>
  );
}

export default App;
