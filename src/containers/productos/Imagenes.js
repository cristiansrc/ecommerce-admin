import React, { useEffect, useMemo, useState } from "react";
import fileToBase64 from "util/fileToBase64";
import ImagenesTemplate from 'views/productos/Imagenes'
import { producImagestActions } from "application/actions/productImage";
import { useDispatch } from "react-redux";
import useProductImage from "hooks/userProductImage";
import PropTypes from "prop-types";
import TableActions from "components/TableActions";
import { CImage } from "@coreui/react";
import settings from './../../application/config/settings.json'

export const Imagenes = ({ product }) => {

    const dispatch = useDispatch();

    const { 
        productImages,
        isFetchingCreateProductImage, 
        isFetchingDeleteProductImage,
        isSuccessCreateProductImage,
        isSuccessDeleteProductImage,
    } = useProductImage();

    const [file, setFile] = useState(null);
    const [isFetching, setIsFetching] = useState(null);
    const [validate, setValidate] = useState(false);

    const handleFileChange = (event) => {
        const [file] = event.target.files;

        if(file){
            setFile(file);
        }
    }

    const createDocument = (fileBase64, fileName) => {
        dispatch(producImagestActions.createProductImage({
            name: fileName,
            image: fileBase64,
            productId: product.id
        }));
    };

    const bottonAction = () => {
        if(file === null){
            setValidate(true);
        } else {
            setIsFetching(true);
            setValidate(false);
            fileToBase64(file, createDocument);
        }
    }

    const title = useMemo(() => {
        return `Imagenes del producto "${product.name}"`;
    }, [product]);

    
    const successModal = useMemo(() => {
        if(!isSuccessCreateProductImage){
            return '';
        }

        return 'La imagen se subio con exito';
    }, [isSuccessCreateProductImage]);

    const [visibleModalDelete, setVisibleModalDelete] = useState(false);
    const [bodyModalDelete, setBodyModalDelete] = useState('');
    const [idDelete, setIdDelete ] = useState(0);
    const [modalDelete, setModalDelete ] = useState(false);

    const deleteFunctionProduct = (id, image) => {
        setIdDelete(id);
        setBodyModalDelete(<>Desea eliminar la imagen? <br/><br/> {image}</>);
        setVisibleModalDelete(true);
    }

    const functionDelete = (id) => {
        dispatch(producImagestActions.deleteProductImage(id));
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

    const productImagesFunction = useMemo(() => {
        
        if(productImages.length === 0) {
            return []; 
        }

        return productImages.map(img => ({
            ...img,
            imgComponent: <CImage fluid src={ `${settings.urlImageBase}${img.image}` } />,
            actions: <TableActions deleteFunction={() => deleteFunctionProduct(
                img.id, 
                <CImage fluid src={ `${settings.urlImageBase}${img.image}` } />
            )} />
        }));
    }, [productImages]);

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
            name: "Imagen",
            selector: (row) => row.imgComponent,
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

    const getImages = () => {
        dispatch(producImagestActions.getProductImages(product.id))
    }

    useEffect(() => {
        setIsFetching(
            Boolean(
                isFetchingCreateProductImage,
                isFetchingDeleteProductImage,
            )
        );
    }, [isFetchingCreateProductImage]);


    useEffect(() => {
        if(product.id !== null && product.id > 0) {
            getImages();
        }
    }, [product.id]);

    useEffect(() => {
        if((isSuccessCreateProductImage || isSuccessDeleteProductImage) &&  product.id > 0){
            getImages();
        }
    }, [isSuccessCreateProductImage, isSuccessDeleteProductImage, product.id]);

    
    return(
        <ImagenesTemplate 
            title={title} 
            handleFileChange={handleFileChange}
            bottonAction={bottonAction}
            isFetching={isFetching}
            validate={validate}
            successModal={successModal}
            modalDeleteProperties={modalDeleteProperties}
            productImagesFunction={productImagesFunction}
            columns={columns}
        />
    );
}
 

Imagenes.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
        description: PropTypes.string,
        categoryId: PropTypes.number,
        gender: PropTypes.string
    }),
    
}

export default Imagenes;