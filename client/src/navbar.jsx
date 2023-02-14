export const NavBar = (props) => {
    return (
	<div
	  className="navigation-menu">
	  <ul>
	    <li>
	      <button className="link-button" onClick={() => props.onPageChange('location')}>Location</button>
	    </li>
	    <li>
	      <button className="link-button" onClick={() => props.onPageChange('profile')}>Profile</button>
	    </li>
	    <li>
	      <button className="link-button" onClick={() => props.onPageChange('develop')}>Develop</button>
	    </li>
	  </ul>
	</div>
    )
}
