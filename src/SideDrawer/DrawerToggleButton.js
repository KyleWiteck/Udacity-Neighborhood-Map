import React from 'react'

import './DrawerToggleButton.css'

const DrawerToggleButton = props => (
    <button className="drawer-button" onClick={props.click}>
        <div className="no-line" />
        <div className="button-line" />
        <div className="button-line" />
        <div className="button-line" />
        <div className="no-line" />
    </button>
)

export default DrawerToggleButton;
