import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoIcon from "../../assets/imgs/logo.svg";
import eyeOpenIcon from "../../assets/imgs/eye-open.svg";
import eyeClosedIcon from "../../assets/imgs/eye-closed.svg";

interface SignupForm {
    nome: string;
    email: string;
    password: string;
};

interface SingupErrorInformation {
    errors: {
        nome?: string;
        email?: string;
        password?: string;
    };
    errorState: boolean;
};


const Singup = () => {

    const [formData, setFormData] = useState<SignupForm>({email: "", password: "", nome: ""});
    const [errorNotification, setErrorNotification] = useState<SingupErrorInformation>({errors: {}, errorState: false})
    const [inputVisibility, setInputVisibility] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const newError: SingupErrorInformation['errors'] = {};

        if (!formData.nome.trim()) {
            newError.nome = "Nome é obrigatório";
        }
        
        
        try {
            const response = await fetch('http://localhost:8080/auth/registrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            console.log(data, response);

            if ( data?.success === false) {
                if (response.status === 403 && response.statusText === "Forbidden" && (data.error === "Email já cadastrado!" || data.error === "Formato do Email inválido!")) {
                    newError.email = data.error;
                }
            }

            if (response.status === 201) {
                console.log('Cadastro bem-sucedido!', data, response);
                navigate('/login')
            };

        } catch (error ) {
            if (error instanceof Error) {
                console.error(error?.message);
            } else {
                console.error('Ocorreu um erro desconhecido');
            }
        }

        if (formData.password.length < 6){
            newError.password = "A senha deve ter pelo menos 6 caracteres!"
        }

        if (Object.keys(newError).length > 0) {
            setErrorNotification({
                errors: newError,
                errorState: true
            });
        }

    };

    const toggleVisibility = () => {
        setInputVisibility(!inputVisibility);
    };

    return (
        <div className="container">
            <div className="card">
                <div className="form-template">
                    <img className="logo-icon" src={logoIcon} alt="" />
                    <h2>Cadastre uma conta para ter acesso.</h2>
                    <form className="form-group" onSubmit={handleSubmit}>
                        <div className={`${errorNotification.errors.nome ? "form-error-style" : "form-default-style"}`}>
                            <label htmlFor="name">Nome</label>
                            <input
                                type="text"
                                name="nome"
                                placeholder="Seu nome"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className={`email-container ${errorNotification.errors.email ? "form-error-style" : "form-default-style"}`}>
                            <label htmlFor="email form-error">Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Seu email"
                                onChange={handleInputChange}
                                required
                            />
                            {errorNotification.errors.email && <p className="errorMenssage">{errorNotification.errors.email}</p> }
                        </div>
                        <div className={`${errorNotification.errors.password ? "form-error-style" : "form-default-style"}`}>
                            <label htmlFor="password">Senha</label>
                            <div className="password-input-container">
                                <input
                                    type={inputVisibility ? "text" : "password"}
                                    name="password"
                                    placeholder="Sua senha"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                />
                                <img 
                                    className="visibilidade" 
                                    src={inputVisibility ? eyeClosedIcon : eyeOpenIcon} 
                                    alt="Mostrar senha" 
                                    onClick={toggleVisibility} 
                                />
                                {errorNotification.errors.password && <p className="errorMenssage">{errorNotification.errors.password}</p> }
                            </div>
                        </div>
                        <button type="submit">Entrar</button>
                    </form>
                    <div className="horizontal-bar"></div>
                    <div className="form-footer">
                        <p>Já tem uma conta? <a href="/login">faça login uma aqui!</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Singup;