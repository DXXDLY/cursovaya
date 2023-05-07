import React from 'react'
import { loginEndpoint } from './sdfsdf'
const Login = () => {
  return (
    <div className='backgroundLogin'>
      <div className='textLogin'>
        <div className="btnLogin">
          <a className='textLink' href={loginEndpoint}><h3>Login</h3></a>
        </div>
      </div>
      {/* <video src={videoBg} autoPlay loop muted /> */}
    </div>
  )
}

export default Login