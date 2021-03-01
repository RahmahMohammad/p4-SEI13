import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function UserProfile(props) {

    const history = useHistory();

    //call the data
    const { name, role, experience, events, pastEvents, appliedEvents, _id } = props.auth.currentUser;

    const editProfile = () => {
        history.push(`./editProfile/${_id}`)
    }

    const addEvent = () => {
        history.push(`./addEvent`)
    }

    return (
        <>
            <h4> Name : {name} </h4>
            <br />
            <h4> role : {role} </h4>
            <br />

            <h4> events : {events} </h4>
            <br />
            <h4> pastEvents : {pastEvents} </h4>
            <br />
            <h4> experience : {experience} </h4>
            <br />
            <h4> appliedEvents : {appliedEvents} </h4>
            <br />

            <Link to={`/editProfile/${_id}`} >
                <Button onClick={() => editProfile()} className="outline-light" >
                    Edit Profile </Button></Link>


            <Link to={`/addEvent`} >
                <Button onClick={() => addEvent()} className="outline-light" >
                    Add Event </Button></Link>

        </>
    )
}
