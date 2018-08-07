import React, { Component } from 'react';
const spotifyUri = require('spotify-uri');

class SearchForSong extends Component {
  constructor () {
    super();
    this.state = {
      searchTrackName: '',
      searchArtistName: '',
    }
  }

songSearchHandler = (e) => {
  this.setState({
    [e.currentTarget.name]: e.currentTarget.value,
  })
}

searchHandler = async(e) => {
  e.preventDefault();
  const artist = this.state.searchArtistName === '' ? '' : `artist:${this.state.searchArtistName}`;
  const track = this.state.searchTrackName === '' ? '' : `track:${this.state.searchTrackName}`;
  console.log(track, 'this is the track vari');
  //artist:${this.state.searchArtistName}
  const searchData = await fetch(`https://api.spotify.com/v1/search?q=${track} ${artist}&type=track`, {
    headers: {'Authorization': 'Bearer ' + this.props.access_token, "Accept": "application/json","Content-Type": "application/json"
  }
  })
  const searchJson = await searchData.json();
  console.log(searchJson);
}
  render(){
    return (
    <div>
       <form onSubmit={this.searchHandler}>
        <input type='text' name='searchTrackName' placeholder='Search Song Name' value={this.state.searchTrackName} onChange={this.songSearchHandler}/>
        <input type='text' name='searchArtistName' placeholder='Search Artist' value={this.state.searchArtistName} onChange={this.songSearchHandler}/>
        <input type='submit' value='find'/>
        </form>
    </div>
    )
  }
}

export default SearchForSong;