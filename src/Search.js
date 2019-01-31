import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import { debounce } from 'throttle-debounce';
import Shelf from './Shelf'


class Search extends Component {
	state = {
		query: "",
		books: []
	}

	updateQuery = (query) => {
		this.setState(() => ({
			query: query
		}))
		debounce(1000,
			BooksAPI.search(query)
			.then((books) => {
				let _books = Array.isArray(books) ?
						books.map((book) => ({"title":book.title, "author": (book.authors === undefined? "": book.authors.join(", ")), 
						      "cover_img": (book.imageLinks === undefined? "": book.imageLinks.thumbnail), 
						      "shelf": book.shelf || "none", "id": book.id
						})) : []
				for (let book of _books) {
					for (let prop_book of this.props.books) {
						if (book.id === prop_book.id) {
							book.shelf = prop_book.shelf
							break
						}

					}
				}
				this.setState(() => ({
					books: _books
				}))
			})
		)

	}

	updateBookShelf = (book, shelf) => {
		this.props.updateBookShelf(book, shelf)
	}
 
    render() {
       const { books, query } = this.state

       return (
	   	  <div className="search-books">
	        <div className="search-books-bar">
	          <Link className="close-search" to='/'>Close</Link>
	          <div className="search-books-input-wrapper">
	            {/*
	              NOTES: The search from BooksAPI is limited to a particular set of search terms.
	              You can find these search terms here:
	              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

	              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
	              you don't find a specific author or title. Every search is limited by search terms.
	            */}
	            <input type="text" value={query} 
	            	   placeholder="Search by title or author" 
	            	   onChange={(event) => this.updateQuery(event.target.value)}
	           	/>
	          </div>
	        </div>
	        <div className="search-books-results">
	          	<Shelf shelf_name="" books={books} updateBookShelf={this.updateBookShelf} />
	        </div>
	      </div>
	      )
   		}
}

export default Search
