import React, {useState} from "react";
import { NavBar} from "./navbar";
import { LocationThumbnails } from "./location/location-thumbnails";
import { AddLocation } from "./location/add_location";
import { ShowLocation } from "./location/show_location";
import { EditLocation } from "./location/edit_location";

function DevelopItem({title, children, setActiveItem, activeItem, description}) {
	const expanded = activeItem;

	const cls = "develop-menu-item " + (expanded ? "item-active" : "item-inactive");

  	return (
		<div className={cls}>
			<div className="develop-menu-item-head">
				<div className="develop-menu-item-head-title">{title}</div>
				<div className="develop-menu-item-head-help">
					<button
						className="menu-button"
						onClick={() => expanded? setActiveItem(0): setActiveItem(1)}
					>
					  {description}
					</button>
				</div>
				<div className="develop-menu-item-head-icon">
					<i className="fa fa-caret-down" />
				</div>
      		</div>
      		<div className="develop-menu-item-body">{children}</div>
		</div>
  );
}

function SubDevelopItem({children, setActiveItem, activeItem, description}) {
	const expanded2 = activeItem;

	const cls = "sub-develop-menu-item " + (expanded2 ? "item-active" : "item-inactive");

  	return (
		<div className={cls}>
			<div className="sub-develop-menu-item-head">
				<div className="sub-develop-menu-item-head-help">
					<button
						className="menu-button"
						onClick={() => expanded2 ? setActiveItem(0): setActiveItem(1)}
					>
					  {description}
					</button>
				</div>
				<div className="sub-develop-menu-item-head-icon">
					<i className="fa fa-caret-down" />
				</div>
      		</div>
      		<div className="sub-develop-menu-item-body">{children}</div>
		</div>
  );
}



export const Develop = (props) => {
	const [locationsActive, setLocationsActive] = useState(0);
	const [showLocationActive, setShowLocationActive] = useState(0);
	const [editLocationActive, setEditLocationActive] = useState(0);
	const [showAddLocation, setShowAddLocation] = useState(0);
	const [showShowLocation, setShowShowLocation] = useState(0);
	const [showEditLocation, setShowEditLocation] = useState(0);

    return (
	<div className="Page">
	  <h2>Develop</h2>
	  <DevelopItem
	  	title="Locations"
		setActiveItem={setLocationsActive}
	    activeItem={locationsActive}
	    description="Add and Edit Locations"
		><ul>
	                <li><button onClick={() => {showAddLocation ? setShowAddLocation(0): setShowAddLocation(1)}}>+Add Location</button></li>
					{showAddLocation? <AddLocation /> : <p></p>}
			<li><SubDevelopItem
			  setActiveItem={setShowLocationActive}
			  activeItem={showLocationActive}
			  description="Show Locations"
			  ><ul>
			    <LocationThumbnails revealForm = {setShowShowLocation} revealed={showShowLocation}/>
                          </ul>
                        </SubDevelopItem></li>
					{showShowLocation ? <ShowLocation id={showShowLocation} /> : <p></p>}
			<li><SubDevelopItem
			  setActiveItem={setEditLocationActive}
			  activeItem={editLocationActive}
			  description="Edit Locations"
			  ><ul>
			    <LocationThumbnails revealForm = {setShowEditLocation} revealed={showEditLocation} />
                          </ul>
                         </SubDevelopItem></li>
						 {showEditLocation ? <EditLocation id={showEditLocation} /> : <p></p>}
		</ul>
	</DevelopItem>
	</div>
    )
}
