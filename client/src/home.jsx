import React, {useState} from "react";
import { NavBar} from "./navbar";
import { Location } from "./location";
import { Profile } from "./profile";
import { Develop } from "./develop";
import { AddLocation } from "./location/add_location";
import { ShowLocation } from "./location/show_location";
import { EditLocation } from "./location/edit_location";

export const Home = (props) => {
    const [currentPage, setCurrentPage] = useState('current_page');
    const [key, setKey] = useState('0');
    
    const changePage = (pageName, key='0') => {
	setKey(key);
	console.log(key);
	setCurrentPage(pageName);
    }

    return (
	<div className="home">
	  <NavBar onPageChange={changePage} handleLogoutClick={props.handleLogoutClick}/>
	  {
        {
          'location': <Location />,
          'profile': <Profile getUser={props.getUser} />,
          'develop': <Develop changePage = {changePage}/>,
            'add_location': <AddLocation />,
	    'show_location': <ShowLocation id={key}/>,
	    'edit_location': <EditLocation id={key}/>
        }[currentPage] || < Location />
      }
	</div>
    )
}
