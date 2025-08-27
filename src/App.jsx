import "./App.css";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Carousel from "./components/swiper/carousel";
import AccordionArray from "./components/accordion/AccordionArray";

import { FiMapPin } from "react-icons/fi";

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

  const accordionData = [
    {
      title: "Lugar",
      icon: "FiMapPin",
      content: <img src="src/assets/aya-photos/aya1.webp" alt="Lugar" />,
    },
    // {
    //   title: "Itinerario",
    //   icon: '<i class="fas fa-cogs"></i>',
    //   content: "<p> Your content here </p>",
    // },
    // {
    //   title: "Confirmar Asistencia",
    //   icon: '<i class="fas fa-cogs"></i>',
    //   content: "<p> Your content here </p>",
    // }
  ];
  const onlyItem = {
    title: "Lugar",
    icon: FiMapPin,
    content: <p>Plaza de la Villa, 1, 28005 Madrid</p>,
  };

  return (
    <>
      <h1>Alba y Andrea</h1>
      <Carousel images={customImages} />
      <div className="bottom-interaction">
        <AccordionArray item={onlyItem} />
      </div>
    </>
  );
}

export default App;
