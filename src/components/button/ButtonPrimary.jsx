import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';

const ButtonPrimary = styled(Button)(() => ({
  borderRadius: '20px', 
  border: '2px solid #d0d0d0dc',
  textTransform: 'none', 
  padding: '10px 44px', 
  fontWeight: 600, 
  transition: 'all 0.3s ease', 

  color: '#979797e0',
  backgroundColor: "transparent",
  '&:hover': {
    transform: 'scale(1.05)',
  },
  '&:active': {
    backgroundColor: '#91919168',
    transform: 'translateY(2px)', 
  },
  '&:focus': {
    outline: 'none'
  },

  '&.Mui-disabled': {
    backgroundColor: '#e0e0e0',
    color: '#9e9e9e',
    boxShadow: 'none',
  },
}));

export default ButtonPrimary;

