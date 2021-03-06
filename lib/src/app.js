/*
* app first node
*/

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TurnoApp from './Components/Turnolog/TurnoApp.js';
import AnunciosApp from './Components/Anuncios/AnunciosApp.js';
import PerfilApp from './Components/User/PerfilApp.js';


if (window.location.pathname === "/anuncios"){
  ReactDOM.render(<AnunciosApp />, document.getElementById('anunciosapp'));
}
if(window.location.pathname === "/turnos"){
  ReactDOM.render(<TurnoApp />,document.getElementById('turnosapp'));
}

if(window.location.pathname === "/perfil"){
  ReactDOM.render(<PerfilApp />,document.getElementById('perfilapp'))
}
