import React from "react";
import { Switch, Route } from "react-router-dom";
import { UsersList } from "../users/users-list/UsersList";
import { User } from "../users/user/User";
import { AuthenticatedRoute } from "../../core/guards/AuthenticatedRoute";
import { UserEdit } from "../users/user-edit/UserEdit";
import { NoteList } from "../notes/notes-list/NotesList";
import { NoteEdit } from "../notes/notes-edit/NoteEdit";
import { MyNotes } from "../notes/my-notes/MyNotes";




export function Main() {
  return (

      <div className="main-content" >
          <Switch>
              <AuthenticatedRoute exact path="/users" component={UsersList} />
              <AuthenticatedRoute exact path="/users/create" admin={true} component={UserEdit} />
              <AuthenticatedRoute exact path="/users/:id" component={User} />
              <AuthenticatedRoute exact path="/users/edit/:id" admin={true} component={UserEdit} />

              <AuthenticatedRoute exact path="/notes" component={NoteList} />
              <AuthenticatedRoute exact path="/notes/my-notes" component={MyNotes}/>
              <AuthenticatedRoute exact path="/notes/create" component={NoteEdit}/>
              <AuthenticatedRoute exact path="/notes/edit/:id" component={NoteEdit}/>
          </Switch>
      </div>


  );
}

