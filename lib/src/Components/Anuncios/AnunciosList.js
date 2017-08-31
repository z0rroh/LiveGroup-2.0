import React, { Component } from 'react'
import AnuncioItem from './AnuncioItem'

class AnunciosList extends Component {

  constructor(props){
    super(props)
  }


  render(){
    const anunciosFound = null;
    const AnunciosRender = this.props.anuncios.map( anuncio => {
        return(
          <AnuncioItem key={anuncio.id} anuncio={anuncio} />
        )
    })
    if(this.props.anuncios.length === 0){
      return( <div className="no-anuncios">
                  <div><i className="material-icons">announcement</i></div>
                  <h3>No hay anuncios disponibles, se el primero en publicar</h3>
              </div>
            )
    }

    return (
      <div className="comments-container">
        <ul id="comments-list" className="comments-list">
            {AnunciosRender}
        </ul>
      </div>
    )
  }

}

export default AnunciosList;
