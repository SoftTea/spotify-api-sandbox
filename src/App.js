import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

class App extends Component {
  constructor() {
    super();
    this.state = {
      serverData: {},
      filterString: ''
    }
  }
  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    if (!accessToken)
      return;
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      user: {
        name: data.display_name
      }
    }))

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken, "Accept": "application/json","Content-Type": "application/json"
    }
    }).then(response =>  response.json())
    .then(data => this.setState({
      playlists: data.items.map(item => {
        console.log(data, 'data in playlist')
        return {
          name: item.name,
          imageUrl: item.images[0].url, 
          songs: []
        }
    })
    })
  )

  } 
  render() {
    console.log(this.state.playlists, 'this is the state')
    return (
    <div>
    <h1>TESTS</h1>
    <img src={this.state.playlists}/>
    </div>
    )
  }
}

export default App;
