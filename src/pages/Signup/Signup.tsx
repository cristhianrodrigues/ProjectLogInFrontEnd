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


const Singup = () => {

    const [formData, setFormData] = useState<SignupForm>({email: "", password: "", nome: ""});
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
        
        if(formData.password.length < 6){
            console.log("senha tem que ter pelo menos 6 caracteres");
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
            console.log('Cadastro bem-sucedido', data);

        } catch (error) {
            if (error instanceof Error) {
                console.error(error?.message);
            } else {
                console.error('Ocorreu um erro desconhecido');
            }
        }finally {
            navigate('/login')
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
                    <h2>Cadastre uma conta para ter acesso.</h2>
                    <form className="form-group" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name">Nome</label>
                            <input
                                type="text"
                                name="nome"
                                placeholder="Seu nome"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                name="email"
                                placeholder="Seu email"
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
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