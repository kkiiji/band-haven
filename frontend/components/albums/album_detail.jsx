var React = require('react');
var ReactCSS = require('react-addons-css-transition-group');
var History = require('react-router').History;
var AlbumStore = require('../../stores/album');
var SongIndex = require('../songs/song_index');
var ApiActions = require('../../actions/api_actions');
var ApiUtil = require('../../util/api_util');

var AlbumDetail = React.createClass({
  mixins: [History],
  getInitialState: function () {
    // debugger;
    return {
      top: this.props.style.top,
      album: null
    }
  },

  componentDidMount: function () {
    var that = this;
    setTimeout(function () {
      that.setState({ top: "60" });
      window.scrollTo(0, 0);
    }, 600);
    this.listener = AlbumStore.addListener(this.onChange);
    ApiUtil.fetchSingleAlbum(parseInt(this.props.params.albumId));
  },

  onChange: function () {
    this.setState({ album: AlbumStore.featuredAlbum() });
  },

  componentWillUnmount: function () {
    this.listener.remove();
  },

  render: function () {
    var albumDetail = "";
    if (this.state.album) {
      albumDetail = (
        <div style={{ top: this.state.top }} className="album-detail">
          <h3>{this.state.album.title} Page</h3>
          <h4>By artist {this.state.album.artist.username}</h4>
          <SongIndex album={this.state.album}/>
        </div>
      )
    }
    // debugger;
    return (
      <div>
        {albumDetail}
      </div>
    )
  }
});

module.exports = AlbumDetail;
