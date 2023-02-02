import React from 'react';
import {
    FormControlLabel,
    Switch,
} from '@mui/material';
import '../style/Settings.scss';


export const DefaultSettingsT = {
    autoPlay: true,
    animation: "fade",
    indicators: true,
    duration: 500,
    navButtonsAlwaysVisible: false,
    navButtonsAlwaysInvisible: false,
    cycleNavigation: true,
    fullHeightHover: true,
    swipe: true
}


const Settings = ({settings, setSettings}) => {

    /** Default function for Switches */
    const toggler = (event) => {
        setSettings({
            ...settings,
            [event.target.value]: !settings[event.target.value]
        })
    }

    /** Default function for Radio Groups */
    const radio = (event) => {
        setSettings({
            ...settings,
            [event.target.name]: event.target.value
        })
    }

    /** Default function for Sliders */
    const slider = (event, value) => {
        console.log(event);
        console.log(value);
        setSettings({
            ...settings,
            [event.target.name]: value
        })
    }

    const Toggler = ({name}) => {
        return (
            <FormControlLabel
                control={
                    <Switch onChange={toggler} checked={settings[name]} value={name}
                        color="primary" />
                }
                label={name}
                labelPlacement='end'
            />
        )
    }

    
}

export default Settings;