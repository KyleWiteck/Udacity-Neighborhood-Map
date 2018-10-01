import React, {Component} from 'react';

import './SideDrawer.css'

class SideDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) =>{
    this.setState({value: event.target.value});
  }

  handleSubmit = (event) => {
    this.props.filter(this.state.value)
    event.preventDefault();
  }


  handleClick = (id) => {
    let foundMarker = this.props.markers.find(marker => marker.id === id)
    window.google.maps.event.trigger(foundMarker, 'click')
  }


  render() {
    return (
      <div id='side-drawer'>
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" name="venue-type" value={this.state.value} onChange={this.handleChange}/>
          </label>
          <input type="submit" value="Filter" />
        </form>
        <div id='drawer-list'>
          <nav id='drawer-nav'>
            <ul>
              {
                this.props.venues.map((venue, index) => {
                  return(
                  <li  key={index}>
                    <a onClick={() => {this.handleClick(venue.venue.id)}} className="drawer-name">
                      {venue.venue.name}
                    </a>
                  </li>)
                })
              }
            </ul>
          </nav>
        </div>
      </div>
    )
  }
}

export default SideDrawer
