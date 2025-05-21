import React from 'react'
import {
  CAlert,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'
import PropTypes from 'prop-types'
import DataTableStyled from 'components/DataTableStyled'
import Modal from 'components/Modal';
import FullScreenLoader from 'components/FullScreenLoader'

const Productos = ({ productsFunctions, columns, redirectFormAdd, modalDeleteProperties, isFetching }) => {
  return (
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
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>
              Productos
            </CCardHeader>
            <CCardBody>
              {modalDeleteProperties.modalDelete && (
                <CRow>
                  <CCol>
                    <CAlert color="success">El producto se elimino con exito</CAlert>
                  </CCol>
                </CRow>
              )}
              <CRow className="mb-4">
                <CCol>
                  <DataTableStyled
                    columns={columns}
                    data={productsFunctions}
                  />
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <CButton color="primary" onClick={() => redirectFormAdd()}>
                    Agregar Producto
                  </CButton>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

Productos.propTypes = {
  productsFunctions: PropTypes.array,
  columns: PropTypes.array,
  redirectFormAdd: PropTypes.func,
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
  isFetching: PropTypes.bool
}

export default Productos
