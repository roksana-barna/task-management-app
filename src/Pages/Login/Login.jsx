import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useForm } from 'react-hook-form';
import { FaEyeSlash, FaRegEye } from 'react-icons/fa';
import './style.css';
import { AuthContext } from '../../Components/AuthProvider';

const Login = () => {
  const [show, setShow] = useState(false)
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {

    signIn(data.email, data.password)
      .then(result => {


        const loggedUser = result.user;
        const hasFilledSubscription = localStorage.getItem('hasFilledSubscription') === 'true';

        if (hasFilledSubscription) {
          // User has filled a subscription, redirect accordingly
          navigate(from, { replace: true });
        } else {
          // User hasn't filled a subscription, allow access to the subscription page
          navigate('/subscription');
        }
     
    console.log(loggedUser);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'User created successfully.',
      showConfirmButton: false,
      timer: 1500
    });
    navigate(from, { replace: true });


  })
}
return (
  <div>
    <div className="hero min-h-screen img ">
      <div className="hero-content flex-col gap-18  lg:flex-row-reverse">
        <div className="">
        </div>
        <div className="card max-w-lg w-full flex-shrink-0 w-full max-w-2xl shadow-2xl bg-base-100">
          <form className="card-body bg-base-200" onSubmit={handleSubmit(onSubmit)} >
            <p className='text-center font-bold text-xl uppercase'>Login</p>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input type="email"  {...register("email", { required: true })} name="email" placeholder="email" className="input input-bordered" />
              {errors.email && <span className="text-red-600">Email is required</span>}
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input type={show ? "text" : "password"} {...register("password", {
                required: true,
                minLength: 6,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
              })} placeholder="password" className="input input-bordered" />
              <p onClick={() => setShow(!show)}>
                <small>
                  {
                    show ? <span className='ml-4 mt-2 text-blue-700'><FaRegEye></FaRegEye></span> : <span className='ml-4 mt-2 text-blue-700'><FaEyeSlash></FaEyeSlash></span>

                  }

                </small>
              </p>
              {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
              {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
              {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase,One Special Character</p>}

            </div>

            <div className="form-control mt-6">
              <input className="btn bg-cyan-600 text-white" type="submit" value="Login" />
            </div>
          </form>
          <p className='mb-6'><small className='text-blue-900 pl-8  mt-2'>New To task management?? <button className='bg-cyan-500 text-white px-4 py-1 '><Link to="/register">Register</Link></button></small></p>

        </div>
      </div>
    </div>

  </div>
);
};

export default Login;