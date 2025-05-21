import { useSelector } from 'react-redux'

/** @returns {typeof import("domain/entities/productImage").default} */
export default function useProductImage() {
    return useSelector((store) => store.entities.productImage);
}