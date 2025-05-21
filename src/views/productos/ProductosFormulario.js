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
  CFormSelect,
  CTabs,
  CTabList,
  CTab,
  CTabContent,
  CTabPanel,
} from '@coreui/react'
import PropTypes from 'prop-types';
import Imagenes from 'containers/productos/Imagenes'
import FullScreenLoader from 'components/FullScreenLoader';
import formatMoney from 'util/formatMoney';

const ProductosFormulario = ({ 
    isFetching, 
    bottonLabel, 
    successInfo, 
    formValues, 
    setformValues,
    title,
    validationForm,
    errorInfo,
    categoriesOptions,
    genderOptions,
    rolPAge,
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
                      >
                        <CCol xs={12}>
                          <CFormInput
                            type="text"
                            value={formValues.name}
                            onChange={(e) => setformValues({ ...formValues, name: e.target.value })}
                            id="name"
                            label="Nombre"
                            required
                            valid={validationForm.validated && formValues.name !== ''}
                            invalid={validationForm.validated && formValues.name === ''}
                          />
                        </CCol>
                        <CCol xs={12}>
                          <CFormSelect
                            label="Genero"
                            id="gender"
                            name='gender'
                            required
                            value={formValues.gender}
                            onChange={(e) => setformValues({ ...formValues, gender: e.target.value })}
                            options={genderOptions}
                            valid={validationForm.validated && formValues.gender !== ''}
                            invalid={validationForm.validated && formValues.gender === ''}
                          />
                        </CCol>
                        <CCol xs={12}>
                          <CFormInput
                            label="Valor"
                            id="price"
                            name='price'
                            required
                            valid={validationForm.validated && (formValues.price !== '' || formValues.price !== 0)}
                            invalid={validationForm.validated && formValues.price === '' || formValues.price === 0}
                            value={(formValues.price !== '' && formValues.price > 0 ) ?  formatMoney(formValues.price) : '$'}
                            onChange={(e) => {
                              const value = e.target.value.trim().replace('$', '');
                              if (/^[0-9.]*$/.test(value)) {
                                const valueAmount = parseInt(value.trim().replace(/\./g, ''), 10) || 0;
                                setformValues({ ...formValues, price: valueAmount })
                              }
                            }}
                          />
                        </CCol>
                        <CCol xs={12}>
                          <CFormSelect
                            label="Categoria"
                            id="categoryId"
                            name='categoryId'
                            required
                            value={formValues.categoryId}
                            onChange={(e) => setformValues({ ...formValues, categoryId: e.target.value })}
                            options={categoriesOptions}
                            valid={validationForm.validated && formValues.categoryId !== ''}
                            invalid={validationForm.validated && formValues.gender === ''}
                          />
                        </CCol>
                        <CCol xs={12}>
                          <CFormTextarea
                            id="description"
                            label="Descripción"
                            value={formValues.description}
                            onChange={(e) => setformValues({ ...formValues, description: e.target.value })}
                            rows={3}
                            valid={validationForm.validated && formValues.description !== ''}
                            invalid={validationForm.validated && formValues.description === ''}
                          ></CFormTextarea>
                        </CCol>
                        <CCol xs={12}>
                          <CButton 
                            color="primary" 
                            className="px-4" 
                            onClick={() => validationForm.handleSubmit()}
                            >
                            { bottonLabel }
                          </CButton>
                        </CCol>
                        <CCol className='mt-4' xs={12}>
                          {successInfo !== '' && (
                            <CAlert color="success">{successInfo}</CAlert>
                          )}
                          {errorInfo !== '' && (
                            <CAlert color="danger">{errorInfo}</CAlert>
                          )}
                        </CCol>
                        {rolPAge === 'edit' && (
                          <CCol xs={12}>
                            <CTabs defaultActiveItemKey="images">
                              <CTabList variant="tabs">
                                <CTab itemKey="images">Imagenes</CTab>
                              </CTabList>
                              <CTabContent>
                                <CTabPanel className="p-3" itemKey="images">
                                  <Imagenes product={formValues} />
                                </CTabPanel>
                              </CTabContent>
                            </CTabs>
                          </CCol>
                        )}
                      </CForm>
                  </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

ProductosFormulario.propTypes = {
  isFetching: PropTypes.bool,
  bottonLabel: PropTypes.string,
  successInfo: PropTypes.string,
  formValues: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string,
    categoryId: PropTypes.number,
    gender: PropTypes.string,
    price: PropTypes.number
  }),
  setformValues: PropTypes.func,
  title: PropTypes.string,
  validationForm: PropTypes.shape({
    handleSubmit: PropTypes.func,
    validated: PropTypes.bool,
  }),
  errorInfo: PropTypes.string,
  categoriesOptions: PropTypes.array,
  genderOptions: PropTypes.array,
  rolPAge: PropTypes.string,
  price: PropTypes.number
}

export default ProductosFormulario
