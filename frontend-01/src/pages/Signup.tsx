import React, { useState } from 'react'
import axios, { AxiosResponse, AxiosError } from 'axios';

function Signup() {

    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [message, setMessage] = useState<string>("")

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        axios.post('http://localhost:3000/signup', {
            username,
            password
        })
            .then((response: AxiosResponse) => {
                setMessage('Signup successfull ' + response)
            })
            .catch((error: AxiosError) => {
                if (error.response) {
                    const data = error.response.data as { msg?: string };
                    setMessage(data.msg || 'Signup failed');
                } else {
                    setMessage('AN ERROR OCCURED')
                }
            })
    }


    return (
        <>
            <div className='flex items-center justify-center min-h-screen'>
                <div className="w-full max-w-xs">
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                                Username
                            </label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="username"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2" >
                                Password
                            </label>
                            <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                type="password"
                                placeholder="******************"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <p className="text-red-500 text-xs italic">
                                Please choose a password.
                            </p>
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                Sign In
                            </button>
                            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                                Forgot Password?
                            </a>
                        </div>
                    </form>
                    <p className="text-center text-gray-500 text-xs">
                        &copy;2020 Acme Corp. All rights reserved.
                    </p>
                </div>
            </div>
        </>
    )
}

export default Signup