import React, { useContext } from 'react';
import { Card, Container, Row, Col, Button } from 'react-bootstrap';
import { ItemsContext } from '../context/ContextProvider';
import { useNavigate } from 'react-router-dom';

function SelectedItems() {
    // const selectedCards = items.filter(item => selectedItems.includes(item.id));

    const { selectedItems, setSelectedItems } = useContext(ItemsContext);
    const navigate = useNavigate();

    const handlePayment = () => {
        navigate('/payment-options');
    };
    console.log("**** ", selectedItems);
    
    return (
        <>
        <Container>
            <Row>
                {selectedItems.map((item) => (
                    <Col key={item.id} sm={4}>
                        <Card className="mb-3">
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
            <Button onClick={handlePayment}>Go for payment</Button>
        </>
    );
}

export default SelectedItems;
