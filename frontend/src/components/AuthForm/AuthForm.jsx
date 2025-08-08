import React, { useState } from 'react';
import { AuthFormLogin } from './AuthFormLogin';
import { AuthFormRegister } from './AuthFormRegister';

export const AuthForm = ({ closeForm }) => {
    const [formType, setFormType] = useState('login');
    const handleSwitch = (type) => setFormType(type);

    return (
        <>
            {
                formType === 'login' && (
                    <AuthFormLogin
                        closeForm={closeForm}
                        handleSwitch={() => handleSwitch('register')}
                        formType={formType} 
                    />
                )
            }
            {
                formType === 'register' && (
                    <AuthFormRegister
                        closeForm={closeForm}
                        handleSwitch={() => handleSwitch('login')}
                        formType={formType} 
                    />
                )
            }
        </>
    );
};