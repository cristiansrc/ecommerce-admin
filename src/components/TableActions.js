import React from "react";
import { cilDelete, cilColorBorder } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import PropTypes from "prop-types";
import { useMemo } from "react";
import { CRow, CButton, CCol } from '@coreui/react'

const TableActions = ({ updateFunction, deleteFunction }) => {

    const updateShow = useMemo(() => Boolean (
        typeof updateFunction !== "undefined" &&
        updateFunction !== null
    ), [updateFunction]);

    const deleteShow = useMemo(() => Boolean (
        typeof deleteFunction !== "undefined" &&
        deleteFunction !== null
    ), [deleteFunction]);


    return(
        <CRow>
            {updateShow && (
                <CCol>
                    <CButton className="text-info" onClick={() => updateFunction()}>
                        <CIcon icon={cilColorBorder} size="xl"/>
                    </CButton>
                </CCol>
            )}

            {deleteShow !== null && (
                <CCol>
                    <CButton className="text-info" onClick={() => deleteFunction()}>
                        <CIcon color="" icon={cilDelete} size="xl"/>
                    </CButton>
                </CCol>
            )}
        </CRow>
    );
}

TableActions.propTypes = {
    updateFunction: PropTypes.func,
    deleteFunction: PropTypes.func,
}

export default TableActions