import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import LoginForm from '../../components/LoginForm/LoginForm';
import login from '../../api';

import useValidation from '../../hooks/useValidation';
import './Login.css';

// NESTE DESAFIO, POR QUESTÕES DE PRATICIDADE, OPTEI POR ARMAZENAR O TOKEN NO LOCALSTORAGE,
// EMBORA SAIBA QUE NÃO É UMA MEDIDA SEGURA.

const initialErrorState = {
  email: { valid: true, text: '' },
  password: { valid: true, text: '' },
  name: { valid: true, text: '' },
};

export default function Login() {
  const [state, setState] = useState({ email: '', password: '' });
  const { handleEmailValidation, handlePasswordValidation } = useValidation();
  const [error, setError] = useState(initialErrorState);
  const [badReq, setBadReq] = useState('');

  const handleValueInput = (e) => {
    const { name } = e.target;
    setState({ ...state, [name]: e.target.value });
  };

  const hendleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = state;
    try {
      const res = await login({ email, password });
      localStorage.setItem('token', res.data.token);
      setBadReq('');
    } catch (err) {
      setBadReq(err);
    }
  };

  return (
    <div>
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
              disabled={!error.email.valid || state.password.length < 6}
              type="submit"
            >
              Entrar
            </button>
          </div>
          <div className="signup">
            <Link to="/signup" className="signup__link">Criar conta</Link>
          </div>
        </form>
        <p className={badReq ? 'input__error' : 'input__error__hidden'}>
          <span>Email ou senha inválidos.</span>
        </p>
      </LoginForm>
    </div>
  );
}
