import { useState } from "react";
import apiclint from "../../service/apiClient";

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, SetError] = useState("")
    const [success, setSuccess] = useState("")
    const handelsubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        SetError('');
        try{
            console.log("trying to login");
            const data=await apiclint.login(email,password);
            console.log("login response:",data);
            setSuccess("succesfully loggedin")
            
            

        }
        catch(error){
            setSuccess("")
            console.log("login unsuccesfull");
            

        }
        finally{
            setLoading(false)
        }
        

    }

    return (
        <div>
            <h1>Welcome to login page</h1>
            <p>please enter your email and password</p>
            <div className="login">
                <form onSubmit={handelsubmit}>
                    <div className="from-group">
                        <label htmlFor="email">email:</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {/* for password */}
                    </div>
                    <div className="from-group">
                        <label htmlFor="password">password:</label>
                        <input
                            type="password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" disabled={loading}> {loading ? 'login...' : 'login'}</button> 
                    {error && <p style={{color:"red"}}>sorry dont login </p>}
                    {success && <p style={{ color: "green" }}>{success}</p>}
                </form>

            </div>

        </div>
    )
}

export default Login;