import { ReactElement, ReactNode, useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
    children: ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps): ReactElement => {
    const [isValidating, setIsValidating] = useState(true);
    const [isValitadeToken, setIsValidateToken] = useState(false);

    useEffect(() => {
        const vaildateToken = async () => {
            const token = localStorage.getItem("access_token");
            if (!token) {
                return (setIsValidateToken(false), setIsValidating(false))
                
            }

            try {
                const response = await fetch('http://localhost:8080/auth/validate', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });

                setIsValidateToken(response.ok);
                setIsValidating(false);
            } catch (error) {
                console.error('Erro ao validar token!', error);
                setIsValidateToken(false);
                setIsValidating(false);
            }
        };

        vaildateToken();
    }, []);

    if (isValidating) {
        return <div>Carregando...</div>;
      }

    return isValitadeToken ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;