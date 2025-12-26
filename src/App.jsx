import * as React from "react";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useTranslation, Trans } from "react-i18next";

import Carousel from "./components/swiper/Carousel";
import CarouselMini from "./components/carousel-mini/CarouselMini";
import ButtonLanguageSwitcher from "./components/button/ButtonLanguageSwitcher";
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
import { Person, MarkEmailRead } from "@mui/icons-material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import DirectionsBusIcon from "@mui/icons-material/DirectionsBus";
import RestaurantIcon from "@mui/icons-material/Restaurant";

function App() {
  const { t: translate } = useTranslation();
  const [confirmationSent, setConfirmationSent] = React.useState(false);
  const [accordionIndex, setAccordionIndex] = React.useState(-1);

  // #region Consts, states and handlers
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

    sendToAPI(payload);
  };

  const sendToAPI = async (data) => {
    try {
      // Use relative path for Cloudflare Pages Functions
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Network response was not ok");
      }

      alert(translate("attendance_confirmed"));
      setConfirmationSent(true);
      
      // Reset form after successful submission
      setFullName("");
      setValidName(0);
      setRVMenu("");
      setFoodOther("");
      setValidFoodOther(0);
      setRVBusNeeded("");
      setRVBusLocation("");
      setRVBusSchedule("");

      // Close all accordions
      setAccordionIndex(-1);
    } catch (error) {
      console.error("Error:", error);
      alert(translate("error_confirming"));
    }
  };

  // #endregion

  return (
    <>
      <Box
        sx={{
          display: { xs: "none", md: "flex" },
          position: "fixed",
          right: 20,
          zIndex: 1000,
        }}
      >
        <ButtonLanguageSwitcher />
      </Box>

      <img
        className="title-desktop"
        src={CDN_BASE + "aya-title-desktop-s.png"}
        alt="Alba y Andrea"
      />

      <Carousel images={imgArrayCarouselAYA} />

      <Box
        sx={{
          display: { xs: "flex", md: "none" },
          gap: 1,
          position: "fixed",
          right: 10,
          zIndex: 1000,
        }}
      >
        <ButtonLanguageSwitcher />
      </Box>
      <Box className="welcome-message">
        <p className="first">{translate("welcome_message")}</p>
        <p>{translate("welcome_message2")}</p>
        <p>{translate("welcome_message3")}</p>
        <p>{translate("welcome_message4")}</p>
        <p className="last">{translate("welcome_message5")}</p>
      </Box>

      <div className="form">
        <Accordion value={accordionIndex} onChange={setAccordionIndex}>
          {/* -> LUGAR <- */}
          <AccordionItem>
            <AccordionHeader FiIcon={FiMapPin} Title={translate("location")} />
            <AccordionPanel>
              <div className="location">
                <div className="column">
                  <img
                    src={CDN_BASE + "aya-ronesa-title.webp"}
                    alt="Finca Ronesa"
                    className="ronesa-title"
                  />
                  <div className="ronesa-info">
                    <p>{translate("finca_address")}</p>
                    <a
                      href="https://maps.app.goo.gl/Ud8JpthzcA67cJ2f6"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {translate("how_to_get_there")}
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
            <AccordionHeader FiIcon={FiClock} Title={translate("schedule")} />
            <AccordionPanel>
              <img
                src={CDN_BASE + "aya-schedule-final.png"}
                alt="Itinerario"
                className="schedule"
              />
            </AccordionPanel>
          </AccordionItem>

          {/* -> CONFIRMAR ASISTENCIA <- */}
          <AccordionItem>
            <AccordionHeader
              FiIcon={FiCheckSquare}
              Title={translate("confirm_attendance")}
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
                  label={translate("full_name")}
                  variant="standard"
                  value={fullName}
                  onChange={handleChangeNameValue}
                  error={validName === -1}
                  helperText={
                    validName === -1 ? translate("required_field") : ""
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
                    {translate("food_intolerances")}
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
                      label={translate("none")}
                    />
                    <FormControlLabel
                      value="dairy"
                      control={<Radio />}
                      label={translate("dairy_intolerant")}
                    />
                    <FormControlLabel
                      value="gluten"
                      control={<Radio />}
                      label={translate("gluten_intolerant")}
                    />
                    <FormControlLabel
                      value="other"
                      control={<Radio />}
                      label={translate("other")}
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
                          label={translate("other_specify")}
                          variant="standard"
                          value={foodOther}
                          onChange={handleChangeFoodOther}
                          error={validFoodOther === -1}
                          helperText={
                            validFoodOther === -1
                              ? translate("specify_intolerance")
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
                  {translate("bus_needed")}
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
                <FormControlLabel
                  value="yes"
                  control={<Radio />}
                  label={translate("yes")}
                />
                <FormControlLabel
                  value="no"
                  control={<Radio />}
                  label={translate("no")}
                />
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
                    {translate("bus_departure_location")}
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
                      label={translate("elche")}
                    />
                    <FormControlLabel
                      value="alc"
                      control={<Radio />}
                      label={translate("alicante")}
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
                    {translate("bus_return_schedule")}
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
                      label={translate("first_shift")}
                    />
                    <FormControlLabel
                      value="second"
                      control={<Radio />}
                      label={translate("second_shift")}
                    />
                  </RadioGroup>
                </FormControl>
              </Collapse>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <ButtonPrimary
                  endIcon={<MarkEmailRead />}
                  onClick={handleSubmit}
                >
                  {translate("confirm_button")}
                </ButtonPrimary>
              </Box>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        {/* -> MENSAJE DESPEDIDA <- */}
        <Collapse in={confirmationSent} className="thanks-message">
          <img
            src={CDN_BASE + "aya-thanks.jpeg"}
            alt={translate("thanks_message")}
            className="thanks-image"
          />

          <p>{translate("thanks_message")}</p>
        </Collapse>
      </div>
    </>
  );
}

export default App;
