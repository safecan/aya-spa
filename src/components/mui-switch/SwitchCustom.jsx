import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";

const COLORS_THUMB = {
  thumbOn: "#449744ff",
  thumbOff: "#9e3939ff",
  thumbOnDark: "#00cc00",
  thumbOffDark: "#cc0000",
};

const COLORS_TRACK = {
  trackOn: "#4a7a4aff",
  trackOff: "#874747ff",
  trackOnDark: "#4c6b4cff",
  trackOffDark: "#694545ff",
};

const MUISwitchCustom = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 2,
    transform: "translateX(3px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(25px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 448 512"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: COLORS_TRACK.trackOn,
        ...theme.applyStyles("dark", {
          backgroundColor: COLORS_TRACK.trackOnDark,
        }),
      },
      "& .MuiSwitch-thumb": {
        backgroundColor: COLORS_THUMB.thumbOn,
        ...theme.applyStyles("dark", {
          backgroundColor: COLORS_THUMB.thumbOnDark,
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: COLORS_THUMB.thumbOff,
    width: 28,
    height: 28,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 512 512"><path fill="${encodeURIComponent(
        "#fff"
      )}" d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z"/></svg>')`,
    },
    ...theme.applyStyles("dark", {
      backgroundColor: COLORS_THUMB.thumbOffDark,
    }),
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: COLORS_TRACK.trackOff,
    borderRadius: 20 / 2,
    ...theme.applyStyles("dark", {
      backgroundColor: COLORS_TRACK.trackOffDark,
    }),
  },
}));

export { MUISwitchCustom };
