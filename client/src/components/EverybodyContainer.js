import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Container, Row, } from 'react-bootstrap';
import { capitalize } from '../helpers';

const cardStyle = {
    padding : "10px",
    margin : "10px"
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
                {everybody.map(person => {
                return <Card key={person._id} style={cardStyle}>
                            <Card.Body>
                                <Card.Title>{capitalize(person.firstname)} {capitalize(person.lastname)}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">Occupation : <em>{person.occupation}</em></Card.Subtitle>
                                <Card.Text>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>Gender : {capitalize(person.gender)}</ListGroup.Item>
                                        <ListGroup.Item>Address : <em>{capitalize(person.address)}</em></ListGroup.Item>
                                    </ListGroup>
                                    <ListGroup horizontal>
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
                                    <ListGroup variant='flush'>
                                        <span>Children : </span>
                                        {
                                            (person.children.length) ? person.children.map(child => {
                                                return <ListGroup.Item key={child._id}>{capitalize(child.firstname)} {capitalize(child.lastname)}</ListGroup.Item>
                                            }) : <ListGroup.Item>No known children</ListGroup.Item>
                                        }
                                    </ListGroup>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                })}
            </Row>
        </Container>
    );
};

