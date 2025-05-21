import React from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CForm,
  CFormTextarea,
  CFormInput,
  CButton,
  CAlert,
} from '@coreui/react'
import PropTypes from 'prop-types';
import FullScreenLoader from 'components/FullScreenLoader';

const CategoriasFormulario = ({ 
    isFetching, 
    bottonLabel, 
    successInfo, 
    formValues, 
    setformValues,
    buttonAction,
    title,
    validationForm,
    errorInfo,
}) => {
  return (
    <>
      <FullScreenLoader isFetching={isFetching} />
      <CRow>
        <CCol>
          <CCard className="mb-4">
            <CCardHeader>{ title }</CCardHeader>
            <CCardBody>
              <CRow>
                  <CCol xs={12}>
                      <CForm 
                        className="row g-3 needs-validation"
                        noValidate
                        validated={validationForm.validated}
                        onSubmit={validationForm.handleSubmit}
                      >
                        <CCol xs={12}>
                          <CFormInput
                            type="text"
                            value={formValues.name}
                            onChange={(e) => setformValues({ ...formValues, name: e.target.value })}
                            id="name"
                            label="Nombre"
                            required
                          />
                        </CCol>
                        <CCol xs={12}>
                          <CFormTextarea
                            id="description"
                            label="Descripción"
                            value={formValues.description}
                            onChange={(e) => setformValues({ ...formValues, description: e.target.value })}
                            rows={3}
                          ></CFormTextarea>
                        </CCol>
                        <CCol xs={12}>
                          <CButton 
                            color="primary" 
                            className="px-4" 
                            type="submit"
                            onClick={() => buttonAction()}>
                            { bottonLabel }
                          </CButton>
                        </CCol>
                      </CForm>
                  </CCol>
              </CRow>
              <CRow>
                  <CCol className='mt-4' xs={12}>
                    {successInfo !== '' && (
                      <CAlert color="success">{successInfo}</CAlert>
                    )}
                    {errorInfo !== '' && (
                      <CAlert color="danger">{errorInfo}</CAlert>
                    )}
                  </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

CategoriasFormulario.propTypes = {
  isFetching: PropTypes.bool,
  bottonLabel: PropTypes.string,
  successInfo: PropTypes.string,
  formValues: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
  }),
  setformValues: PropTypes.func,
  buttonAction: PropTypes.func,
  title: PropTypes.string,
  validationForm: PropTypes.shape({
    handleSubmit: PropTypes.func,
    validated: PropTypes.bool,
  }),
  errorInfo: PropTypes.string,
}

export default CategoriasFormulario
