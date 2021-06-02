import React, { useEffect, useState } from 'react';
import { Spinner, Button, Card, Form, Badge } from 'react-bootstrap';
import { capitalize } from '../helpers';


export default function SetChildForm() {
    const [families, setFamilies] = useState([]);
    const [everybody, setEverybody] = useState([]);

    const [parent, setParent] = useState([]);
    const [child, setChild] = useState();


    useEffect(() => {

        fetch('/family/families', {
            method: `GET`
        }).then(res => res.json()).then(families => {
            console.log(families)
            setFamilies(families);
        })

        fetch('/person/everyone', {
            method : `GET`,
        }).then(res => res.json()).then(everybody => {
            setEverybody(everybody);
        })

    }, []);

    const addChildren = async () => {

        let modifiedFamily = await fetch('/person/setChild', {
            method : `PUT`,
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({

            })
        })
    }
    
    console.log(parent);
    return (
        <>
            <Form>
                <Form.Label>Select Family</Form.Label>
                <Form.Group>
                    <Badge pill variant="primary">Parents</Badge> 
                    <Form.Control as="select" onChange={(e) => { setParent(e.target.dataset.id); console.dir(e.target); console.log(e.target.dataset.id)}}>
                        <option>-- Select Couple --</option>
                        {families.map(couples => {
                        
                           return ( 
                                        <option 
                                            value={`${couples.parent1.person_Id}`}
                                            data-id={`${couples.parent1.person_Id}`}
                                            key={families.indexOf(couples)}
                                            >
                                                {capitalize(couples.parent1.firstname)} {capitalize(couples.parent1.lastname)} 
                                                &nbsp; and &nbsp;
                                                {capitalize(couples.parent2.firstname)} {capitalize(couples.parent2.lastname)}
                                        </option> 
                                    )
                                }
                            )
                        }               
                    </Form.Control>
                </Form.Group>
                <Form.Group>
                    <Badge pill variant="success">Child</Badge>
                    <Form.Control as="select" onChange={(e) => setChild(e.target.value) }>
                        <option>-- Select Child --</option>
                        {everybody.map(person => {
                            return ( 
                                            <option 
                                                value={`${person._id}`}
                                                key={`${person._id}`}
                                            >
                                                {capitalize(person.firstname)} {capitalize(person.lastname)} 
                                            </option> 
                                        )
                                    }
                                )
                        }
                    </Form.Control>
                </Form.Group>
                <Button variant="info">Set Child</Button>
            </Form>
        </>
    )
}