import { Component } from "react";
import { ShowLocationState } from "./location/show_location_state";

export class Location extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
		<div className="Page">
		<h2>Location</h2>
		<ShowLocationState id={this.props.pov}/>
		</div>
		)
	}	
}
