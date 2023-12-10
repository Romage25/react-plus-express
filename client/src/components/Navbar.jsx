import { Link } from  'react-router-dom';

const Navbar = () => {
  return (
    <div className="navbar-container">
      <Link to={'/'}>Home</Link>
      <Link to={'/add'}>Add</Link>
    </div>
  )
}

export default Navbar