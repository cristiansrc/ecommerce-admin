import { useSelector } from 'react-redux'

/** @returns {typeof import("domain/entities/auth").default} */
export default function useAuth() {
    return useSelector((store) => store.entities.auth);
}