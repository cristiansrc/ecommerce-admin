import React from "react";
import useCategory from 'hooks/useCategory';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import CategoriasFormularioTemplate from 'views/categorias/CategoriasFormulario';
import { categoryActions } from 'application/actions/category';
import { useDispatch } from 'react-redux';
import { useSetState } from 'react-use';

export const CategoriasFormulario = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const { id } = useParams();
    const { 
        isSuccessGetCategory,
        isSuccessCreateCategory,
        isSuccessUpdateCategory,
        isFetchingCreateCategory, 
        isFetchingUpdateCategory, 
        isFetchingGetCategory,
        idCategory, 
        category
    } = useCategory();

    const [validated, setValidated] = useState(false);
    const [validatedData, setValidatedData] = useState(false);

    const rolPAge = useMemo(() => {

        if(isSuccessCreateCategory){
            return 'edit';
        }

        return typeof id === "undefined" ? 'create' : 'edit';
    }, [id, isSuccessCreateCategory]);

    const bottonLabel = useMemo(() => {
        return rolPAge === 'edit' ? 'Actualizar Categoria' : 'Agregar Categoria';
    }, [rolPAge]);

    const errorInfo = useMemo(() => {
        if(validatedData) {
            return 'Todos los campos son obligatorios';
        }

        return '';
    },[])

    const successInfo = useMemo(() => {
        if(isSuccessCreateCategory) {
            return 'Categoria creada con exito';
        }

        if(isSuccessUpdateCategory) {
            return 'Categoria actualizada con exito';
        }

        return '';

    }, [isSuccessCreateCategory, isSuccessUpdateCategory]);

    const title = useMemo(() => {
        if(rolPAge === 'edit') {
            return 'Actualizar Categoria';
        } else {
            return 'Agregar Categoria';
        }
    }, [rolPAge])

    const isFetching = useMemo(() => 
        Boolean(
            isFetchingCreateCategory || 
            isFetchingUpdateCategory ||
            isFetchingGetCategory
    ), [isFetchingCreateCategory, isFetchingUpdateCategory, isFetchingGetCategory]);

    const formaValuesDefault = useMemo(() => {
        return {
            id: 0,
            name: '',
            description: '',
        }
    }, []);

    const [formValues, setformValues] = useSetState(formaValuesDefault);

    const handleSubmit = (event) => {
        setValidatedData(false);
        setValidated(true);
        setValidatedData(formValues.correo !== '' && formValues.description !== '');
        event.preventDefault();
        event.stopPropagation();
    }

    const buttonAction = () => {
        if(validatedData){
            if (rolPAge === 'edit') {
                dispatch(categoryActions.updateCategory(formValues));
            } else {
                dispatch(categoryActions.createCategory(formValues));
            }
        }
    }

    useEffect(() => {
        if(rolPAge  === 'create' && isSuccessCreateCategory) {
            setformValues(formaValuesDefault);
        }
    }, [rolPAge, isSuccessUpdateCategory]);  

    useEffect(() => {
        if (rolPAge === 'edit') {
            dispatch(categoryActions.getCategory(id));
        }
    }, []);

    useEffect(() => {
        if(isSuccessGetCategory && category === null) {
            navigate("/categorias");
        } else if (isSuccessGetCategory) {
            setformValues({
                    id: category.id,
                    name: category.name,
                    description: category.description,
                });
        }
    }, [isSuccessGetCategory, category]);

    useEffect(() => {
        if(isSuccessCreateCategory && idCategory !== 0) {
            setformValues({...formValues, id: idCategory});
        }
    }, [isSuccessCreateCategory, idCategory]);

    const validationForm = {
        handleSubmit,
        validated,
    };

    return (
        <CategoriasFormularioTemplate 
            isFetching={isFetching} 
            bottonLabel={bottonLabel}
            successInfo={successInfo}
            formValues={formValues}
            setformValues={setformValues}
            buttonAction={buttonAction}
            title={title}
            validationForm={validationForm}
            errorInfo={errorInfo}
        />
    );
}


export default CategoriasFormulario;