import { useRef, useState } from 'react';
import axios from './axiosConfig';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if (!emailValue || !passwordValue) {
      setError("Please provide all required information");
      return;
    }

    try {
      const { data } = await axios.post('/users/login', {
        email: emailValue,
        password: passwordValue
      });
      // Clear the error message if login is successful
      setError('');
      localStorage.setItem("token", data.token);
      navigate('/');
    } catch (error) {
      setError(error?.response?.data?.msg || "Invalid email or password");
      console.log(error.response.data);
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <span>email :---</span>
          <input ref={emailDom} type="email" placeholder="email" />
        </div>
        <br />
        <div>
          <span>password :---</span>
          <input ref={passwordDom} type="password" placeholder="password" />
        </div>
        <button type="submit">Login</button>
      </form>
      <Link to={'/register'}>register</Link>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </section>
  );
}

export default Login;
