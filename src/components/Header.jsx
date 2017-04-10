import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown, MenuItem, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';


export default class Header extends Component {
  constructor(props) {
    super(props);
    this.historyPush = this.historyPush.bind(this);
  }

  historyPush(path) {
    return () => this.props.history.push(path);
  }
  
  render() {
    const { historyPush } = this;
    return(
      <div>
        <Navbar inverse fluid collapseOnSelect>
          <Navbar.Header>
            <Navbar.Brand onClick={historyPush("/")}>LadderJS</Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem onClick={historyPush("/leaderboard")}>Leaderboard</NavItem>

              <NavDropdown pullRight  title="Players" id="player-nav-dropdown">
                <NavItem onClick={historyPush("/players")}>View All Players</NavItem>
                <MenuItem onClick={historyPush("/create-player")}>Add a New Player</MenuItem>
              </NavDropdown>

              <NavDropdown pullRight  title="Matches" id="match-nav-dropdown">
              <NavItem onClick={historyPush("/matches")}>View all Matches</NavItem>
                <MenuItem onClick={historyPush("/create-match")}>Add a New Match</MenuItem>
              </NavDropdown>
              
              
            </Nav>
            {/*
            <Nav pullRight>
              <NavDropdown pullRight  title="Actions" id="user-nav-dropdown">
                <MenuItem 1}>Sign In</MenuItem>
                <MenuItem divider />
                <MenuItem onClick={historyPush("/create-match")}>Create Match</MenuItem>
                <MenuItem onClick={historyPush("/create-player")}>Create Player</MenuItem>
              </NavDropdown>
            </Nav>
            */}
          </Navbar.Collapse>
        </Navbar>
      </div>    
    );
  }
}