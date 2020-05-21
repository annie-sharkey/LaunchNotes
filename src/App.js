import React, { Component } from "react";
import "./App.css";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      content: [],
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }
/*
When we use arrow functions like handleClick = () => {} we don't need to include
the above bind this. Makes for simpler code. 
*/
  handleClick() {
    const date = new Date();
    const title = document.getElementById("title").value;
    const desc = document.getElementById("desc").value;
    /*
    Instead of concating a note to state, I'd instead like to see the creation of
    a new array like this:
    this.setState(prevState => ({notes: [...prevState.notes, newNote]}))
    
    In your notes array, I would like to see a list of objects like [{title: title, description, description}, {title: title, description, description}, etc]
    Do not store styling in your array -- just the data.
    Then in your return use map to give each object styling like
    this.state.notes.map(note => {<div>{note.title}</div>}
    
    */
    this.setState({
      notes: this.state.notes.concat(
        <li key={title}>
          <Card>
            <CardContent>
              <Typography
                variant="subtitle1"
                color="textSecondary"
                gutterBottom
              >
                {date.toUTCString()}
              </Typography>
              <Typography variant="h6" gutterBottom>
                {title}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {desc}
              </Typography>
            </CardContent>
          </Card>
        </li>
      ),
    });
    var contentobj = { title: title, desc: desc };
    var content = this.state.content.concat(contentobj);
    this.setState({
      content: content,
    });
    document.getElementById("title").value = "";
    document.getElementById("desc").value = "";
  }

  handleDelete(i) {
    const newNotes = this.state.notes.filter(function (value, index, array) {
      return i - 1 !== index;
    });
    const newContent = this.state.content.filter(function (
      value,
      index,
      array
    ) {
      return i - 1 !== index;
    });
    this.setState({
      notes: newNotes,
      content: newContent,
    });
  }

  handleEdit(i) {
    document.getElementById("title").value = this.state.content[i - 1].title;
    document.getElementById("desc").value = this.state.content[i - 1].desc;
    this.handleDelete(i);
  }

  render() {
    return (
      <div className="App">
        <h1>Launch Notetaker</h1>
        <form>
          <label className="title">
            Title:
            <input name="title" type="text" id="title" />
          </label>
          <label className="description">
            Description:
            <textarea name="desc" id="desc" cols="90" rows="5" />
          </label>
          <input
            type="button"
            value="Create Note!"
            onClick={() => this.handleClick()}
          />
        </form>
        {this.state.notes.length != 0 && (
          <form>
            <label>Which note would you like to edit/delete? </label>
            <input
              type="number"
              id="notenumber"
              min="1"
              max={this.state.notes.length}
            />
            <Button
              onClick={() =>
                this.handleEdit(document.getElementById("notenumber").value)
              }
            >
              Edit
            </Button>
            <Button
              onClick={() =>
                this.handleDelete(document.getElementById("notenumber").value)
              }
            >
              Delete
            </Button>
          </form>
        )}
        <ol className="notes-list">{this.state.notes}</ol>
      </div>
    );
  }
}

export default App;
