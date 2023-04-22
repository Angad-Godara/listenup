import React, { useRef, useEffect } from 'react'
import './Login.css'
import { Link, useNavigate } from 'react-router-dom'
import { auth, googleProvider, githubProvider, facebookProvider, twitterProvider } from '../../firebase';
import db from '../../firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../../Features/userSlice'
import { AiFillGoogleCircle } from 'react-icons/ai'

function Login() {
    // const user = useSelector(selectUser);

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const store = (authUser) => {

        // pending checkblocks 

        // if user exists previously
        db
            .collection('users')
            .doc(authUser?.uid)
            .onSnapshot(snap => {
                if (snap.data()) {
                    return;
                } else {
                    // updating db
                    db
                        .collection('users')
                        .doc(authUser?.uid)
                        .set({
                            email: authUser?.email,
                            username: authUser?.displayName,
                            photoURL: authUser?.photoURL,
                            mstatus: 'NA',
                        })
                }
            })
    }

    const login = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(
            emailRef.current.value,
            passwordRef.current.value
        ).then((authUser) => {
        }).catch((error) => {
            alert(error.message)
        })

    }

    const googleLogin = () => {
        auth.signInWithPopup(googleProvider)
            .then((result) => {
                store(result.user)
            })
            .catch((error) => {
                alert(error.message)
            })
    }

    return (
        <div className='login__wrapper'>
            <div className='login__container'>
                <div className='login__form__wrapper'>
                    <h1 className='login__logo'>Logo</h1>
                    <form className='login__form'>
                        <span>
                            <input ref={emailRef} type="text" placeholder='E-mail' autoComplete="on" />
                        </span>
                        <span>
                            <input ref={passwordRef} type="password" placeholder='Password' autoComplete="on" />
                        </span>
                    </form>
                    <button onClick={login} className='login__button'>Sign In</button>
                    <div className='login__actions'>
                        <Link to='/forgot'>Forgot Password?</Link>
                        <Link to='/register'>Sign Up</Link>
                    </div>
                    <div className='auth__options'>
                        <p>or you can sign in with</p>
                        <div className='login__options'>
                            <AiFillGoogleCircle onClick={googleLogin} className='logo__google login__option__logos' size={'30'} />
                        </div>
                    </div>
                    <div className='welcome__note'>
                        <h3>Welcome to ListenUp</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login