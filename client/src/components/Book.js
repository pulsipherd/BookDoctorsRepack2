import React from 'react';
import axios from 'axios';
import ChangeForm from './ChangeForm';
import { Header, Grid, Image } from "semantic-ui-react";


class Book extends React.Component {
  state = { book: {}, edit: false }

  componentDidMount() {
    axios.get(`/api/books/${this.props.match.params.id}`)
        .then( res => this.setState({ book: res.data }) ) 
  }

  toggleEdit = () => {
    this.setState( state => {
      return { edit: !this.state.edit }
    });
  }

  submit = (book) => {
    axios.put(`/api/books/${this.props.match.params.id}`, { book })
      .then(res => this.setState({ book: res.data, edit: false }));
  }

  show() {
    let { book: { title, author, blurb, difficulty, keywords, lessons, book_image }} = this.state;
    return (
      <div>
        <Grid columns={2}>
          <Grid.Column>
            <h1>{title}</h1>
            <h3>{author}</h3>
            <h3>Reading Level: {difficulty}</h3>
          </Grid.Column>
          <Grid.Column>
            <Image src={book_image} height="400"/>
          </Grid.Column>
        </Grid>
            <p style={{ whiteSpace: 'pre-wrap' }}>{blurb}</p>

          <Header as='h5' disabled>Keywords: {keywords} | Lessons: {lessons}</Header>
      </div>
    )
  }
  

  edit() {
    return <ChangeForm {...this.state.book} submit={this.submit} />
  }

  render() {
    let { edit } = this.state;
    return (
      <div>
        {edit ? this.edit() : this.show()}
        <button onClick={this.toggleEdit}>{edit ? 'Cancel' : 'Edit'}</button>
      </div>
    )
  }
}

export default Book;
