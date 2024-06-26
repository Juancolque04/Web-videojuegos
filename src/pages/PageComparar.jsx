import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

const PageComparar = () => {
  const { gameID } = useParams();
  const [selectedGame, setSelectedGame] = useState(null);
  const [samePriceGames, setSamePriceGames] = useState([]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/videojuegos/comparar/${gameID}`);
        setSelectedGame(response.data.selectedGame);
        setSamePriceGames(response.data.samePriceGames);
      } catch (error) {
        console.error('Error fetching compared games:', error);
      }
    };

    if (gameID) {
      fetchGames();
    }
  }, [gameID]);

  return (
    <Container>
      <h1 className="text-center mt-4 mb-4">Comparar Videojuegos</h1>
      {selectedGame && (
        <Row>
          <Col md={6}>
            <Card className="mb-4">
              <Card.Body>
                <div className='SubtitComparar'>
                  <h5>Videojuego Seleccionado</h5>
                </div>
                <Card.Title>{selectedGame.title}</Card.Title>
                <Card.Text>Año: {selectedGame.releaseDate}</Card.Text>
                <Card.Text>Precio: ${selectedGame.salePrice}</Card.Text>
                <Card.Img src={selectedGame.thumb} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card>
              <Card.Body>
                <div className='SubtitComparar'>
                  <h5>Videojuegos con el mismo Precio</h5>
                </div>
                {samePriceGames.length === 0 ? (
                  <p>No hay videojuegos con el mismo precio.</p>
                ) : (
                  <Table striped bordered responsive>
                    <thead className='table-dark' style={{ textAlign: 'center' }}>
                      <tr>
                        <th>Nombre Videojuego</th>
                        <th>Año</th>
                        <th>Precio</th>
                      </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center' }}>
                      {samePriceGames.map(videojuego => (
                        <tr key={videojuego.gameID}>
                          <td>{videojuego.title}</td>
                          <td>{videojuego.releaseDate}</td>
                          <td>${videojuego.salePrice}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      <div className="text-center mt-3">
        <Link to="/" className="btn btn-secondary">Volver a Inicio</Link>
      </div>
    </Container>
  );
}

export default PageComparar;
