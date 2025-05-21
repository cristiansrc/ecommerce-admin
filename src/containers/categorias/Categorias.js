import React from "react";
import CategoriasTemplate from "views/categorias/Categorias";
import { categoryActions } from "application/actions/category";
import { useDispatch } from "react-redux";
import useCategory from "hooks/useCategory";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import TableActions from "components/TableActions";
import { producImagestActions } from "application/actions/productImage";

export const Categorias = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { categories, isFetchingGetCategories, isFetchingDeleteCategory, isSuccessDeleteCategory } = useCategory();

    const redirectFormAgregar = () => {
        dispatch(categoryActions.reset());
        navigate("/categorias/agregar");
    };
    
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
            name: "Descripcion",
            selector: (row) => row.description,
            center: true,
            sortable: true,
            reorder: false,
        },
        {
            id: 4,
            name: "Acciones",
            selector: (row) => row.actions,
            center: true,
            sortable: false,
            right: false,
            reorder: false,
        },
    ];

    const isFetching = useMemo(() => {
        return Boolean(isFetchingGetCategories || isFetchingDeleteCategory);
    }, 
    [isFetchingGetCategories, isFetchingDeleteCategory]);

    const categoryUpdateFunction = (id) => {
        dispatch(categoryActions.reset());
        dispatch(producImagestActions.reset())
        navigate(`/categorias/actualizar/${id}`)
    }

    const [visibleModalDelete, setVisibleModalDelete] = useState(false);
    const [bodyModalDelete, setBodyModalDelete] = useState('');
    const [idDelete, setIdDelete ] = useState(0);
    const [modalDelete, setModalDelete ] = useState(false);

    const categoryDeleteFunction = (id, name) => {
        setIdDelete(id);
        setBodyModalDelete(`Desea eliminar la categoria "${name}"`);
        setVisibleModalDelete(true);
    }

    const functionDelete = (id) => {
        dispatch(categoryActions.deleteCategory(id));
        setVisibleModalDelete(false);
        setModalDelete(true);
    }

    const modalDeleteProperties = useMemo(() => {
        return {
            title: 'Eliminar categoria', 
            body: bodyModalDelete, 
            buttonLabel: 'Eliminar categoria', 
            visible: visibleModalDelete, 
            setVisible: setVisibleModalDelete, 
            bottonAction: functionDelete,
            idDelete,
            modalDelete
        }
    }, [visibleModalDelete]);

    const categoriesActions = useMemo(() => {
        if(categories.size > 0){
            return [];
        }

        return categories.map(category => ({
            ...category,
            actions: <TableActions 
                        updateFunction={() => categoryUpdateFunction(category.id)} 
                        deleteFunction={() => categoryDeleteFunction(category.id, category.name)} />
        }));

    }, [categories]);

    const getCategories = () => {
        dispatch(categoryActions.reset())
        dispatch(categoryActions.getCategories());
    }

    useEffect(() => {
        if(isSuccessDeleteCategory) {
            getCategories();
        }
    },[isSuccessDeleteCategory]);

    useEffect(() => {
        getCategories();
    },[]);

    
    return (
        <CategoriasTemplate 
            categoriesActions={categoriesActions} 
            columns={columns}
            isFetching={isFetching}
            redirectFormAgregar={redirectFormAgregar}
            modalDeleteProperties={modalDeleteProperties}
        />
    );
}

export default Categorias;