import { Component } from "react";
import { ShowLocationState } from "./location/show_location_state";

export class Location extends Component {

	constructor(props) {
	    super(props);
	    this.user = props.user;
	    this.pov = this.user.POV;
	    console.log(this.pov);
	}

	render() {
		return (
		<div className="Page">
		<h2>Location</h2>
		<ShowLocationState id={this.pov}/>
		</div>
		)
	}	
}
