export default function useValidation() {
  const handleEmailValidation = ({ target: { value } }, error, setError) => {
    const pattern = /\S+@\S+\.\S+/;

    if (!value.match(pattern)) {
      setError({ ...error, email: { valid: false, text: 'Por favor insira um endereço de e-mail válido' } });
    } else {
      setError({ ...error, email: { valid: true } });
    }
  };

  const handlePasswordValidation = ({ target: { value } }, error, setError) => {
    if (value.length < 6) {
      setError({
        ...error,
        password:
        { valid: false, text: 'A senha deve ter pelo menos 6 caracteres' },
      });
    } else {
      setError({ ...error, password: { valid: true } });
    }
  };

  // const handleNameValidation = ({ target: { value } }, error, setError) => {
  //   if (value.length < 4) {
  //     setError({ ...error, name: { valid: false, text:
  // 'O nome deve ter pelo menos 4 caracteres' } });
  //   } else {
  //     setError({ ...error, name: { valid: true } });
  //   }
  // };

  return {
    handleEmailValidation,
    handlePasswordValidation,
    // handleNameValidation,

  };
}
