import "../../styles/dashboard.css";
import { useNavigate } from "react-router-dom";
import logoIcon from "../../assets/imgs/logo.svg";
import gearIcon from "../../assets/imgs/gear.svg";
import userIcon from "../../assets/imgs/user.svg";

interface UserInfomation {
    email: string;
    password: string;
    name: string;
}

const Dashboard = () => {

    const navigate = useNavigate();

    const handleSignupButton = () => {
        localStorage.clear();
        navigate('/');
    };

    const userInfo: UserInfomation = JSON.parse(localStorage.getItem('user') || '{}');

    
    return(
        <div className="dashboard-container">
            <header>
                <div className="header-container">
                    <div className="logo">
                        <img className="logo-icon" src={logoIcon} alt="Ícone de logo" />
                    </div>
                    <div className="settings-header">
                        <div className="user-name-info">
                            <img className="user-icon" src={userIcon} alt="Ícone de usuário" />
                            <p className="user-header-name">{userInfo.name}</p>
                        </div>
                        <img className="gear-icon" src={gearIcon} alt="Ícone de engrenagem" />
                        <button className="exit-header-button" onClick={handleSignupButton}>Sair</button>
                    </div>
                </div>
            </header>
            <main>
                <div className="container-main">
                    <h1>{`Seja bem-vindo, ${userInfo.name}!`}</h1>
                </div>
            </main>
        </div>
    )
};

export default Dashboard;