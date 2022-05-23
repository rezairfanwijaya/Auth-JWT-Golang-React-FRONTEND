// * import library
import React from "react"
import { useState } from "react"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Navigate } from "react-router-dom";
import './Login.css'


export default function Login(props) {
    // * siapkan variable penampung inputan user
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    // * siapkan variable untuk menampung redirect
    const [redirect, setredirect] = useState(false);

    // sweet alert
    const MySwal = withReactContent(Swal)

    // handle submit
    const submit = async (event) => {
        // ! diable reload
        event.preventDefault();

        // * kirim data ke backend melalui endpoint yang sudah kita bikin (http://localhost:8080/api/login)
        const resp = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', // * untuk mengambil cookies dari server
            body: JSON.stringify({
                email,
                password,
            })
        })

        let code = resp.status
        let content = await resp.json()

        const user = await fetch('http://localhost:8080/', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', // * untuk mengambil cookies dari server
        })

        const totalUser = await user.json()
        const allUser = totalUser.data
        

        // ! ketika ada error dari backend
        if (code === 200) {
            let timerInterval
            MySwal.fire({
                title: 'Login Berhasil',
                icon: 'success',
                timer: 2300,
                timerProgressBar: false,
                didOpen: () => {
                    Swal.showLoading()
                },
                willClose: () => {
                    clearInterval(timerInterval)
                }
            }).then((result) => {
                // * ketika berhasil register ubah nilai redirect menjadi true agar langsung diarahkan ke halaman login
                if (result.dismiss === Swal.DismissReason.timer) {
                    setredirect(true)
                    props.setname(content.name)
                    props.settotal(totalUser.total)
                    props.setalluser(allUser)
                }
            })
        } else {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Email atau password salah`,
            })
        }
    }

    if (redirect) {
        return <Navigate to="/" />
    }


    return (
        <>
            <main className="form-signin">
                <form onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => setemail(e.target.value)} />
                        <label for="floatingInput">Email address</label>
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setpassword(e.target.value)} />
                        <label for="floatingPassword">Password</label>
                    </div>
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2017–2021 Reza Irfan Wijaya</p>
                </form>
            </main>
        </>
    )
}


