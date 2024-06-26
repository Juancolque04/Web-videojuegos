import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PageInicio = () => {
  const [videojuegos, setVideojuegos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/videojuegos/games')
      .then(response => {
        setVideojuegos(response.data);
      })
      .catch(error => {
        console.error('Hubo un error al obtener los videojuegos!', error);
      });
  }, []);

  return (
    <Container>
      <h1 className="text-center mt-4 mb-5">Nuestros Videojuegos</h1>
      <Row xs={1} md={3} className="g-4">
        {videojuegos.map(videojuego => (
          <Col key={videojuego.gameID}>
            <Card className="h-100">
              <Card.Img variant="top" src={videojuego.thumb || 'https://via.placeholder.com/150'} />
              <Card.Body className='cuerpoTabla'>
                <Card.Title>{videojuego.title}</Card.Title>
                <Card.Text>
                  <strong>Año:</strong> {videojuego.releaseDate || 'No disponible'}<br />
                  <strong>Precio:</strong> ${videojuego.salePrice || 'No disponible'}
                </Card.Text>

                <Link to={`/comparar/${videojuego.gameID}`}>
                  <Button variant="primary">Comparar</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PageInicio;
