import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';


const Forgot = () => {
    const router = useRouter();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')

    useEffect(() => {
        if (localStorage.getItem('token')) {
            router.push('/')
        }
    }, [])

    const handleChange = async (e) => {
        if (e.target.name == 'password') {
            setPassword(e.target.value)
        }
        if (e.target.name == 'cpassword') {
            setCpassword(e.target.value)
        }
        if (e.target.name == 'email') {
            setEmail(e.target.value)
        }
    }

    const sendResetEmail = async () => {
        let data = {
            email,
            sendMail: true
        }
        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
            method: 'POST',
            headers: {
                'Content-Type': 'appication/json',
            },
            body: JSON.stringify(data),
        })
        let res = await a.json()
        if (res.success) {
            console.log("Password reset instruction have been sent to your email.");
        }
        else {
            console.log("Error occured");
        }
    };

    const resetPassword = async () => {
        if (password == cpassword) {
            let data = {
                password,
                sendMail: false
            }
            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'appication/json',
                },
                body: JSON.stringify(data),
            })
            let res = await a.json()
            if (res.success) {
                console.log("Password changed");
            }
            else {
                console.log("Error occured");
            }
        }
    };

    return (
        <div>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img className="mx-auto h-10 w-auto" src="/logo.png" alt="Your Company" />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Forgot Password</h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {router.query.token &&
                        <div>
                            <div className="space-y-6">
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">New Password</label>
                                    <div className="mt-2">
                                        <input value={password} onChange={handleChange} id="password" name="password" type="password" autoComplete="password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="cpassword" className="block text-sm font-medium leading-6 text-gray-900">Confirm Password</label>
                                    <div className="mt-2">
                                        <input value={cpassword} onChange={handleChange} id="cpassword" name="cpassword" type="cpassword" autoComplete="cpassword" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                                    </div>
                                </div>

                                <div>
                                    <button disabled={password !== cpassword} onClick={resetPassword} type="submit" className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 disabled:bg-teal-400">Continue</button>
                                </div>
                                {password != cpassword &&
                                    <span className='text-red-600'>Password do not match</span>
                                }
                                {password && password == cpassword &&
                                    <span className='text-green-600'>Password match</span>
                                }
                            </div>
                        </div>
                    }
                    {!router.query.token &&
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                                <div className="mt-2">
                                    <input value={email} onChange={handleChange} id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6" />
                                </div>
                            </div>

                            <div>
                                <button onClick={sendResetEmail} type="submit" className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">Continue</button>
                            </div>
                        </div>}

                    <p className="mt-10 text-center text-sm text-gray-500">
                        or |
                        <Link href={'/login'} className="font-semibold leading-6 text-teal-600 hover:text-teal-500"> Login</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Forgot