import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Container, Row, Accordion, Col } from 'react-bootstrap';
import { capitalize } from '../helpers';

const cardStyle = {
    background : 'rgba( 0, 0, 0, 0.10 )',
    boxShadow : '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur( 0.0px )',
    borderRadius: '10px',
    border : '1px solid rgba( 255, 255, 255, 0.18 )',
    padding : "10px",
    margin : "10px",
    color : "white"
}

const accordionStyle = {
    background : 'rgba( 0, 0, 0, 0.20 )',
    boxShadow : '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur( 0.0px )',
    borderRadius: '10px',
    border : '1px solid rgba( 255, 255, 255, 0.18 )',
    padding : "10px",
    margin : "10px",
    
}

const innerCardStyle = {
    background : 'rgba( 0, 0, 0, 0.20 )',
    boxShadow : '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur( 0.0px )',
    borderRadius: '10px',
    border : '1px solid rgba( 255, 255, 255, 0.18 )',
    margin : "10px",
}

const innerListStyle = {
    background : 'rgba( 0, 0, 0, 0.50 )',
    boxShadow : '0 8px 32px 0 rgba( 31, 38, 135, 0.37 )',
    backdropFilter: 'blur( 0.0px )',
    borderRadius: '10px',
    border : '1px solid rgba( 255, 255, 255, 0.18 )',
    margin : "10px",
    color : 'black'
}

const textStyle = {
    color : 'white'
}

export default function DetailsContainer(props) {
    const [everybody, setEverybody] = useState([]);

    useEffect(() => {
        fetch('/person/everyone', {
            method : `GET`
        }).then(res => res.json()).then(everybody => { 
    
            setEverybody(everybody)})

    }, []);

    console.log(everybody)

    return (
        <Container fluid>
            <Row>
                <Col>
                    {everybody.map(person => {
                    return (
                            <div>
                                <Card key={person._id} style={cardStyle}>
                                    <Card.Body>
                                        <Card.Title>{capitalize(person.firstname)} {capitalize(person.lastname)}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted"><em>{person.occupation}</em></Card.Subtitle>
                                        <Card.Text>
                                            <Accordion style={accordionStyle}>
                                                <Card style={innerCardStyle}> 
                                                    <Accordion.Toggle as={Card.Header} eventKey="0">
                                                        Details
                                                    </Accordion.Toggle>
                                                    <Accordion.Collapse eventKey="0">
                                                        <>
                                                            <ListGroup variant='flush' style={innerListStyle}>
                                                                <ListGroup.Item>Gender : {capitalize(person.gender)}</ListGroup.Item>
                                                                <ListGroup.Item>Address : <em>{capitalize(person.address)}</em></ListGroup.Item>
                                                            </ListGroup>
                                                            <ListGroup style={innerListStyle} horizontal>
                                                                <ListGroup.Item>Parents : </ListGroup.Item>
                                                                    {(person.parents.length) ? person.parents.map(parent => {
                                                                        return (
                                                                        <>
                                                                            <ListGroup.Item 
                                                                                key={parent.parent1}
                                                                            > 
                                                                            {capitalize(parent.parent1.firstname)} {capitalize(parent.parent1.lastname)}
                                                                            </ListGroup.Item>
                                                                            <ListGroup.Item 
                                                                                key={parent.parent2}
                                                                            > 
                                                                                {capitalize(parent.parent2.firstname)} {capitalize(parent.parent2.lastname)}
                                                                            </ListGroup.Item>
                                                                        </>
                                                                        )
                                                                    }) : <ListGroup.Item>Unknown</ListGroup.Item>
                                                                    }
                                                            </ListGroup>
                                                            <ListGroup style={innerListStyle} horizontal>
                                                                <ListGroup.Item>Partner : </ListGroup.Item>
                                                                    {(person.partner.length) ? person.partner.map(partner => {
                                                                        return (
                                                                        <>
                                                                            <ListGroup.Item 
                                                                                key={partner._id}
                                                                            > 
                                                                            {capitalize(partner.firstname)} {capitalize(partner.lastname)}
                                                                            </ListGroup.Item>
                                                                        </>
                                                                        )
                                                                    }) : <ListGroup.Item>None</ListGroup.Item>
                                                                    }
                                                                </ListGroup>
                                                            <ListGroup variant='flush' style={innerListStyle}>
                                                                {
                                                                    (person.children.length) ? person.children.map(child => {
                                                                        return <ListGroup.Item key={child._id}>{capitalize(child.firstname)} {capitalize(child.lastname)}</ListGroup.Item>
                                                                    }) : <ListGroup.Item>No known children</ListGroup.Item>
                                                                }
                                                            </ListGroup>
                                                        </>
                                                    </Accordion.Collapse>
                                                </Card>
                                            </Accordion>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </div>
                        )
                    })}
                </Col>
            </Row>
        </Container>
    );
};

