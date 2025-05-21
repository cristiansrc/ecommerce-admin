import React from "react"
import PropTypes from "prop-types"
import { 
    CButton, 
    CModal, 
    CModalBody, 
    CModalFooter, 
    CModalHeader, 
    CModalTitle 
} from '@coreui/react'

const Modal = ({ title, body, buttonLabel, visible, setVisible, bottonAction, idDelete }) => {
    return(
        <CModal
            visible={visible}
            onClose={() => setVisible(false)}
        >
            <CModalHeader>
                <CModalTitle>{ title }</CModalTitle>
            </CModalHeader>
            <CModalBody style={{flex:1,justifyContent: 'center',alignItems: 'center', textAlign: 'center', alignSelf:'center'}}>
                <p>{ body }</p>
            </CModalBody>
            <CModalFooter>
                <CButton color="secondary" onClick={ () => setVisible(false) } >Cerrar</CButton>
                <CButton color="primary" onClick={ () => bottonAction(idDelete) } >{ buttonLabel }</CButton>
            </CModalFooter>
        </CModal>
    )
}

Modal.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    buttonLabel: PropTypes.string,
    visible: PropTypes.bool,
    setVisible: PropTypes.func,
    bottonAction: PropTypes.func,
    idDelete: PropTypes.number
}

export default Modal