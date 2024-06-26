import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';

const PageBuscar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/videojuegos/buscar?nombre=${searchTerm}`);
      setResults(response.data);
    } catch (error) {
      console.error('¡Hubo un error al buscar los videojuegos!', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <h1 className="text-center mt-4 mb-4">Buscar y Comparar Videojuegos</h1>
      <Form className="mb-4">
        <Form.Group controlId="formSearch">
          <Form.Label>Nombre del Videojuego</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese el nombre del videojuego"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSearch} disabled={loading}>
          {loading ? 'Buscando...' : 'Buscar'}
        </Button>
      </Form>
      <Row>
        {results.map((result, index) => (
          <Col key={index} md={4}>
            <Card className="mb-4">
              <Card.Img variant="top" src={result.imagen || 'https://via.placeholder.com/150'} />
              <Card.Body>
                <Card.Title>{result.nombre}</Card.Title>
                <Card.Text>
                  <strong>Año:</strong> {result.anno}<br />
                  <strong>Precio:</strong> ${result.precio}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PageBuscar;