export const Profile = (props) => {
    const user = props.user;
    const username = user.state.username;
    const pov = user.state.POV;
    
    return (
		<div className="Page">
	  		<h1>Profile</h1>
			<p>Username: {username}</p>
      <p>POV Location: {pov}</p>
		</div>
	  
    )
}
