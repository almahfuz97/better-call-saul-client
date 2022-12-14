import { GoogleAuthProvider } from 'firebase/auth'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthProvider/AuthProvider'
import useTitle from '../../hooks/useTitle'
import Spin from '../../shared/Spinner/Spin'

const provider = new GoogleAuthProvider();

export default function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { user, providerSignIn, signIn, loading, setLoading } = useContext(AuthContext);
    const location = useLocation();
    const from = '/home';
    const navigate = useNavigate();
    const [err, setErr] = useState('');
    const [spinner, setSpinner] = useState(false);

    useTitle('Login')
    // login with email pass
    const onSubmit = data => {
        setSpinner(true)
        signIn(data.email, data.password)
            .then(result => {
                const u = result.user;
                const currentUser = {
                    email: u.email
                }
                // jwt
                fetch(`https://service-a11-server.vercel.app/jwt`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                }).then(res => res.json())
                    .then(data => {
                        console.log(data);
                        localStorage.setItem('service-token', data.token);
                    })
                    .catch(err => {
                        console.log(err);
                    })

                setErr('')
                setSpinner(false)
            })
            .catch(err => {
                console.log(err);
                setErr("Invalid Credentials!")
                setSpinner(false);
            })

    }
    // goolgle sign in
    const handleGoogle = () => {
        providerSignIn(provider)
            .then(result => {
                const user = result.user;
                const userEmail = {
                    email: user.email,
                }
                // jwt
                fetch(`https://service-a11-server.vercel.app/jwt`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userEmail)
                }).then(res => res.json())
                    .then(data => {
                        console.log(data);
                        localStorage.setItem('service-token', data.token);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => console.log(err))
    }

    if (loading) return <Spin />
    if (user) return <Navigate to={from} />
    return (
        <div className='flex justify-center mt-12 mx-4'>

            <div className='border p-8 rounded-lg shadow-lg md:w-96'>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4  ">
                    <h3 className=' text-center uppercase font-bold'>Login</h3>
                    <div>
                        {
                            spinner && <Spin />
                        }
                    </div>
                    <div>
                        <div className=' text-red-500'>{err}</div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="email1"
                                value="Email"
                            />
                        </div>
                        <TextInput
                            name="email"
                            type="email"
                            placeholder="Your email"
                            {...register('email', { required: true })}

                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label
                                htmlFor="password"
                                value="Your password"
                            />
                        </div>
                        <TextInput
                            name="password"
                            type="password"
                            {...register('password', { required: true })}
                            placeholder="Your Password"
                        />

                    </div>

                    <Button type="submit" className='mt-4'>
                        Login
                    </Button>
                    <div className="flex items-center">
                        <small>Don't have an account? <Link to='/register' state={{ from2: from }}><span className=' text-red-500 hover:text-red-600'>Register Here</span></Link></small>
                    </div>
                    <div className="flex items-center justify-center">
                        <p className='  '>Or</p>
                    </div>
                </form>
                <div className="flex items-center justify-center">
                    <button onClick={handleGoogle} className=' rounded-lg hover:shadow hover:bg-slate-100 mt-2 p-2 text-red-400'>Continue with Google</button>
                </div>
            </div>

        </div>
    )
}