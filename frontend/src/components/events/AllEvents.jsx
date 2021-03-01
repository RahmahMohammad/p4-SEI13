import React, { useState, useEffect } from "react";
import { Row, Form, Col, Alert, Container } from "react-bootstrap";
import Axios from "axios";
import OneCardEvent from './OneCardEvent'
import API_URL from '../../utility/apiConfig'
import { MDBCol, MDBRow, MDBBtn, MDBFormInline } from "mdbreact";

export default function AllEvents(props) {

    const [error, setError] = useState(false);//prevent page from collapse
    const [events, setEvents] = useState([])
    const [locations, setLocations] = useState([])

    //search
    const [eventTypes, setEventTypes] = useState([])
    const [searchValue, setSearchValue] = useState([])
    const [searchData, setSearchData] = useState([])
    const [searchIsRunning, setSearchIsRunning] = useState(false)

    // /api/user
    useEffect(() => {
        Axios.get(`${API_URL}/api/events`)
            .then(res => {
                setEvents(res.data.msg)

                let location = res.data.msg.map(ele => ele.location)
                location.unshift('All')
                setLocations(Array.from(new Set(location)))

                let eventType = res.data.msg.map(ele => ele.eventType)
                eventType.unshift('All')
                setEventTypes(Array.from(new Set(eventType)))

            })
            .catch((err) => {
                setError("Somthing is wrong")
            });

    }, [])


    let allLocations = locations.map(ele => <option value={ele}>{ele}</option>)
    let allEventTypes = eventTypes.map(ele => <option value={ele}>{ele}</option>)


    const onChangeHandler = ({ target: { name, value } }) => {
        setSearchValue({ ...searchValue, [name]: value });

        if (value === "All") {
            setSearchData(events)
        } else {
            Axios.post(`${API_URL}/api/events/search`, value)
                .then((res) => {})
                .catch((err) => {
                    setError("Somthing is wrong")
                });

            setSearchData(events.filter(events => {
                return (events.location === value) || (events.eventType === value)
            }))
        }
        setSearchIsRunning(true)
    }

    const onSubmit = (e) => {
        e.preventDefault();
        Axios.post(`${API_URL}/api/events/search`, searchValue)
            .then((res) => {
                setSearchData(res.data.msg)
            })
            .catch((err) => {
                setError("Somthing is wrong")
            });

        //to clear the form
        document.getElementById('myform').reset();

        return setSearchIsRunning(true), searchData
    }

    
    let AllEvents
    if (searchIsRunning) {
        AllEvents = searchData.map(event => {
            return <OneCardEvent auth={props.auth} isLoggedIn={props.isLoggedIn} event={event} setSelectEvent={props.setSelectEvent} />
        })
    } else {
        AllEvents = events.map(event => {
            return <OneCardEvent auth={props.auth} isLoggedIn={props.isLoggedIn} event={event} setSelectEvent={props.setSelectEvent} />
        })
    }


    return (
        <>
            <br />
            <br />
            <br />
            <h1 className="mt-10" style={{ textAlign: "center" }}><strong>Latest Events</strong></h1>

            <Container className="mb-5 mt-3">
                <Row className="justify-content-center" >
                    <Col md="4" >

                        <Form id="myform">
                            <div className="d-flex flex-nowrap example-parent">
                                <div className="w-100 p-3" >
                                    <label htmlFor="eventType"><strong>Location:</strong></label>
                                    <div className="w-100">
                                        <select name="searchValue" onChange={onChangeHandler} >
                                            {allLocations}
                                        </select>
                                    </div>
                                </div>

                                <div className="w-100 p-3" >
                                    <label htmlFor="eventType"><strong>Event Type</strong></label>
                                    <div className="w-100">
                                        <select name="searchValue" onChange={onChangeHandler}>
                                            {allEventTypes}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="d-flex flex-nowrap example-parent">
                            </div>
                            <MDBCol md="12">
                                <MDBFormInline className="md-form mr-auto mb-4">
                                    <input name="searchValue" className="form-control mr-sm-2 " type="text" placeholder="Search" onChange={onChangeHandler} />
                                    <MDBBtn color="deep-purple darken-1 white-text" rounded size="sm" type="submit" className="mr-auto" onClick={(e) => onSubmit(e)}>
                                        Search
        </MDBBtn>
                                </MDBFormInline>
                            </MDBCol>


                            <br />
                            <br />

                        </Form>

                    </Col>

                    {error && (
                        <Alert variant={"danger"}>
                            {error}
                        </Alert>
                    )}

                </Row>


                <MDBRow className="justify-content-md-center">
                    <MDBCol>
                        {AllEvents}
                    </MDBCol>
                </MDBRow>
            </Container>

        </>
    )
}
