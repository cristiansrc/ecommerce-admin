import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import PropTypes from 'prop-types'
import FullScreenLoader from 'components/FullScreenLoader'
import CAlertTime from 'components/CAlertTime'

const Login = ({ 
  validationForm, 
  formValues, 
  setformValues, 
  booleansEvents, 
  getAlertError,
  alertError
}) => {
  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <FullScreenLoader isFetching={booleansEvents.isFetchingGetToken} />
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm
                    noValidate
                    validated={validationForm.validated}
                    onSubmit={validationForm.handleSubmit}
                  >
                    <h1>Login</h1>
                    <p className="text-body-secondary">Ingresa tus datos</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput 
                        name='correo'
                        placeholder="Correo" 
                        autoComplete="username"
                        id="correo"
                        required 
                        feedbackInvalid="El correo debe ingresarse y debe ser un correo valido."
                        value={formValues.correo}
                        onChange={(e) => setformValues({ ...formValues, correo: e.target.value })}
                        />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        name='password'
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        id="password"
                        required
                        feedbackInvalid="Debe ingresar la contraseña."
                        value={formValues.password}
                        onChange={(e) => setformValues({ ...formValues, password: e.target.value })}
                      />  
                    </CInputGroup>
                    <CRow>
                      <CCol xs={12}>
                        <CButton 
                          color="primary" 
                          className="px-4" 
                          type="submit"
                          timeout={2000}>
                          Iniciar sesión
                        </CButton>
                      </CCol>
                    </CRow>
                    <CRow className="mt-3">
                      <CCol xs={12}> 
                        <CAlertTime
                          message={ alertError }
                          onTimeout={() => getAlertError('')} 
                          type='danger'
                          />
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <br/>
                    <h2>Inicia session</h2>
                    <br/>
                    <p>
                      Bienvenidos a la plataforma de gestión de ecommerce. Inicia sesión para
                      acceder
                    </p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

Login.propTypes = {
  validationForm: PropTypes.object,
  formValues: PropTypes.object,
  setformValues: PropTypes.func,
  booleansEvents: PropTypes.object,
  getAlertError: PropTypes.func,
  alertError: PropTypes.string,
}

export default Login


