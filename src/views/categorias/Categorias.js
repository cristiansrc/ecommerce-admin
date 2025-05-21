import React from 'react';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CContainer,
  CButton,
  CAlert,
} from '@coreui/react'
import PropTypes from 'prop-types';
import FullScreenLoader from 'components/FullScreenLoader';
import DataTableStyled from 'components/DataTableStyled';
import Modal from 'components/Modal';


const Categorias = ({
  categoriesActions, 
  columns, 
  isFetching,
  redirectFormAgregar,
  modalDeleteProperties}) => {
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
            <CCardHeader>Categorias</CCardHeader>
            <CCardBody>
              <CContainer>
                {modalDeleteProperties.modalDelete && (
                  <CRow>
                    <CCol>
                      <CAlert color="success">La categoria se elimina con exito</CAlert>
                    </CCol>
                  </CRow>
                )}
                <CRow className="mb-4">
                  <CCol>
                    <DataTableStyled
                      columns={columns}
                      data={categoriesActions}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol>
                    <CButton color="primary" onClick={() => redirectFormAgregar()}>
                      Agregar Categoria
                    </CButton>
                  </CCol>
                </CRow>
              </CContainer>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

Categorias.propTypes = {
  categoriesActions: PropTypes.array,
  columns: PropTypes.array,
  isFetching: PropTypes.bool,
  redirectFormAgregar: PropTypes.func,
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

export default Categorias
