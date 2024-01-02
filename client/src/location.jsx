import { Component } from "react";
import { ShowLocationState } from "./location/show_location_state";

export class Location extends Component {

	constructor(props) {
	    super(props);
		this.state = {loading : true}
		console.log("location constructor")
	    this.user = props.user;
	}

	componentDidMount() {
		this.user.getPOV().then((res) => {
			console.log(res);
			this.pov = res;
			console.log("setting pov");
			console.log(this.pov);
			this.setState({loading: false});
			}
		);
	}

	render() {
		console.log("are we loading?");
		console.log(this.state.loading);
		return (
		<div className="Page">
		<h2>Location</h2>
		{ this.state.loading ? 
			<span>Loading ...</span> :
			<ShowLocationState id={this.pov}/>
		}
		</div>
		)
	}	
}
