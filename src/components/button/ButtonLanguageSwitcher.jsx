import "./ButtonLanguageSwitcher.css";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import TranslateIcon from "@mui/icons-material/Translate";

function ButtonLanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  const CDN_ES = "https://assets.albayandreasisposano.com/es-flag.png";
  const CDN_IT = "https://assets.albayandreasisposano.com/it-flag.png";

  const StyledLanguageButton = styled(Button)(() => ({
    borderRadius: "20px",
    border: "2px solid #d0d0d0dc",
    textTransform: "none",
    padding: "10px",
    fontWeight: 600,
    transition: "all 0.3s ease",

    color: "#979797e0",
    backgroundColor: "transparent",
    "&:hover": {
      transform: "scale(1.05)",
    },
    "&:active": {
      backgroundColor: "#91919168",
      transform: "translateY(2px)",
    },
    "&:focus": {
      outline: "none",
    },

    "&.Mui-disabled": {
      backgroundColor: "#e0e0e0",
      color: "#9e9e9e",
      boxShadow: "none",
    },
  }));

  return (
    <StyledLanguageButton
      startIcon={<TranslateIcon sx={{ display: { xs: "none", md: "flex" } }} />}
      onClick={
        i18n.language === "es"
          ? () => handleLanguageChange("it")
          : () => handleLanguageChange("es")
      }
    >
      <img
        className="flag-active"
        src={i18n.language === "es" ? CDN_ES : CDN_IT}
      />

      <img
        className="flag-inactive"
        src={i18n.language === "es" ? CDN_IT : CDN_ES}
      />
    </StyledLanguageButton>
  );
}

export default ButtonLanguageSwitcher;
