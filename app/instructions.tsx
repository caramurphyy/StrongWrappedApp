import { User, Settings, Download, Save, Upload } from 'lucide-react';
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import FileUploadForm from './upload';
import { ResultsType } from '../types/results';
import * as motion from 'motion/react-client';

// const steps = [
//   {icon: <img src="/stronglogo.png" width="30px" height="30px"/>, instructions:'open the Strong app on your phone'},
//   {icon: <User />, instruction:'visit the profile tab'},
//   {icon: <Settings />, instruction:'go to settings'},
//   {icon: <Download />, instruction:'scroll down to "Export Strong Data"'},
//   {icon: <Save />, instruction:'send the CSV to your computer or save to files'},
//   {icon: <Upload />, instruction:'upload here!'}
// ];

const steps = [
  {
    label: 'Open the Strong app on your phone',
    description: ``,
  },
  {
    label: 'Go to your profile',
    description: 'This should be the leftmost icon in the bottom bar',
  },
  {
    label: 'Open settings',
    description: `This should be in the top left corner`,
  },
  {
    label: 'Scroll down to "Export Strong Data" and tap',
    description: `Data will saved as a CSV file, it is recommended to upload here via computer instead of on your phone`,
  },
  {
    label: 'Upload!',
    description: `Time see how your year in the gym shaped up!`,
  },
];

export default function InstructionsStepper({ results, setResults }) {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ maxWidth: 500 }}>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        sx={{
          '.MuiSvgIcon-root': { fontSize: '30px', color: '#04abfb' },
          '.MuiSvgIcon-root.Mui-active': { color: '#04abfb' },
          '.MuiSvgIcon-root.Mui-completed': { color: '#1799D8' },
        }}
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel>
              <div
                style={{
                  color: '#f3f3f3',
                  fontSize: '20px',
                  marginLeft: 5,
                }}
              >
                {step.label}
              </div>
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <Button
                  disableRipple
                  onClick={handleNext}
                  sx={{
                    mt: 1,
                    mr: 1,
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  {index != steps.length - 1 && (
                    <motion.div
                      whileHover={{ scale: 1.3 }}
                      whileTap={{ scale: 0.8 }}
                    >
                      {' '}
                      <ArrowDownwardIcon />{' '}
                    </motion.div>
                  )}
                </Button>
                <Button
                  disableRipple
                  disabled={index === 0}
                  onClick={handleBack}
                  sx={{
                    mt: 1,
                    mr: 1,
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.3 }}
                    whileTap={{ scale: 0.8 }}
                  >
                    <ArrowUpwardIcon />
                  </motion.div>
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      <FileUploadForm results={results} setResults={setResults} />
    </Box>
  );
}
