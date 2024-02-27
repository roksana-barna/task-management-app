import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/gradient-logo-template-with-abstract-shape_23-2148211728.jpg'
import { AuthContext } from '../AuthProvider';


const Navbar = () => {
     const { user, logOut } = useContext(AuthContext)
    const handleLogOut = () => {
        logOut()
            .then(result => { })
            .catch(error => console.error(error));
    }
    const nav =
        <div className=' flex  text-base-content font-semibold text-lg'>
            <li><NavLink to='/'
                className='text-orange-300 font-normal md:text-white text-base  bg-transparent'

            >Home</NavLink></li>
            <li><NavLink to='/usecases' className='text-orange-300 font-normal text-base md:text-white  bg-transparent'

            >Use Cases</NavLink></li>
            <li><NavLink to='/about' className=' font-normal  md:text-white text-base bg-transparent'

            >About</NavLink></li>

            <li><NavLink to='/blog' className='text-orange-300 font-normal md:text-white text-base bg-transparent'

            >Blog</NavLink></li>
            <li><NavLink to='/contact' className='text-orange-300 font-normal md:text-white text-base bg-transparent'

            >Contact</NavLink></li>
        </div>
    return (
        <div className=''>
            <div className="navbar lg:bg-emerald-300 ">
                <div className="navbar-start">
                    <div className="dropdown text-white bg-transparent">
                        <label tabIndex={0} className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content bg-transparent mt-3 p-2 shadow rounded-box w-24">
                            {nav}

                        </ul>
                    </div>
                    <img className='w-8 h-8  ml-2 rounded-2xl' src={logo} alt="" />
                    <Link to={"/"} className="btn btn-ghost normal-case text-xl">
                        <h1 className="text-3xl font-bold mb-4" style={{
                            background: '-webkit-linear-gradient(45deg, #FFFF00, #800080, #0000FF)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}>
                            Task Tonic
                        </h1>

                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">
                        {nav}
                    </ul>
                </div>
                <div className="navbar-end">
                   {
                        user ? <Link to='/login'><button onClick={handleLogOut} className="btn bg-blue-950 text-white" >LogOut</button></Link> :
                            <Link to='/login'><button className="btn bg-blue-950 text-white">LogIn</button></Link>
                    }
                    {user &&
                        <div className="tooltip tooltip-bottom ml-2" data-tip={user.displayName}>
                            <img className='w-10 h-10 rounded-2xl' src={user.photoURL} alt="" />
                        </div>
                    }


                </div>
            </div>
        </div>
    );
};

export default Navbar;