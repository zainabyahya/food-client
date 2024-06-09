import React from 'react'

const Curve = ({ color, opacity }) => {
    return (
        <svg width="1082" height="669" viewBox="0 0 1082 669" xmlns="http://www.w3.org/2000/svg">
            <path d="M296.476 116.849C217.712 278.856 77.2472 289.398 16.8605 274.419L0.983561 276.901C151.521 382.989 520.891 609.734 794.074 668.013C929.413 648.353 1169.6 563.304 1047.61 380.385C895.131 151.737 782.298 341.841 665.014 173.067C547.729 4.29283 394.931 -85.6607 296.476 116.849Z" fill={`${color}`} opacity={`${opacity}`} />
        </svg>
    )
}

export default Curve