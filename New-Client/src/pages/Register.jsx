import { useRef } from 'react';
import axios from './axiosConfig';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const userNameDom = useRef();
  const firstNameDom = useRef();
  const lastNameDom = useRef();
  const emailDom = useRef();
  const passwordDom = useRef();

  async function handleSubmit(e) {
    e.preventDefault();

    const usernameValue = userNameDom.current.value;
    const firstnameValue = firstNameDom.current.value;
    const lastnameValue = lastNameDom.current.value;
    const emailValue = emailDom.current.value;
    const passwordValue = passwordDom.current.value;

    if (
      !usernameValue ||
      !firstnameValue ||
      !lastnameValue ||
      !emailValue ||
      !passwordValue
    ) {
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
      await axios.post('/users/register', {
        username: usernameValue,
        firstname: firstnameValue,
        lastname: lastnameValue,
        email: emailValue,
        password: passwordValue
      });
      alert("register successful. Please login");
      navigate('/login');
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div>
          <span>username :---</span>
          <input ref={userNameDom} type="text" placeholder="username" />
        </div>
        <br />
        <div>
          <span>First name  :---</span>
          <input ref={firstNameDom} type="text" placeholder="first name" />
        </div>
        <br />
        <div>
          <span>Last name :---</span>
          <input ref={lastNameDom} type="text" placeholder="last name" />
        </div>
        <br />
        <div>
          <span>email :---</span>
          <input ref={emailDom} type="email" placeholder="email" />
        </div>
        <br />
        <div>
          <span>password :---</span>
          <input ref={passwordDom} type="password" placeholder="password" />
        </div>
        <button type="submit">Register</button>
      </form>
      <Link to={'/login'}>login</Link>
    </section>
  );
};

export default Register;
