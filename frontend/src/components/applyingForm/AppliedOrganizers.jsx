import React, { useState, useEffect } from "react";
import { Container, Alert } from "react-bootstrap";
import Axios from "axios";
import API_URL from '../../utility/apiConfig'
import { MDBCol, MDBRow } from "mdbreact";
import OneCardAppliedoForm from './OneCardAppliedoForm'
import { useParams } from "react-router-dom";

export default function AppliedOrganizers(props) {

    const { id } = useParams()
    const [forms, setForms] = useState([])
    const [IsForms, setIsForms] = useState(false)
    const [error, setError] = useState(false);//prevent page from collapse

    useEffect(() => {
        Axios.get(`${API_URL}/api/events/AppliyingForm`)
            .then(res => {
                setForms(res.data.msg)
                setIsForms(true)
            })
            .catch((err) => {
                setError("Somthing is wrong")
            });
    }, [])

    console.log('form.event._id', forms)
    const AllForms = forms.map(form => {
        return form.event._id == id && <OneCardAppliedoForm auth={props.auth} isLoggedIn={props.isLoggedIn} form={form} setSelectEvent={props.setSelectEvent} />
    })

    return (
        <div>
            <Container>
                <br />
                <br />
                <MDBRow className="justify-content-md-center">
                    <MDBCol>
                        {IsForms ? AllForms : <h4>There're no Forms yet.</h4>}
                    </MDBCol>
                </MDBRow>
                <br />
                {error && (
                    <Alert variant={"danger"}>
                        {error}
                    </Alert>
                )}
                <br />
                <br />
                <br />
            </Container>
        </div>
    )
}
