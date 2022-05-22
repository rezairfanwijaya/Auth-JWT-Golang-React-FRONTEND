import React from "react";

export default function Home(props) {
    
    return (
        <>
            {
                props.name ?
                    <h1 className="text-center">Hello {props.name}</h1>
                    
                    :
                    <h1 className="text-center">Silahkan login terlebih dahulu</h1>
            }

        </>
    )
}