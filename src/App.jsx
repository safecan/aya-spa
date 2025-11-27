import * as React from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Carousel from "./components/swiper/Carousel";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
} from "./components/accordion/Accordion";

import { FiMapPin, FiCheckSquare, FiClock } from "react-icons/fi";
import {
  TextField,
  FormControl,
  FormControlLabel,
  FormLabel,
  Stack,
  Box,
  Collapse,
} from "@mui/material";
import { Person } from "@mui/icons-material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import { MUISwitchCustom } from "./components/mui-switch/SwitchCustom.jsx";

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

  const [radioValueMenu, setRadioValueMenu] = React.useState();
  const handleChangeRadioValueMenu = (event) => {
    setRadioValueMenu(event.target.value);
  };

  const [busSwitchChecked, setBusSwitch] = React.useState(false);
  const handleBusSwitchChange = (event) => {
    setBusSwitch(event.target.checked);

    if (!event.target.checked) {
      setRadioValueBus("");
    }
  };

  const [radioValueBus, setRadioValueBus] = React.useState();
  const handleChangeRadioValueBus = (event) => {
    setRadioValueBus(event.target.value);
  };

  return (
    <>
      <img
        className="title-desktop"
        src="src/assets/aya-photos/aya-title-desktop-s.png"
        alt="Alba y Andrea"
      />
      <Carousel images={customImages} />
      <br />
      <div className="form">
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
            <AccordionHeader
              FiIcon={FiCheckSquare}
              Title="Confirmar Asistencia"
            />
            <AccordionPanel>
              <Box
                sx={{ display: "flex", alignItems: "flex-end", maxHeight: 32 }}
              >
                <Person sx={{ color: "action.active", mr: 2, my: 0.1 }} />
                <TextField
                  fullWidth
                  id="tf-fullname"
                  label="Nombre completo"
                  variant="standard"
                />
              </Box>
              <br />
              <br />
              <Box sx={{ display: "flex", alignItems: "flex-start" }}>
                <RestaurantIcon
                  sx={{ color: "action.active", mr: 2, my: 0.1 }}
                />
                <FormControl sx={{ width: "100%" }}>
                  <FormLabel id="menu-label" sx={{ textAlign: "left" }}>
                    Intolerancias alimentarias
                  </FormLabel>
                  <RadioGroup
                    sx={{ mt: 1 }}
                    aria-labelledby="menu-label"
                    name="menu-radio-group"
                    value={radioValueMenu}
                    onChange={handleChangeRadioValueMenu}
                  >
                    <FormControlLabel
                      value="none"
                      control={<Radio />}
                      label="Ninguna"
                    />
                    <FormControlLabel
                      value="dairy"
                      control={<Radio />}
                      label="Intolerante a la lactosa"
                    />
                    <FormControlLabel
                      value="gluten"
                      control={<Radio />}
                      label="Intolerante al gluten"
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label="Otros"
                    />
                    <Collapse
                      in={radioValueMenu === "other"}
                      sx={{ width: "100%" }}
                    >
                      {
                        <TextField
                          fullWidth
                          sx={{ mt: -2, mb: 2 }}
                          id="tf-menu-others"
                          label="Otros (especificar)"
                          variant="standard"
                        />
                      }
                    </Collapse>
                  </RadioGroup>
                </FormControl>
              </Box>
              <br />
              <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
                <DirectionsBusIcon
                  sx={{ color: "action.active", mr: 2, my: 0.1 }}
                />
                <FormControlLabel
                  control={
                    <MUISwitchCustom
                      sx={{ ml: 1 }}
                      defaultChecked={false}
                      checked={busSwitchChecked}
                      onChange={handleBusSwitchChange}
                    />
                  }
                  label="Quiero autobús para asistir al evento"
                  labelPlacement="start"
                />
              </Stack>
              <Collapse in={busSwitchChecked}>
                <FormControl sx={{ width: "100%", ml: 5, mt: 1 }}>
                  <FormLabel
                    id="bus-label-departure"
                    sx={{ textAlign: "left" }}
                  >
                    Sitio de salida del autobús
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="bus-label-departure"
                    name="bus-radio-group-departure"
                    value={radioValueBus}
                    onChange={handleChangeRadioValueBus}
                  >
                    <FormControlLabel
                      value="elx"
                      control={<Radio />}
                      label="Elche"
                    />
                    <FormControlLabel
                      value="alc"
                      control={<Radio />}
                      label="Alicante"
                    />
                  </RadioGroup>
                  <FormLabel
                    id="bus-label-return"
                    sx={{ textAlign: "left", mt: 2 }}
                  >
                    Turno de vuelta del autobús
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="bus-label-return"
                    name="bus-radio-group-return"
                    value={radioValueBus}
                    onChange={handleChangeRadioValueBus}
                  >
                    <FormControlLabel
                      value="first"
                      control={<Radio />}
                      label="Primer turno"
                    />
                    <FormControlLabel
                      value="second"
                      control={<Radio />}
                      label="Segundo turno"
                    />
                  </RadioGroup>
                </FormControl>
              </Collapse>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}

export default App;
