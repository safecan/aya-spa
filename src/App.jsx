import * as React from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Carousel from "./components/swiper/Carousel";
import CarouselMini from "./components/swiper/CarouselMini";
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
} from "./components/accordion/Accordion";
import ButtonPrimary from "./components/button/ButtonPrimary";
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
import { Person, MarkEmailRead, Padding } from "@mui/icons-material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import RestaurantIcon from "@mui/icons-material/Restaurant";

function App() {
  // #region Consts, states and handlers

  // https://assets.albayandreasisposano.com/aya-branch.webp
  const CDN_BASE = "https://assets.albayandreasisposano.com/";
  const imgArrayCarouselAYA = [
    CDN_BASE + "carousel/aya1.webp",
    CDN_BASE + "carousel/aya2.webp",
    CDN_BASE + "carousel/aya3.webp",
    CDN_BASE + "carousel/aya4.webp",
    CDN_BASE + "carousel/aya5.webp",
    CDN_BASE + "carousel/aya6.webp",
    CDN_BASE + "carousel/aya7.webp",
    CDN_BASE + "carousel/aya8.webp",
    CDN_BASE + "carousel/aya9.webp",
  ];

  const imgArrayCarouselRonesa = [
    CDN_BASE + "carousel/aya-ronesa1.webp",
    CDN_BASE + "carousel/aya-ronesa2.webp",
    CDN_BASE + "carousel/aya-ronesa3.webp",
    CDN_BASE + "carousel/aya-ronesa4.webp",
    CDN_BASE + "carousel/aya-ronesa5.webp",
    CDN_BASE + "carousel/aya-ronesa6.webp",
    CDN_BASE + "carousel/aya-ronesa7.webp",
  ];

  const [fullName, setFullName] = React.useState("");
  const [validName, setValidName] = React.useState(0);
  const handleChangeNameValue = (event) => {
    var valid = event.target.value.trim().length >= 3 ? 1 : -1;
    setValidName(valid);
    setFullName(event.target.value);
  };

  const [radioValueMenu, setRVMenu] = React.useState("");
  const handleChangeRVMenu = (event) => {
    setRVMenu(event.target.value);
  };

  const [foodOther, setFoodOther] = React.useState("");
  const [validFoodOther, setValidFoodOther] = React.useState(0);
  const handleChangeFoodOther = (event) => {
    var valid = event.target.value.trim().length >= 3 ? 1 : -1;
    setValidFoodOther(valid);
    setFoodOther(event.target.value);
  };

  const [radioValueBusNeeded, setRVBusNeeded] = React.useState("");
  const handleChangeRVBusNeeded = (event) => {
    setRVBusNeeded(event.target.value);

    if (!event.target.value) {
      setRVBusLocation();
      setRVBusSchedule();
    }
  };

  const [radioValueBusLocation, setRVBusLocation] = React.useState("");
  const handleChangeRVBusLocation = (event) => {
    setRVBusLocation(event.target.value);
  };

  const [radioValueBusSchedule, setRVBusSchedule] = React.useState("");
  const handleChangeRVBusSchedule = (event) => {
    setRVBusSchedule(event.target.value);
  };

  const validateForm = () => {
    if (validName !== 1) {
      setValidName(-1);
      return false;
    }

    if (!radioValueMenu) {
      setRVMenu(null);
      return false;
    } else {
      if (radioValueMenu === "other" && validFoodOther !== 1) {
        setValidFoodOther(-1);
        return false;
      }
    }

    if (!radioValueBusNeeded) {
      setRVBusNeeded(null);
      return false;
    } else if (radioValueBusNeeded === "yes") {
      if (!radioValueBusLocation) {
        setRVBusLocation(null);
        return false;
      }

      if (!radioValueBusSchedule) {
        setRVBusSchedule(null);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    const payload = {
      name: fullName.trim(),
      foodintolerance:
        radioValueMenu === "other" ? foodOther.trim() : radioValueMenu,
      bus:
        radioValueBusNeeded === "yes"
          ? {
              location: radioValueBusLocation,
              schedule: radioValueBusSchedule,
            }
          : null,
    };

    console.log("Payload:", payload);

    // sendToAPI(payload);
  };

  const sendToAPI = async (data) => {
    try {
      const response = await fetch("https://your-api.com/endpoint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Respuesta de red KO");

      const result = await response.json();
      alert("¡Asistencia confirmada!");
      // Reset form or redirect
    } catch (error) {
      console.error("Error:", error);
      alert("Error al confirmar asistencia. Por favor inténtalo de nuevo más tarde.");
    }
  };

  // #endregion

  return (
    <>
      <img
        className="title-desktop"
        src={CDN_BASE + "/aya-title-desktop-s.png"}
        alt="Alba y Andrea"
      />

      <Carousel images={imgArrayCarouselAYA} />

      <div className="form">
        <Accordion>
          {/* -> LUGAR <- */}
          <AccordionItem>
            <AccordionHeader FiIcon={FiMapPin} Title="Lugar" />
            <AccordionPanel>
              <div className="location">
                <div className="column">
                  <img
                    src={CDN_BASE + "/aya-ronesa-title.webp"}
                    alt="Finca Ronesa"
                    className="ronesa-title"
                  />
                  <div className="ronesa-info">
                    <p>Barranco de Ronesa, 03109 Tibi, Alicante</p>
                    <a
                      href="https://maps.app.goo.gl/Ud8JpthzcA67cJ2f6"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Cómo llegar
                    </a>
                  </div>
                </div>
                <div className="column">
                  <CarouselMini images={imgArrayCarouselRonesa} />
                </div>
              </div>
            </AccordionPanel>
          </AccordionItem>

          {/* -> ITINERARIO <- */}
          <AccordionItem>
            <AccordionHeader FiIcon={FiClock} Title="Itinerario" />
            <AccordionPanel>
              <img
                src={CDN_BASE + "/aya-schedule-final.png"}
                alt="Itinerario"
                className="schedule"
              />
            </AccordionPanel>
          </AccordionItem>

          {/* -> CONFIRMAR ASISTENCIA <- */}
          <AccordionItem>
            <AccordionHeader
              FiIcon={FiCheckSquare}
              Title="Confirmar Asistencia"
            />
            <AccordionPanel>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "flex-end",
                  maxHeight: 32,
                  mb: 2,
                  mt: validName === -1 ? 3 : 1,
                }}
              >
                {/* -> NOMBRE <- */}
                <Person
                  sx={{
                    color: "action.active",
                    mr: 2,
                    mb: validName === -1 ? 3 : 0,
                  }}
                />
                <TextField
                  fullWidth
                  id="tf-fullname"
                  label="Nombre completo"
                  variant="standard"
                  value={fullName}
                  onChange={handleChangeNameValue}
                  error={validName === -1}
                  helperText={
                    validName === -1 ? "Este campo es obligatorio" : ""
                  }
                />
              </Box>
              {/* -> INTOLERANCIAS <- */}
              <Box sx={{ display: "flex", alignItems: "flex-start", mt: 3 }}>
                <RestaurantIcon sx={{ color: "action.active", mr: 2 }} />
                <FormControl sx={{ width: "100%" }}>
                  <FormLabel
                    id="menu-label"
                    sx={{
                      textAlign: "left",
                      color: radioValueMenu === null ? "error.main" : "inherit",
                    }}
                  >
                    Intolerancias alimentarias
                  </FormLabel>
                  <RadioGroup
                    sx={{ mt: 1 }}
                    aria-labelledby="menu-label"
                    name="menu-radio-group"
                    value={radioValueMenu}
                    onChange={handleChangeRVMenu}
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
                          sx={{ mb: 2 }}
                          id="tf-menu-others"
                          label="Otros (especificar)"
                          variant="standard"
                          value={foodOther}
                          onChange={handleChangeFoodOther}
                          error={validFoodOther === -1}
                          helperText={
                            validFoodOther === -1
                              ? "Por favor indica tu intolerancia alimentaria"
                              : ""
                          }
                        />
                      }
                    </Collapse>
                  </RadioGroup>
                </FormControl>
              </Box>

              {/* -> AUTOBÚS <- */}
              <Stack
                direction="row"
                spacing={2}
                sx={{ alignItems: "center", mt: 3 }}
              >
                <DirectionsBusIcon sx={{ color: "action.active", mr: 2 }} />
                <FormLabel
                  id="bus-label-needed"
                  sx={{
                    color:
                      radioValueBusNeeded === null ? "error.main" : "inherit",
                  }}
                >
                  ¿Necesitas autobús para asistir al evento?
                </FormLabel>
              </Stack>
              <RadioGroup
                row
                aria-labelledby="bus-label-needed"
                name="bus-radio-group-needed"
                value={radioValueBusNeeded}
                onChange={handleChangeRVBusNeeded}
                sx={{ mt: 1, ml: 5 }}
              >
                <FormControlLabel value="yes" control={<Radio />} label="Sí" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </RadioGroup>

              <Collapse in={radioValueBusNeeded === "yes"}>
                <FormControl sx={{ width: "100%", ml: 5, mt: 2 }}>
                  {/* -> LUGAR SALIDA <- */}
                  <FormLabel
                    id="bus-label-location"
                    sx={{
                      textAlign: "left",
                      color:
                        radioValueBusLocation === null
                          ? "error.main"
                          : "inherit",
                    }}
                  >
                    Lugar de salida del autobús
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="bus-label-location"
                    name="bus-radio-group-location"
                    value={radioValueBusLocation}
                    onChange={handleChangeRVBusLocation}
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
                </FormControl>

                <FormControl sx={{ width: "100%", ml: 5, mt: 2 }}>
                  {/* -> TURNO VUELTA <- */}
                  <FormLabel
                    id="bus-label-schedule"
                    sx={{
                      color:
                        radioValueBusSchedule === null
                          ? "error.main"
                          : "inherit",
                    }}
                  >
                    Turno de vuelta del autobús
                  </FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="bus-label-schedule"
                    name="bus-radio-group-schedule"
                    value={radioValueBusSchedule}
                    onChange={handleChangeRVBusSchedule}
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
              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <ButtonPrimary
                  endIcon={<MarkEmailRead />}
                  onClick={handleSubmit}
                >
                  CONFIRMAR ASISTENCIA
                </ButtonPrimary>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </>
  );
}

export default App;
