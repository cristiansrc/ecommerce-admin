import React, { useEffect } from "react";
import { CAlert } from "@coreui/react";
import settings from './../application/config/settings.json'

import PropTypes from "prop-types";

const CAlertTime = ({ message, onTimeout, type = 'success', timeOut = settings.timeCloseAlerDefault }) => {
    
    useEffect(() => {
        if(message !== ''){
            setTimeout(() => {
                onTimeout();
            }, timeOut ); 
        }
    }, [message]);
    return(
        <>
            {message !== '' && (
                <CAlert color={ type }>{ message }</CAlert>
            )}
        </>
    );
}

CAlertTime.propTypes = {
    message: PropTypes.string,
    onTimeout: PropTypes.func,
    type: PropTypes.string,
    timeOut: PropTypes.number,
}

export default CAlertTime