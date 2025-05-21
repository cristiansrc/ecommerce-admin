import React from "react";
import { useEffect, useState } from "react";
import LoginTemplate from "views/pages/login/Login";
import { authActions } from 'application/actions/auth';
import { useSetState } from 'react-use';
import { useDispatch } from "react-redux";
import useAuth from "hooks/useAuth";
import { useNavigate } from "react-router-dom";

export const Login = () => {
    
    const { isAuthenticated, isWrongCredentials, isFetchingGetToken, isErrorGetToken, isSuccessGetToken } = useAuth();

    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const booleansEvents = {
        isWrongCredentials,
        isFetchingGetToken,
        isErrorGetToken
    };

    const [ alertError, getAlertError ] = useState('');
    const [validated, setValidated] = useState(false);
    const [validatedData, setValidatedData] = useState(false);
    const [formValues, setformValues] = useSetState({
        correo: '',
        password: '',
    });

    const handleSubmit = (event) => {
        setValidatedData(false);
        event.preventDefault();
        setValidated(false);
        setValidated(true);
        setValidatedData(formValues.correo !== '' && formValues.password !== '');
    }

    const validationForm = {
        handleSubmit,
        validated,
    };

    useEffect(() => {
        setValidatedData(false);
    }, [formValues.correo, formValues.password]);

    useEffect(() => {
        if (validatedData && validated) {
            dispatch(authActions.getToken({ 
                email: formValues.correo, 
                password: formValues.password 
            }));
        };
    }, [validatedData, validated, formValues.correo, formValues.password]);

    useEffect(() => {
        if(isWrongCredentials && isSuccessGetToken){
            getAlertError('El usuario y/o contraseña esta erroneos.');
        }
    }, [isWrongCredentials, isSuccessGetToken])


    useEffect(() => {
        if (isAuthenticated) {
            navigate("/productos");
        }
    }, [isAuthenticated]);

    return (
        <LoginTemplate 
            validationForm={validationForm} 
            formValues={formValues}
            setformValues={setformValues}
            booleansEvents={booleansEvents}
            getAlertError={getAlertError}
            alertError={alertError}
        />
    );
};

export default Login;