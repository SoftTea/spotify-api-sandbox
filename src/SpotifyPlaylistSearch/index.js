import React, { Component } from 'react';
const spotifyUri = require('spotify-uri');

class SpotifyPlaylistSearch extends Component {
  constructor(){
    super();
    this.state = {
      playlistFind: '',
    }
  }

  playlistFindHandler = (e) => {
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }

  searchHandler = async (e) => {
    e.preventDefault();
    const parsedUri = spotifyUri.parse(this.state.playlistFind)
    // console.log(this.state.playlistFind)
    // console.log(parsedUri);
    const user_id = parsedUri.user;
    const playlist_id = parsedUri.id;
    let PlaylistData = await fetch(`https://api.spotify.com/v1/users/${user_id}/playlists/${playlist_id}`, {
      headers: {'Authorization': 'Bearer ' + this.props.access_token, "Accept": "application/json","Content-Type": "application/json"
    }
    });
    const playlistJson = await PlaylistData.json();
    console.log(playlistJson);
    return playlistJson;
  }
  render () {
    return(
      <div>
        <form onSubmit={this.searchHandler}>
        <input type='text' name='playlistFind' placeholder='Spotify playlist Uri' value={this.state.playlistFind} onChange={this.playlistFindHandler}/>
        <input type='submit' value='find'/>
        </form>
      </div>
    )
  }
}

export default SpotifyPlaylistSearch;