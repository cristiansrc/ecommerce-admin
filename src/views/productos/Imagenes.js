import { CAlert, CButton, CCard, CCardBody, CCardHeader, CCol, CFormInput, CRow } from "@coreui/react";
import DataTableStyled from "components/DataTableStyled";
import FullScreenLoader from "components/FullScreenLoader";
import Modal from "components/Modal";
import PropTypes from "prop-types";
import React from "react";

export const Imagenes = ({ 
    title, 
    handleFileChange, 
    bottonAction, 
    isFetching, 
    validate,
    successModal,
    modalDeleteProperties,
    productImagesFunction,
    columns }) => {
    return(
        <>
        <FullScreenLoader isFetching={isFetching} />
        <Modal 
            title={modalDeleteProperties.title} 
            body={modalDeleteProperties.body}
            buttonLabel={modalDeleteProperties.buttonLabel}
            visible={modalDeleteProperties.visible}
            setVisible={modalDeleteProperties.setVisible}
            bottonAction={modalDeleteProperties.bottonAction}
            idDelete={modalDeleteProperties.idDelete}
        />
        <CRow>  
            <CCol>
                <CCard className="mb-4">
                    <CCardHeader>{ title }</CCardHeader>
                    <CCardBody>
                        <CRow>
                            <CCol xs={12}>
                                <CFormInput
                                    type="file"
                                    id="validationTextarea"
                                    invalid={validate}
                                    onChange={(event) => handleFileChange(event)}
                                />
                            </CCol>
                            <CCol className="mt-4" xs={12}>
                                <CButton 
                                color="primary" 
                                className="px-4" 
                                onClick={() => bottonAction()}
                                >
                                Guardar
                                </CButton>
                            </CCol>
                            {successModal !== '' && (
                                <CCol className="mt-4" xs={12}>
                                    <CAlert color="success">{ successModal }</CAlert>
                                </CCol>
                            )}
                            <CCol className="mt-4" xs={12}>
                                <DataTableStyled
                                    columns={columns}
                                    data={productImagesFunction}
                                />
                            </CCol>
                        </CRow>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
        </>
    );
}

Imagenes.propTypes = {
    title: PropTypes.string,
    handleFileChange: PropTypes.func,
    bottonAction: PropTypes.func,
    isFetching: PropTypes.string,
    validate: PropTypes.bool,
    successModal: PropTypes.string,
    productImagesFunction: PropTypes.array,
    columns: PropTypes.array,
    modalDeleteProperties: PropTypes.shape({
        title: PropTypes.string, 
        body: PropTypes.string, 
        buttonLabel: PropTypes.string, 
        visible: PropTypes.bool, 
        setVisible: PropTypes.func, 
        bottonAction: PropTypes.func, 
        idDelete: PropTypes.number,
        modalDelete: PropTypes.bool,
    }),
}

export default Imagenes;