import React from 'react';

function LoginForm({ children }) {
  return (
    <section className="img__container">
      <div className="contentBx">
        <div className="form__container">
          <div className="form__title" />
          {children}
        </div>
      </div>
    </section>
  );
}

export default LoginForm;
