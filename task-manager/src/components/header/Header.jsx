import React, { useState } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { logout } from "../../core/api/users.api";
import './Header.css';



const logoutStyle = {
    cursor: 'pointer'
  };

export const Header =  withRouter((props) => {
    console.log("HEADER PROPS => ",props);
    const [isLoggedOut, setLogoutFlag] = useState(false);
    const[searchParam,setSearchParam] = useState('');

    const onLogout = (event) => {
        logout();
        setLogoutFlag(true);
    }

    const onSearchChange = (event) => {
        event.persist();
        setSearchParam(event.target.value);
      }
    
      const onSearchClick = (event) => {
        event.preventDefault();
        const pathNameUrl = props.location.pathname.substr(1);
    
        const historyObj = { pathname: `/${pathNameUrl}` };
        if (searchParam) {
          historyObj['search'] = `?q=${searchParam}`;
        }
    
        props.history.push(historyObj);
      }

    return(
        <>
        {isLoggedOut && <Redirect to="/login" />} 
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
                <div className="container">
                <a className="navbar-brand" href="index.html">Task Manager</a>
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/users">Users</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/users/create">Create user</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/notes">All notes</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/notes/my-notes">My notes</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/notes/create">Create Note</Link>
                    </li>
                    
                    <li className="nav-item">
                    <form className="form-inline my-2 my-lg-0" onSubmit={onSearchClick}/>
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={onSearchChange}></input>
                    <button className="btn bg-light my-2 my-sm-0" type="submit">Search</button>
                    </li>
                    <li className="nav-item">
                        <button  style={logoutStyle} onClick={onLogout} >Logout</button>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>
                   
            <header className="masthead" >
                <div className="overlay"></div>
                <div className="container">
                <div className="row">
                    <div className="col-lg-8 col-md-10 mx-auto">
                    <div className="site-heading">
                        <h1>Task Manager</h1>
                        <span className="subheading">Just and app with notes</span>
                    </div>
                    </div>
                </div>
                </div>
            </header>
        </>
    );
})