import { useState, useEffect  } from 'react'
import { FaUser } from 'react-icons/fa'

function Register() {
  const [formData, setFormData] = useState({
    name:'',
    email:'',
    password:'',
    password2:''
  })

  const { name, email, password, password2 } = formData

  const onChange = () => {
     
  }

  return (
    <>
      <section className="heading">
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account.</p>
      </section>
      <section className="form">
        <form className='flex flex-col'>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              id="name"
              name='name'
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              id="email"
              name='email'
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password"
              id="password"
              name='password'
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="password2"
              id="password2"
              name='password2'
              value={password2}
              placeholder="Confirm password"
              onChange={onChange}
            />
          </div>
        </form>
      </section>
    </>
  )
}

export default Register