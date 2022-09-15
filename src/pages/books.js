import AppLayout from '@/components/Layouts/AppLayout'
import axios from '@/lib/axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import BookForm from '@/components/books/Form'
import ListBook from '@/components/books/List'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import Swal from 'sweetalert2'

const BookPage = () => {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const bookSchema = Yup.object().shape({
        name: Yup.string()
            .min(4, 'Nama buku minimal 4 karakter!')
            .max(100, 'Nama buku maksimal 100 karakter!')
            .required('Nama buku tidak boleh kosong'),
        description: Yup.string()
            .min(10, 'Deskripsi minimal 10 karakter!')
            .max(150, 'Deskripsi minimal 150 karakter!')
            .required('Deskripsi tidak boleh kosong'),
        price: Yup.number().required('Harga tidak boleh kosong'),
    })

    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
            price: '',
        },
        validationSchema: bookSchema,
        onSubmit: async (values, { resetForm }) => {
            try {
                if (values.id) {
                    const { data } = await axios.put(
                        `http://localhost:8000/api/books/${values.id}`,
                        values,
                    )

                    handleUpdateBooks({ book: data.data })

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Keren Banget !',
                        html: 'Kamu Sudah <strong>Berhasil</strong> Mengupdate Data !',
                        showConfirmButton: false,
                        timer: 2000
                    })

                } else {
                    const { data } = await axios.post(
                        'http://localhost:8000/api/books',
                        values,
                    )

                    handleAddBook({
                        book: data.data,
                    })

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Keren Banget !',
                        html: 'Kamu Sudah <strong>Berhasil</strong> Menyimpan Data !',
                        showConfirmButton: false,
                        timer: 2000
                    })
                }

                resetForm()
            } catch (error) {
                console.log(error)
            }
        },
    })

    const fetchBooks = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('http://localhost:8000/api/books')

            setBooks(data.data)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchBooks()
    }, [])

    const getBook = async (id) => {
        try {
            const { data } = await axios.get(
                `http://localhost:8000/api/books/${id}`,
            )

            const book = data.data

            formik.setFieldValue('name', book.name)
            formik.setFieldValue('description', book.description)
            formik.setFieldValue('price', book.price)
            formik.setFieldValue('id', book.id)
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddBook = ({ book }) => {
        setBooks(prev => [...prev, book])
    }

    const handleUpdateBooks = ({ book }) => {
        const updatedBooks = books.map(item =>
            item.id === book.id ? book : item,
        )

        setBooks(updatedBooks)
    }

    const handleDeleteBook = async (id) => {
        Swal.fire({
            title: 'Anda Yakin ?',
            text: 'Data yang dihapus tidak bisa dikembalikan!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:8000/api/books/${id}`)

                    const filteredBooks = books.filter(item => item.id !== id)

                    setBooks(filteredBooks)
                } catch (error) {
                    console.log(error)
                }
                Swal.fire(
                    'Dihapus!',
                    'Data anda sudah dihapus.',
                    'success'
                )
            }
        })
    }

    if (error) return error

    return (
        <AppLayout
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Books
                </h2>
            }>
            <Head>
                <title>Laravel - Dashboard</title>
            </Head>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            <BookForm
                                handleAddBook={handleAddBook}
                                formik={formik}
                                className="mt-5"
                            />
                            <ListBook
                                books={books}
                                getBook={getBook}
                                handleDeleteBook={handleDeleteBook}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default BookPage
