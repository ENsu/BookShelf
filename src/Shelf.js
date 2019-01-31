import React, { Component } from 'react'
import Book from './Book'

class Shelf extends Component {
	/* 
	books = {"title":..., "author":..., "cover_img":...}
	*/
    updateBookShelf = (book, shelf) => {
      this.props.updateBookShelf(book, shelf)
    }

    render() {
       const { shelf_name, books } = this.props

       return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{ shelf_name }</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map((book) => (
	              <li key={book.id}>
	                <Book book={book}
                        updateBookShelf={this.updateBookShelf}
                        />
	              </li>
              ))}
            </ol>
          </div>
        </div>
       	)
    }
}
export default Shelf
