import React from 'react';
import {
    FormControlLabel,
    Radio,
    RadioGroup,
    Slider,
    Typography,
    Switch,
} from '@mui/material';
import '../style/Settings.scss';

export interface SettingsT {
    autoPlay: boolean,
    animation: "fade" | "slide",
    indicators: boolean,
    duration: number,
    navButtonsAlwaysVisible: boolean,
    navButtonsAlwaysInvisible: boolean,
    fullHeightHover: boolean,
    cycleNavigation: boolean,
    swipe: boolean,
    [key: string]: any
}

export const DefaultSettingsT: SettingsT = {
}

export default Settings;