import React from "react";
import PropTypes from "prop-types"
import DataTable, { createTheme } from "react-data-table-component";

    createTheme('solarized', {
        text: {
            primary: '#ffffff',
            secondary: '#ffffff',
        },
        background: {
            default: 'rgba(255,255,255,0.03)',
        },
        context: {
            background: '#cb4b16',
            text: '#FFFFFF',
        },
        divider: {
            default: '#555555',
        },
        action: {
            button: 'rgba(0,0,0,.54)',
            hover: 'rgba(0,0,0,.08)',
            disabled: 'rgba(0,0,0,.12)',
        },
    }, 'dark');


const DataTableStyled = ({ columns, data, }) => {
    

    const paginationComponentOptions = {
        rowsPerPageText: 'Registros por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos',
    };

    return(
        <DataTable
            columns={columns}
            data={data}
            theme='solarized'
            paginationComponentOptions={paginationComponentOptions}
            noDataComponent='No se encontraron registros'
            highlightOnHover
            pagination
        />
    )
}

DataTableStyled.propTypes = {
    columns: PropTypes.array,
    data: PropTypes.array
}

export default DataTableStyled