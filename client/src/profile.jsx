export const Profile = (props) => {
    const user = props.user;
    const username = user.username;
    const pov = user.POV;
    user.getTardis();
    const tardis_location = user.tardis_location;
    
    return (
		<div className="Page">
	  		<h1>Profile</h1>
			<p>Username: {username}</p>
			<p>User ID: {user.user_id}</p>
			<p>POV Location: {pov}</p> 
			<p>Tardis Location: {tardis_location}</p> 
		</div>
	  
    )
}
