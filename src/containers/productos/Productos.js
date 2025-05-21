import useProduct from "hooks/useProduct";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import ProductosTemplate from 'views/productos/Productos'
import { productActions } from "application/actions/product";
import { categoryActions } from "application/actions/category";
import useCategory from "hooks/useCategory";
import TableActions from "components/TableActions";
import { useNavigate } from "react-router-dom";
import formatMoney from "util/formatMoney";

export const Productos = () => {

    const { products, isFetchingGetProducts, isFetchingDeleteProduct, isSuccessDeleteProduct } = useProduct();
    const { categories, isFetchingGetCategories } = useCategory();
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const columns = [
        {
            id: 1,
            name: "Id",
            selector: (row) => row.id,
            center: true,
            sortable: true,
            reorder: false,
        },
        {
            id: 2,
            name: "Nombre",
            selector: (row) => row.name,
            center: true,
            sortable: true,
            reorder: false,
        },
        {
            id: 3,
            name: "Precio",
            selector: (row) => row.priceFormat,
            center: true,
            sortable: true,
            reorder: false,
        },
        {
            id: 4,
            name: "Categoria",
            selector: (row) => row.categoryName,
            center: true,
            sortable: true,
            reorder: false,
        },
        {
            id: 5,
            name: "Genero",
            selector: (row) => row.genderName,
            center: true,
            sortable: true,
            reorder: false,
        },
        {
            id: 6,
            name: "Acciones",
            selector: (row) => row.actions,
            center: true,
            sortable: false,
            right: false,
            reorder: false,
        },
    ];

    useEffect(() => {
        dispatch(productActions.getProducts());
        dispatch(categoryActions.getCategories());
    }, []);

    useEffect(() => {
        if(isSuccessDeleteProduct){
            dispatch(productActions.getProducts());
        }
    }, [isSuccessDeleteProduct]);

    const updateFunctionProduct = (id) => {
        dispatch(productActions.reset());
        navigate(`/productos/actualizar/${id}`);
    }

    const [visibleModalDelete, setVisibleModalDelete] = useState(false);
    const [bodyModalDelete, setBodyModalDelete] = useState('');
    const [idDelete, setIdDelete ] = useState(0);
    const [modalDelete, setModalDelete ] = useState(false);

    const deleteFunctionProduct = (id, name) => {
        setIdDelete(id);
        setBodyModalDelete(`Desea eliminar el producto "${name}"`);
        setVisibleModalDelete(true);
    }

    const functionDelete = (id) => {
        dispatch(productActions.deleteProduct(id));
        setVisibleModalDelete(false);
        setModalDelete(true);
    }

    const modalDeleteProperties = useMemo(() => {
        return {
            title: 'Eliminar producto', 
            body: bodyModalDelete, 
            buttonLabel: 'Eliminar producto', 
            visible: visibleModalDelete, 
            setVisible: setVisibleModalDelete, 
            bottonAction: functionDelete,
            idDelete,
            modalDelete
        }
    }, [visibleModalDelete]);

    const productsFunctions = useMemo(() => {
        if(products.size === 0 || categories.size === 0){
            return [];
        }

        return products.map(pro => ({
            ...pro,
            genderName: pro.gender === 'm' ? 'Hombre' : 'Mujer',
            categoryName: categories.filter(cat => cat.id === pro.categoryId)[0]?.name,
            priceFormat: formatMoney(pro.price),
            actions: <TableActions 
                        updateFunction={() => updateFunctionProduct(pro.id)} 
                        deleteFunction={() => deleteFunctionProduct(pro.id, pro.name)} />
        }));


    }, [products, categories]);

    const redirectFormAdd = () => {
        dispatch(productActions.reset());
        navigate('/productos/agregar');
    }

    const isFetching = useMemo(() => {
        return Boolean(isFetchingGetProducts || isFetchingDeleteProduct || isFetchingGetCategories);
    }, 
    [isFetchingGetProducts, isFetchingDeleteProduct, isFetchingGetCategories]);

    return(
        <ProductosTemplate 
            productsFunctions={productsFunctions}
            columns={columns}
            redirectFormAdd={redirectFormAdd}
            modalDeleteProperties={modalDeleteProperties}
            isFetching={isFetching}
        />
    );
    
}

export default Productos;