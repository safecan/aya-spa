import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';

const ButtonPrimary = styled(Button)(({ theme }) => ({
  // Base styles
  borderRadius: '20px', // Full rounded border
  border: '2px solid #d0d0d0dc',
  textTransform: 'none', // Disable uppercase transformation
  padding: '10px 44px', // Comfortable padding
  fontWeight: 600, // Slightly bolder text
  transition: 'all 0.3s ease', // Smooth transitions

  // Custom color scheme
  color: '#979797e0',
  backgroundColor: "transparent",
  '&:hover': {
    transform: 'scale(1.05)',
  },
  '&:active': {
    backgroundColor: '#91919168',
    transform: 'translateY(2px)', // Slight push down effect
  },
  '&:focus': {
    outline: 'none'
  },

  // Disabled state
  '&.Mui-disabled': {
    backgroundColor: '#e0e0e0',
    color: '#9e9e9e',
    boxShadow: 'none',
  },
}));

export default ButtonPrimary;

