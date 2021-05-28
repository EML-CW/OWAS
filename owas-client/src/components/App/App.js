import { useState } from "react";

const App = () => {
    const [usrInfo, setUsrInfo] = useState({
        username: '',
        email: '',
        arToken: ''
    })
    if (!usrInfo.username)
        return (
            <div>
                <p>OWAS Client - v0.1</p>
                <p>Login required</p>
            </div>
        )
    return (
        <div>
            <p>OWAS Client - v0.1</p>
            <p>Logged in</p>
        </div>
    )
}

export default App;