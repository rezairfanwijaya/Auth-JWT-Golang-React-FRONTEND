import React from "react";
import { useEffect, useState } from "react";

export default function Home() {
    // * siapkan variable penampung data user 
    const [name, setname] = useState('');
    const [alluser, setalluser] = useState([]);

    // menggunakan useEffect untuk mengambil data user dari backend
    useEffect(() => {
        (
            async () => {
                const resp = await fetch("http://localhost:8080/api/user", {
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include', // * untuk mengambil cookies dari server
                });

                // ambil data user dari backend
                const data = await resp.json();
                // ganti data user di state
                setname(data.name);
            }
        )();
    })

    return (
        <>
            {/* jika berhasil login atau tidak */}
            {
                name ?
                    <h1 className="text-center">Hello {name}</h1>
                    
                    :
                    <h1 className="text-center">Silahkan login terlebih dahulu</h1>
            }

        </>
    )
}