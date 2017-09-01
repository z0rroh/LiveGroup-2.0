import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Semana from './Semana.js';


class TurnoApp extends Component{
  constructor(){
    super();
    this.state={
      turnos:[],
      isFetching: false,
    }
    this.handlePostTurno = this.handlePostTurno.bind(this);
  }
  componentDidMount(){
    this.setState({isFetching: true})
    io.socket.get('/turnolog/entrar', function(turnos) {
      this.setState({isFetching:false,turnos: turnos});
    }.bind(this));
    io.socket.on('turnolog', function serverSentEvent(updateTurno) {
      console.log(updateTurno);
      let prevState = [];
      let nextState = [];
      prevState = this.state.turnos;
      nextState = this.state.turnos;
      console.log(updateTurno);
      for(let i = 0;i<prevState[updateTurno.data.day].data.length;i++){
        if(prevState[updateTurno.data.day].data[i].id === updateTurno.id){
          console.log(nextState[updateTurno.data.day].data[i]);
          Object.assign(nextState[updateTurno.data.day].data[i], updateTurno.data);
        }
      }
      this.setState({turnos: nextState});
    }.bind(this));
  }
  handlePostTurno(id){
    var data = {id:id};
    io.socket.post('/turnolog/entrar/',data,(resData) => {
      this.setState({tokens: resData.tk});
      console.log(this.state.tokens);
    });
  }

  whatRender(){
    var isEmpty = true;
    for(let i=0; i<this.state.turnos.length; i++){
      if(this.state.turnos[0].data.length > 0)
        console.log(this.state.turnos[0].data.length);
        isEmpty = false;
    }
    if(isEmpty === true){
      return( <div className="no-turnos">
                <div><i className="material-icons">access_time</i></div>
                  <h2>No hay turnos disponibles</h2>
             </div>
      )
    }else{
      return(
        <Semana
          handlePostTurno={this.handlePostTurno}
          isFetching={this.state.isFetching}
          turnos={this.state.turnos} />
      )
    }
  }

  render(){
    return(
      <div className="col-lg-12">{this.whatRender()}</div>

    )
  }
}


export default TurnoApp
