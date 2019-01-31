import React from 'react'
import { Route, Link } from 'react-router-dom'

// import * as BooksAPI from './BooksAPI'
import './App.css'

import Search from './Search'
import Shelf from './Shelf'
import * as BooksAPI from './BooksAPI'


const shelfs = [
                {"name":"Currently Reading", "id":"currentlyReading"},
                {"name":"Want to Read", "id":"wantToRead"},
                {"name":"Read", "id":"read"},
               ]

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books: books.map((book) => ({"title":book.title, "author": (book.authors === undefined? "": book.authors.join(", ")), 
                "cover_img": (book.imageLinks === undefined? "": book.imageLinks.thumbnail), 
                "shelf": book.shelf, "id": book.id
        }))
      }))
  })}

  updateBookShelf = (book, shelf) => {
    this.setState((currentState) => ({
      books: [...currentState.books.filter((bookEach)=> bookEach.id !== book.id), book]
    }))
    BooksAPI.update(book, shelf)
  }

  render() {
    const { books } = this.state

    return (
      <div className="app">
        <Route path="/search" render={() =>
          <Search books={books} updateBookShelf={this.updateBookShelf} />
        } />
        <Route exact path='/' render={() =>
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelfs.map((shelf) => (
                    <Shelf key={shelf.id} shelf_name={shelf.name} 
                           books={books.filter((book)=>(book.shelf===shelf.id))} 
                           updateBookShelf={this.updateBookShelf}
                           />
                  ))}
              </div>
            </div>
            <Link className="open-search" to='/search'>
              <button>Add a book</button>
            </Link>
          </div>
        } />
      </div>
    )
  }
}

export default BooksApp
