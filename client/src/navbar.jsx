export const NavBar = (props) => {

    return (
	<div
	  className="navigation-menu">
	  <ul>
	    <li>
	      <button className="nav-button" onClick={() => props.onPageChange('location')}>Location</button>
	    </li>
	    <li>
	      <button className="nav-button" onClick={() => props.onPageChange('profile')}>Profile</button>
	    </li>
	    <li>
	      <button className="nav-button" onClick={() => props.onPageChange('develop')}>Develop</button>
	    </li>
	    <li>
	      <button className="nav-button" onClick={props.handleLogoutClick}>Log Out</button>
	    </li>
	  </ul>
	</div>
    )
}
