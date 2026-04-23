import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, fetchProducts } from '../feactures/productSlice';

export const ProductPage = () => {

    const dispatch = useDispatch();
    const { items, status } = useSelector((state) => state.products);

    const [form, setForm] = useState({ title: '', price: '' });
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {
        if (status === 'idle') dispatch(fetchProducts());
    }, [status, dispatch])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingId) {
            dispatch(updateProduct({ id: editingId, ...form }));
            setEditingId(null);
        } else {
            dispatch(addProduct({ id: Date.now(), ...form }));
        }

        setForm({ title: '', price: '' });
    };


    const handleEdit = (product) => {
        setForm({ title: product.title, price: product.price });
        setEditingId(product.id);
    };
    return (
        <div>
            <h1>Product Management</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                />

                <button type="submit">
                    {editingId ? "Update" : "Add"}
                </button>
            </form>
            <p>Total Records : {items.length}</p>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(product => (
                        <tr key={product.id}>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>
                                <button onClick={() => handleEdit(product)}>Edit</button>
                                <button onClick={() => dispatch(deleteProduct(product.id))}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

