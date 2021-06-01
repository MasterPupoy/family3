import React, { useEffect, useState } from 'react';
import { Accordion, Spinner, Button, Card, Form, Badge } from 'react-bootstrap';
import { capitalize } from '../helpers';


export default function SetChildForm() {
    const [families, setFamilies] = useState([]);
    const [everybody, setEverybody] = useState([]);

    const [parent, setParent] = useState();
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

    return (
        <>
            <div>
                <Badge pill variant="primary">Parents</Badge> {parent}
            </div>
            <div>
                <Badge pill variant="success">Child</Badge> {child}
            </div>
            <Form>
                <Form.Group>
                    <Form.Label>Select Family</Form.Label>
                    <Form.Control as="select">
                        <option>-- Select Couple --</option>
                        {families.map(couples => {
                           return ( 
                                        <option onClick={() => { setParent(`${capitalize(capitalize(couples.parent1.firstname))} & ${capitalize(couples.parent2.firstname)} ${capitalize(couples.parent1.lastname)}`)}}>
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
                    <Form.Control as="select">
                        <option>-- Select Child --</option>
                        {everybody.map(person => {
                            return ( 
                                            <option 
                                                onClick={() => { setChild(`${capitalize(person.firstname)}`)}}
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