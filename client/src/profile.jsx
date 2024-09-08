export const Profile = (props) => {
    const user = props.user;
    const username = user.username;
    const pov = user.POV;
    user.getTardisLocation();

    const get_tardis_location = () => {
      if (user.tardis_location !== undefined) {
        return user.tardis_location;
      } else {
        const res = user.getTardisLocation();
        return "locating tardis... {res}";
      }
    }
    
    return (
		<div className="Page">
	  		<h1>Profile</h1>
			<p>Username: {username}</p>
			<p>User ID: {user.user_id}</p>
			<p>POV Location: {pov} </p> 
			<p>Tardis Location: {get_tardis_location()}</p>
	  </div>
    )
}
