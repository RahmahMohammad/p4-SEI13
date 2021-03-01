import React from "react";
import { useHistory } from "react-router-dom";
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBRow, MDBCol, MDBIcon } from 'mdbreact';


export default function OneCardEvent(props) {
  const history = useHistory();
  const { location, eventType, description, startDate, endDate, startTime, endTime, shifts, owner, organizers, name, _id } = props.event

  const editEvent = () => {
    history.push(`./editEvent/${_id}`)
  }


  return (
    <MDBRow >
      <MDBCol md="3">
        <MDBCard>
          <MDBCardBody>

            <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
            <br />
            <MDBCardTitle className="text-center"><strong>{name}</strong></MDBCardTitle>

            <hr className='black-light' />
            <MDBCardText className="black-text">
              <h6>Location: <strong>{location} </strong></h6>
              <h6>Type: <strong>{eventType} </strong></h6>
              <h6>Description: <strong> {description} </strong></h6>
            </MDBCardText>
            <br />

            {props.auth.currentUser._id == owner ? <>

              <div>
                <a href={`/appliedOrganizers/${_id}`} >
                  <MDBIcon href={`/appliedOrganizers/${_id}`} className='black-text ml-2' icon="users" />
                </a>

                <MDBIcon className="ml-2" far icon="edit" />

                <MDBIcon className="ml-2" far icon="trash-alt" onClick={e => props.deleteEvent(_id)} />
              </div>

              <a href={`/AllEvents/${_id}`} className='black-text d-flex justify-content-center'>
                <MDBIcon icon='angle-double-right' className='ml-2' />
              </a>

            </> : <>
                {/* else */}
                <a href={`/AllEvents/${_id}`} className='black-text d-flex justify-content-center'>
                  <h5>
                    More info
                <MDBIcon icon='angle-double-right' className='ml-2' />
                  </h5>
                </a>
              </>}


          </MDBCardBody>
        </MDBCard>
        <br />

      </MDBCol>
    </MDBRow>
  )
}
