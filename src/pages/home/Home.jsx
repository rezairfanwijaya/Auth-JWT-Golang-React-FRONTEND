import React from "react";
import { useState } from "react";

export default function Home(props) {

    return (
        <>
            {
                props.name ?
                    <div>
                        <h1 className="text-center mb-5">Hello {props.name}</h1>
                        <h5 className="mb-1 text-muted">Total User:{props.total}</h5>

                        <div className="row">
                            {
                                props.user.map((item, index) => {
                                    return (
                                        <div className="col-4">
                                            <div key={index} className="card mb-3">
                                                <div className="card-body">
                                                    <h5 className="card-title">{item.name}</h5>
                                                    <p className="card-text">{item.email}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    :
                    <h1 className="text-center">Silahkan login terlebih dahulu</h1>
            }

        </>
    )
}