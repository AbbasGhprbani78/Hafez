import * as React from 'react';
import "./MuiStepperStyle.css"
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Grid from '@mui/material/Grid2';

const steps = [
    { id: "step_1", label: 'اطلاعات مشتری' },
    { id: "step_2", label: 'اطلاعات خودرو' },
    { id: "step_3", label: 'اظهارات مشتری' },
    { id: "step_4", label: 'فرم تایید' }
];

export default function MuiStepper({ activeStep = 0 }) {
    return (
        <Grid container size={12} sx={{ width: '100%', direction: "ltr" }}>
            <Stepper sx={{ width: '100%' }} activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label.id}>
                        <StepLabel id={label.id} >{label.label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Grid>
    );
}