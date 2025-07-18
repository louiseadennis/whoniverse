import React, {useState} from "react";
import { NavBar} from "./navbar";
import { LocationThumbnails } from "./location/location-thumbnails";
import { CharacterThumbnails } from "./character/character-thumbnails";
import { AddLocation } from "./location/add_location";
import { ShowLocation } from "./location/show_location";
import { ShowCharacter } from "./character/show_character";
import { EditLocation } from "./location/edit_location";
import { EditCharacter } from "./character/edit_character";
import { StoryThumbnails } from "./story/story-thumbnails";
import { AddStory } from "./story/add_story";
import { ShowStory } from "./story/show_story";
import { EditStory } from "./story/edit_story";

export const DevelopItem = ({title, children, setActiveItem, activeItem, description}) => {
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

export const SubDevelopItem = ({children, setActiveItem, activeItem, description}) => {
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

    const [charactersActive, setCharactersActive] = useState(0);
	const [showCharacterActive, setShowCharacterActive] = useState(0);
	const [editCharacterActive, setEditCharacterActive] = useState(0);
	const [showAddCharacter, setShowAddCharacter] = useState(0);
	const [showShowCharacter, setShowShowCharacter] = useState(0);
	const [showEditCharacter, setShowEditCharacter] = useState(0);

 	const [StoriesActive, setStoriesActive] = useState(0);
	const [showStoryActive, setShowStoryActive] = useState(0);
	const [editStoryActive, setEditStoryActive] = useState(0);
	const [showAddStory, setShowAddStory] = useState(0);
	const [showShowStory, setShowShowStory] = useState(0);
    const [showEditStory, setShowEditStory] = useState(0);

   return (
	<div className="Page">
	  <h2>Develop</h2>
	  <DevelopItem
	  	title="Stories"
		setActiveItem={setStoriesActive}
	    activeItem={StoriesActive}
	    description="Add and Edit Stories"
		><ul>
	                <li><button onClick={() => {showAddStory ? setShowAddStory(0): setShowAddStory(1)}}>+Add Story</button></li>
					{showAddStory? <AddStory /> : <p></p>}
			<li><SubDevelopItem
			  setActiveItem={setShowStoryActive}
			  activeItem={showStoryActive}
			  description="Show Stories"
			  ><ul>
			    <StoryThumbnails revealForm = {setShowShowStory} revealed={showShowStory}/>
                          </ul>
        			{showShowStory ? <ShowStory id={showShowStory} /> : <p></p>}
					</SubDevelopItem></li>
			<li><SubDevelopItem
			  setActiveItem={setEditStoryActive}
			  activeItem={editStoryActive}
			  description="Edit Stories"
			  ><ul>
			    <StoryThumbnails revealForm = {setShowEditStory} revealed={showEditStory} />
                          </ul>
             			 {showEditStory ? <EditStory id={showEditStory} /> : <p></p>}
						  </SubDevelopItem></li>
			
		</ul>
	  </DevelopItem>
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
        			{showShowLocation ? <ShowLocation id={showShowLocation} /> : <p></p>}
					</SubDevelopItem></li>
			<li><SubDevelopItem
			  setActiveItem={setEditLocationActive}
			  activeItem={editLocationActive}
			  description="Edit Locations"
			  ><ul>
			    <LocationThumbnails revealForm = {setShowEditLocation} revealed={showEditLocation} />
                          </ul>
             			 {showEditLocation ? <EditLocation id={showEditLocation} /> : <p></p>}
						  </SubDevelopItem></li>
			
		</ul>
	  </DevelopItem>
	  <DevelopItem
	    title="Characters"
	    setActiveItem={setCharactersActive}
	    activeItem={charactersActive}
	    description="Add and Edit Characters"
	    ><ul>
	            <li><button onClick={() => {showAddCharacter ? setShowAddCharacter(0): setShowAddCharacter(1)}}>+Add Character</button></li>
					{showAddCharacter? <p>Nothing Yet</p> : <p></p>}
				<li><SubDevelopItem
			  		setActiveItem={setShowCharacterActive}
			  		activeItem={showCharacterActive}
			  		description="Show Characters">
					<ul>
			      		<CharacterThumbnails revealForm = {setShowShowCharacter} revealed={showShowCharacter}/>
						 	{showShowCharacter ? <ShowCharacter id={showShowCharacter} /> : <p></p>}
						
                    </ul>
                    </SubDevelopItem>
					
				</li>
				<li><SubDevelopItem
			  		setActiveItem={setEditCharacterActive}
			  		activeItem={editCharacterActive}
			  		description="Edit Characters">
						<ul>
			      		<CharacterThumbnails revealForm = {setShowEditCharacter} revealed={showEditCharacter}/>
  							{showEditCharacter ? <EditCharacter id={showEditCharacter} /> : <p></p>}
					</ul>
					</SubDevelopItem>
				</li>
		</ul>
	  </DevelopItem>
	</div>
    )
}
