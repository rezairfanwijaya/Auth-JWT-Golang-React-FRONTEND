import React from "react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


export default function Register() {

    // variable untuk menampung inputan dari form 
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    // variable untuk membuat redirect false terlebih dahulu
    const [redirect, setredirect] = useState(false);

    // sweet alert
    const MySwal = withReactContent(Swal)

    // function handler submit
    // * buat function menjadi async
    const submit = async (e) => {
        // ! stop reload
        e.preventDefault();

        // * kirim data dari form ke backend melalui endpoint yang sudah kita bikin (http://localhost:8080/api/register)
        const resp = await fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name,
                email,
                password
            })
        })

        // !ketika ada error dari backend
        if (resp.status !== 200) {
            MySwal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `Email ${email} sudah terdaftar!`,
              })
        }else {
            let timerInterval
            MySwal.fire({
                title: 'Registrasi Berhasil',
                icon: 'success',
                timer: 2300,
                timerProgressBar: false,
                didOpen: () => {
                  Swal.showLoading()
                  const b = Swal.getHtmlContainer().querySelector('b')
                  timerInterval = setInterval(() => {
                    b.textContent = Swal.getTimerLeft()
                  }, 100)
                },
                willClose: () => {
                  clearInterval(timerInterval)
                }
              }).then((result) => {
                // * ketika berhasil register ubah nilai redirect menjadi true agar langsung diarahkan ke halaman login
                if (result.dismiss === Swal.DismissReason.timer) {
                    setredirect(true);                  
                }
              })
        }
    }

    // ketika berhasil maka akan diarahkan ke halaman login
    if (redirect) {
        return <Navigate to="/login" />
    }
    

    return (
        <>
            <main className="form-signin">
                <form onSubmit={submit}>
                    <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

                    <div className="form-floating">
                        <input type="text" className="form-control" id="floatingInput" placeholder="name" onChange={e => setname(e.target.value)}  required/>
                        <label for="floatingInput">Name</label>
                    </div>

                    <div className="form-floating">
                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" onChange={e => setemail(e.target.value)}  required/>
                        <label for="floatingInput">Email address</label>
                    </div>

                    <div className="form-floating">
                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" onChange={e => setpassword(e.target.value)} required/>
                        <label for="floatingPassword">Password</label>
                    </div>

                   
                    <button className="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
                    <p className="mt-5 mb-3 text-muted">&copy; 2017–2021 Reza Irfan Wijaya</p>
                </form>
            </main>
        </>
    )
}

