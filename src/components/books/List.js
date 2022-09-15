import PropTypes from 'prop-types'
import Button from '../forms/Button'

const ListBook = ({ books = [], getBook, handleDeleteBook }) => {
    const Item = ({ children }) => {
        return (
            <div className="w-full border-gray-200 border-2 px-5 py-5 mb-2 rounded-xl">
                {children}
            </div>
        )
    }

    return books.map((book, index) => (
        <Item key={book.id}>
            <div className="flex justify-between items-center">
                <div className="flex">
                    <p className="mr-2">{index + 1}</p>
                    <p>
                        {book.name} | Rp. {book.price}
                    </p>
                </div>
                <div>
                    <Button className="mr-2" onClick={() => getBook(book.id)}>
                        Edit
                    </Button>
                    <Button
                        variant="danger"
                        onClick={() => handleDeleteBook(book.id)}>
                        Delete
                    </Button>
                </div>
            </div>
        </Item>
    ))
}

ListBook.propTypes = {
    books: PropTypes.array.isRequired,
}

export default ListBook
