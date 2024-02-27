import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import img from "../assets/6.jpg"
import { FaHandPointRight } from 'react-icons/fa';
import './Style.css';
import Swal from 'sweetalert2';

// import Swal from 'sweetalert2';
// import { AuthContext } from '../../AuthProvider';
// import SocialLogin from '../../Shared/SocialLogin/SocialLogin';
const Register = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({

  });
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const onSubmit = data => {
    const user_email = data.email;

    createUser(data.email, data.password)
      .then(result => {

        const loggedUser = result.user;
        console.log(loggedUser);

        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            const saveUser = { name: data.name, email: data.email, photoURL: data.photoURL, subscriptionFee: data.subscriptionFee, couponCode: data.couponCode, nidNumber: data.nidNumber, nidFrontPart: data.nidFrontPart, nidBackPart: data.nidBackPart }
            fetch('https://dropzey-server.vercel.app/users', {
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify(saveUser)
            })
              .then(res => res.json())
              .then(data => {
                if (data.insertedId) {

                  reset();
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'User created successfully.',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  localStorage.setItem("usr_email", user_email);
                  navigate('/') || navigate('register2');

                }



              })

          })
          .catch(error => console.log(error))
      })
  };

  return (
    <>
      <div className="hero min-h-screen img ">
        <div className="hero-content  flex-col  lg:flex-row-reverse">
          <div className="">
            {/* <img className='' src={img}alt="" /> */}

          </div>
          <div className='text-cyan-600'><FaHandPointRight></FaHandPointRight></div>
          <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100">
            <form className="card-body bg-base-200 " onSubmit={handleSubmit(onSubmit)} >
              <h1 className='text-center font-bold text-xl uppercase'>Create Account</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text"> Name</span>
                </label>
                <input type="text"  {...register("name", { required: true })} name="name" placeholder=" Name" className="input input-bordered" />
                {errors.name && <span className="text-red-600">Name is required</span>}
              </div>


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
                <input type="password"  {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
                })} placeholder="password" className="input input-bordered" />
                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase,One Special Character</p>}

              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text"> Confirm Password</span>
                </label>
                <input type="password"  {...register("password", {
                  required: true,
                  minLength: 6,
                  pattern: /(?=.*[A-Z])(?=.*[!@#$&*])/
                })} placeholder=" Confirm password" className="input input-bordered" />
                {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be 6 characters</p>}
                {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one Uppercase,One Special Character</p>}

                {/*  */}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input type="text"  {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
              </div>

 
            
              {/* <SocialLogin></SocialLogin> */}

              <div className="form-control mt-6">                 <input className="btn bg-cyan-600 text-white" type="submit" value="Register" />
              </div>
            </form>
            <div className='flex gap-2'>
              <p className='mb-6'><small className='text-blue-900 pl-8  mt-4'>Already have an account?? <button className='bg-cyan-500 text-white px-4 py-1 '><Link to="/login">Login</Link></button></small></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Register;