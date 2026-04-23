import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, fetchProducts } from '../feactures/productSlice';

export const ProductPage = () => {

    const dispatch = useDispatch();
    const { items, status } = useSelector((state) => state.products);

    useEffect(() => {
        if (status === 'idle') dispatch(fetchProducts());
    }, [status, dispatch])
    return (
        <div>
            <h1>Product Management</h1>
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
                                <button onClick={() => dispatch(deleteProduct(product.id))}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

