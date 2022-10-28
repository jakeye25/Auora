import React from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";


export default function Demouser() {
    const dispatch = useDispatch()

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = "demo@aa.io";
        const password = "password";
        return dispatch(login( email, password ))

    }

    return (
        <form onSubmit={handleSubmit}>
          <button className="login__demouser" type="submit">Continue as Demo User</button>
        </form>
      );
}
