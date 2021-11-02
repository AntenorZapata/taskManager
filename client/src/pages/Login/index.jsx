import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';

import useValidation from '../../hooks/useValidation';
// import Header from '../../components/header/Header';
import './Login.css';

const initialErrorState = {
  email: { valid: true, text: '' },
  password: { valid: true, text: '' },
  name: { valid: true, text: '' },
};

export default function Login() {
  // const history = useHistory();

  const [state, setState] = useState({ email: '', password: '' });
  const { handleEmailValidation, handlePasswordValidation } = useValidation();
  const [error, setError] = useState(initialErrorState);

  const [authError, setAuthError] = useState(false);
  // const token = localStorage.getItem('token');

  useEffect(() => {

  }, []);

  const handleValueInput = (e) => {
    setAuthError(false);
    const { name } = e.target;
    setState({ ...state, [name]: e.target.value });
  };

  const hendleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {/* <Header /> */}
      <LoginForm>
        <form onSubmit={hendleSubmit}>
          <div className="input-box">
            <input
              type="email"
              onBlur={(e) => handleEmailValidation(e, error, setError)}
              value={state.email}
              name="email"
              className={!error.email.valid ? 'email-invalid' : 'email-valid'}
              onChange={handleValueInput}
              placeholder="Email"
            />
            <p className={!error.email.valid ? 'input__error' : 'input__error__hidden'}>
              {error.email.text ? error.email.text : 'error msg'}
            </p>
          </div>
          <div className="input-box">
            <input
              onBlur={(e) => handlePasswordValidation(e, error, setError)}
              type="password"
              name="password"
              value={state.password}
              className={!error.password.valid ? 'pass-invalid' : 'pass-valid'}
              onChange={handleValueInput}
              placeholder="Senha"
            />
            <p className={!error.password.valid ? 'input__error' : 'input__error__hidden'}>
              {error.password.text ? error.password.text : 'error msg'}
            </p>
            <div className="forgot__password">
              <Link to="/forgotPassword" className="forgot__link">Esqueci minha senha</Link>
            </div>
          </div>
          <div className="login__btn">
            <button
              disabled={!error.email.valid || state.password.length < 8}
              type="submit"
            >
              Entrar
            </button>
          </div>
          <div className="signup">
            <Link to="/signup" className="signup__link">Criar conta</Link>
          </div>
        </form>
      </LoginForm>
    </div>
  );
}
