import React from "react";


class Register extends React.Component {
    render () {
        return (
            <>
                <main className="form-signin">
                    <form>
                        <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

                        <div className="form-floating">
                            <input type="text" className="form-control" id="floatingInput" placeholder="name" />
                                <label for="floatingInput">Name</label>
                        </div>

                        <div className="form-floating">
                            <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                <label for="floatingInput">Email address</label>
                        </div>

                        <div className="form-floating">
                            <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                            <label for="floatingPassword">Password</label>
                        </div>

                        <div className="checkbox mb-3">
                            <label>
                                <input type="checkbox" value="remember-me" /> Remember me
                            </label>
                        </div>
                        <button className="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
                        <p className="mt-5 mb-3 text-muted">&copy; 2017–2021 Reza Irfan Wijaya</p>
                    </form>
                </main>
            </>
        )
    }
}

export default Register;