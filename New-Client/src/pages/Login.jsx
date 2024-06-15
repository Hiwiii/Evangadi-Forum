import { useRef } from 'react';
import axios from './axiosConfig';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if ( !emailValue || !passwordValue) {
      alert("please provide all required information");
      return;
    }

    // Log the form values
    // console.log({
    //   username: usernameValue,
    //   firstname: firstnameValue,
    //   lastname: lastnameValue,
    //   email: emailValue,
    //   password: passwordValue
    // });

    try {
      const {data} = await axios.post('/users/login', {
        email: emailValue,
        password: passwordValue
      });
      alert(" login successful");
      localStorage.setItem("token", data.token);
      navigate('/');
      console.log(data);
    } catch (error) {
      alert(error?.response?.data?.msg)
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
  </section>
  )
}

export default Login