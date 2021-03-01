import React, { useState, useEffect } from 'react'
import { Alert } from 'react-bootstrap'
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import API_URL from '../../utility/apiConfig'
import axios from "axios";
import { MDBBtn, MDBCard, MDBCardBody, MDBCol, MDBRow, MDBContainer } from 'mdbreact';


export default function ShowOneEvent(props) {
    const history = useHistory();
    const { id } = useParams()
    const [selectEvent, setSelectEvent] = useState(props.selectEvent ? props.selectEvent : [])
    const [error, setError] = useState(false);//prevent page from collapse


    useEffect(() => {
        if (!name) {
            axios.get(`${API_URL}/api/events/`)
                .then(res => {
                    let event = res.data.msg.find(ele => ele._id == id)
                    setSelectEvent(event)
                })
                .catch((err) => {
                    setError("Somthing is wrong")
                });
        }
    }, [])


    const { _id, name, description, location, eventType, startDate, endDate, startTime, endTime, shifts, owner, organizers } = selectEvent
    const userevent = props.user.events.find(event => props.user.events == _id)

    return (
        <MDBContainer>
            <br />
            <br />

            {error && (
                <Alert variant={"danger"}>
                    {error}
                </Alert>
            )}

            <MDBCol md='14'>
                <MDBRow className="justify-content-center">

                    <MDBCard className="w-50">
                        <br />

                        <p className="h2 text-center mb-2">More Information...</p>
                        <hr />

                        <MDBCardBody>
                            <h5>Event Name: <strong> {name}</strong></h5>
                            <h5>Location: <strong> {location} </strong></h5>
                            <h5>Date:<strong> {startDate} To {endDate} </strong></h5>
                            <h5>Description: <strong> {description} </strong></h5>
                            <h5>Duration:<strong> {startTime} - {endTime} </strong></h5>
                            <h5>Type:<strong> {eventType} </strong></h5>
                        </MDBCardBody>

                        {
                            props.user._id == owner &&
                            <> <MDBBtn className="deep-purple darken-1" href={`/addApplying/${_id}`}>Create form</MDBBtn> </>
                        }

                        {
                            props.user.role == "organizer" &&
                            <> <MDBBtn className="deep-purple darken-1" href={`/organizerApplying/${_id}`}>Join</MDBBtn> </>
                        }

                    </MDBCard>

                </MDBRow>
                <br />


            </MDBCol>
            <br />
            <br />
            <br />
        </MDBContainer>

    )
}
