import { useState } from "react"
import { useSignup } from "../hooks/useSignup"
import "../styles/signup.css"

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { signup, error, isLoading } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
    }

    return (
        <form className="signup" onSubmit={handleSubmit}>
            <h3>Sign Up</h3>

            <div className="signup-email">
                <label>Email address:</label>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </div>

            <div className="signup-password">
                <label>Password:</label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </div>

            <button disabled={isLoading} className="signup-btn">Sign up</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default Signup