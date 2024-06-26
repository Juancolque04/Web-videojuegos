const express = require('express');
const axios = require('axios');
const router = express.Router();
const Busqueda = require('../models/Busqueda');

let cachedGames = [];

router.get('/games', async (req, res) => {
    try {
        const response = await axios.get('https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15');
        cachedGames = response.data.map(deal => ({
            gameID: deal.gameID,
            title: deal.title,
            releaseDate: deal.releaseDate,
            salePrice: deal.salePrice,
            thumb: deal.thumb,
        }));
        res.json(cachedGames);
    } catch (error) {
        console.error('Error fetching games from CheapShark API:', error);
        res.status(500).json({ error: 'Failed to fetch games' });
    }
});

router.get('/buscar', async (req, res) => {
    const nombreJuego = req.query.nombre;
    try {
        const response = await axios.get(`https://www.cheapshark.com/api/1.0/games?title=${nombreJuego}`);
        const juegos = response.data.map(juego => ({
            nombre: juego.external,
            anno: juego.year,
            precio: juego.cheapest,
            imagen: juego.thumb,
        }));

        const nuevaBusqueda = new Busqueda({ nombreJuego });
        await nuevaBusqueda.save();
        res.json(juegos);
    } catch (error) {
        console.error('¡Hubo un error al buscar los videojuegos!', error);
        res.status(500).json({ error: 'Error al buscar los videojuegos' });
    }
});

router.get('/comparar/:gameID', async (req, res) => {
    const gameID = req.params.gameID;

    try {
        // Buscar el juego seleccionado por gameID dentro de los juegos en caché
        const selectedGame = cachedGames.find(game => game.gameID === gameID);

        if (!selectedGame) {
            return res.status(404).json({ error: 'Juego no encontrado' });
        }

        // Filtrar juegos con el mismo precio que el juego seleccionado, excluyendo el juego seleccionado
        const samePriceGames = cachedGames.filter(game =>
            parseFloat(game.salePrice) === parseFloat(selectedGame.salePrice) && game.gameID !== gameID
        ).map(game => ({
            gameID: game.gameID,
            title: game.title,
            releaseDate: game.releaseDate,
            salePrice: parseFloat(game.salePrice),
            thumb: game.thumb,
        }));

        // Enviar los datos al frontend
        res.json({ selectedGame, samePriceGames });
    } catch (error) {
        console.error('Error al comparar juegos:', error);
        res.status(500).json({ error: 'Error al comparar juegos' });
    }
});

module.exports = router;
