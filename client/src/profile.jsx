export const Profile = (props) => {
    const user = props.getUser();
    const username = user.state.username;
    
    return (
		<div className="Page">
	  		<h1>Profile</h1>
			<p>Username: {username}</p>
		</div>
	  
    )
}
