import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/forms.css";
import logoIcon from "../../assets/imgs/logo.svg";
import eyeOpenIcon from "../../assets/imgs/eye-open.svg";
import eyeClosedIcon from "../../assets/imgs/eye-closed.svg";

interface LoginForm {
    email: string;
    password: string;
}

const Login = () => {
    const [formData, setFormData] = useState<LoginForm>({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [inputVisibility, setInputVisibility] = useState(false);

    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Email ou senha inválido!');
            }

            const data = await response.json();
            localStorage.setItem('access_token', data.session.access_token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/dashboard');

        } catch (err) {
            if (err instanceof Error) {
                if(err.message === 'Failed to fetch') {
                   return setError('Ocorreu um erro desconhecido, tente outra vez mais tarde!');
                };
                setError(err.message);
            } else {
                setError('Ocorreu um erro desconhecido, tente outra vez mais tarde!');
            }
        } finally {
            setLoading(false);
        }
    };

    const toggleVisibility = () => {
        setInputVisibility(!inputVisibility);
    }

    return (
        <div className="container">
            <div className="card">
                <div className="form-template">
                    <img className="logo-icon" src={logoIcon} alt="" />
                    <h2>Entre com seu login para continuar.</h2>
                    <form className="form-group" onSubmit={handleSubmit}>
                        <div className={`${error ? "form-error-style" : "form-default-style"}`}>
                            <label htmlFor="email">Login</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Seu email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Senha</label>
                            <div className={`password-input-container ${error ? "form-error-style" : "form-default-style"}`}>
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
                            </div>
                            
                        {error && <p className="errorMenssage">{error}</p>}
                        </div>
                        <button type="submit" disabled={loading}>Entrar</button>
                    </form>
                    <div className="horizontal-bar"></div>
                    <div className="form-footer">
                        <p>Não tem conta? <a href="/signup">Crie uma aqui!</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;