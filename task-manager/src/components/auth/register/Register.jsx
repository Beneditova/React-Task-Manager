import React, {Component} from "react";
import "./Register.css"
import { register } from "../../../core/api/users.api";
import { Redirect, Link } from "react-router-dom";

export class Register extends Component {

    constructor(props){
        super(props);
        this.state= {
            name: '',
            email:'',
            password:'',
            age:'',
            isRegistered: false,
            errorMessage:''
        }
    }
    onInputChange=(event)=>{
        event.persist();
        
        this.setState({
            [event.target.name]:event.target.value,
            errMessage: ''
        });
    }

    onSubmit = (event)=>{
        event.preventDefault();
        const {isRegistered, ...user} = this.state;
        console.log(user);
        register(this.state).then(()=>{
            this.setState({
                isRegistered: true
            });
        })
        .catch((err)=> this.setState({errorMessage: err.message}));
    }

    render() {
        return(
            <>
            {this.state.isRegistered && <Redirect to ="/login"/>}
            <div className="register-wrapper">
                <form className="register-form" onSubmit={this.onSubmit}>
                    <div className="form-group">
                            {this.state.errorMessage && <span className="badge badge-pill badge-danger">{this.state.errorMessage}</span>}
                            <label labelfor="name">Name</label>
                            <input type="text" name="name" id="name" className="form-control" onChange={this.onInputChange} required/>
                        <div className="for-control">
                            <label labelfor="age">Age</label>
                            <input type="number" name="age" id="age" className="form-control" onChange={this.onInputChange} required/>
                        </div>
                        <div className="for-control">
                            <label labelfor="email">Email</label>
                            <input type="email" name="email" id="email" className="form-control" onChange={this.onInputChange} required/>
                        </div>
                        <div className="for-control">
                            <label labelfor="password">Password</label>
                            <input type="password" name="password" id="password" className="form-control" onChange={this.onInputChange} required/>
                        </div>
                    </div>
                    <button className="btn btn-primary">Register</button>
                    <Link to="/login" >Already have an account</Link>
                </form>
            </div>
            </>
        )
    }
}
