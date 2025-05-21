import React from "react";
import useProduct from 'hooks/useProduct';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProductosFormularioTemplate from 'views/productos/ProductosFormulario';
import { productActions } from 'application/actions/product';
import { useDispatch } from 'react-redux';
import { useSetState } from 'react-use';
import useCategory from "hooks/useCategory";
import { categoryActions } from 'application/actions/category' 

export const ProductosFormulario = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const { id } = useParams();

    const { 
        isSuccessGetProduct,
        isSuccessCreateProduct,
        isSuccessUpdateProduct,
        isFetchingCreateProduct, 
        isFetchingUpdateProduct, 
        isFetchingGetProduct,
        idProduct, 
        product
    } = useProduct();

    const { categories, isFetchingGetCategory  } = useCategory();

    const [validated, setValidated] = useState(false);
    const [validatedData, setValidatedData] = useState(false);

    const rolPAge = useMemo(() => {

        if(isSuccessCreateProduct){
            return 'edit';
        }

        return typeof id === "undefined" ? 'create' : 'edit';
    }, [id, isSuccessCreateProduct]);

    const bottonLabel = useMemo(() => {
        return rolPAge === 'edit' ? 'Actualizar Producto' : 'Agregar Producto';
    }, [rolPAge]);

    const errorInfo = useMemo(() => {
        if(validatedData) {
            return 'Todos los campos son obligatorios';
        }

        return '';
    },[])

    const successInfo = useMemo(() => {
        if(isSuccessCreateProduct) {
            return 'Producto creado con exito';
        }

        if(isSuccessUpdateProduct) {
            return 'Producto actualizado con exito';
        }

        return '';

    }, [isSuccessCreateProduct, isSuccessUpdateProduct]);

    const title = useMemo(() => {
        if(rolPAge === 'edit') {
            return 'Actualizar Producto';
        } else {
            return 'Agregar producto';
        }
    }, [rolPAge])

    const isFetching = useMemo(() => 
        Boolean(
            isFetchingCreateProduct || 
            isFetchingUpdateProduct ||
            isFetchingGetProduct ||
            isFetchingGetCategory
    ), [isFetchingCreateProduct, isFetchingUpdateProduct, isFetchingGetProduct, isFetchingGetCategory]);

    const formaValuesDefault = useMemo(() => {
        return {
            id: 0,
            name: '',
            description: '',
            categoryId: '',
            gender: '',
            price: ''
        }
    }, []);

    const categoriesOptions = useMemo(() => {
        
        const defaultOptions = { 
            label: 'Seleccione', 
            value: '',
        }; 

        if(categories.size === 0){
            return [ defaultOptions ];
        }

        const options = Array.from(categories.values()).map(cat => ({
            label: cat.name,
            value: cat.id,
        }));

        return [defaultOptions, ...options];
    }, [categories]);

    const genderOptions = useMemo(() => {
        return [
            { label: 'Seleccione', value: '', },
            { label: 'Mujer', value: 'm', },
            { label: 'Hombre', value: 'h', },
        ];
    }, []);

    const [formValues, setformValues] = useSetState(formaValuesDefault);

    const buttonAction = () => {
        if (rolPAge === 'edit') {
            dispatch(productActions.updateProduct(formValues));
        } else {
            dispatch(productActions.createProduct(formValues));
        }
    }

    const handleSubmit = () => {
        setValidatedData(false);
        setValidated(true);

        const dataVal = Boolean(
            formValues.correo !== '' && 
            formValues.description !== '' &&
            formValues.categoryId !== '' &&
            formValues.gender !== '' &&
            (formValues.price !== '' || formValues.price !== '$')
        );

        setValidatedData(dataVal);

        if(dataVal) {
            buttonAction();
        }
    }

    useEffect(() => { dispatch(productActions.reset()) }, []);

    useEffect(() => {
        if(rolPAge  === 'create' && isSuccessCreateProduct) {
            setformValues(formaValuesDefault);
        }
    }, [rolPAge, isSuccessUpdateProduct]);  

    useEffect(() => {
        dispatch(categoryActions.getCategories());
        if (rolPAge === 'edit') {
            dispatch(productActions.getProduct(id));
        }
    }, []);

    useEffect(() => {
        if(isSuccessGetProduct && product === null) {
            navigate("/producto");
        } else if (isSuccessGetProduct) {
            setformValues({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    categoryId: product.categoryId,
                    gender: product.gender,
                    price: product.price,
                });
        }
    }, [isSuccessGetProduct, product]);

    useEffect(() => {
        if(isSuccessCreateProduct && idProduct !== 0) {
            setformValues({...formValues, id: idProduct});
        }
    }, [isSuccessCreateProduct, idProduct]);

    const validationForm = {
        handleSubmit,
        validated,
    };

    return (
        <ProductosFormularioTemplate 
            isFetching={isFetching} 
            bottonLabel={bottonLabel}
            successInfo={successInfo}
            formValues={formValues}
            setformValues={setformValues}
            title={title}
            validationForm={validationForm}
            errorInfo={errorInfo}
            categoriesOptions={categoriesOptions}
            genderOptions={genderOptions}
            rolPAge={rolPAge}
        />
    );
}


export default ProductosFormulario;