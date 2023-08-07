"use client"
import Header from '@/components/Header';
import { useState, useEffect } from 'react';

export default function Home() {
  const [productForm, setProductForm] = useState({});
  const [products, setProducts] = useState([]);
  const [alert, setAlert] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [dropdown, setDropdown] = useState([{
    "_id": "64cf878c9a689c8b14e637cf",
    "slug": "jeans",
    "quantity": "23",
    "price": "999"
  }
  ]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/product')
      let rjson = await response.json()
      setProducts(rjson.products)
    }
    fetchProducts()
  }, [])

  const handleChange = (e) => {
    setProductForm({ ...productForm, [e.target.name]: e.target.value })
  }

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(productForm)
      });

      if (response.ok) {
        setAlert("Your Product has been added!")
        console.log("Product added")
        setProductForm({})
      } else {
        console.error('Error adding product');
      }
    } catch (error) {
      console.error('Error:', error);
    }

  };

  const onDropdownEdit = async (e) => {
    setQuery(e.target.value)
    if (!loading) {
      setLoading(true)
      const response = await fetch('/api/search?query=' + e.target.value)
      let rjson = await response.json()
      setDropdown(rjson.products)
      setLoading(false)
    }

  }
  return (
    <><Header />
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="px-4 py-2 border rounded-l focus:outline-none"
          style={{ width: '100%' }}
          onChange={onDropdownEdit}
          onBlur={()=>{setDropdown([])}}
        />
      </div>
      {loading && <div className="container flex justify-center"><svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 100 100"
  preserveAspectRatio="xMidYMid"
  width="50"
  height="50"
  fill="black"
>
  <circle
    cx="50"
    cy="50"
    r="40"
    strokeWidth="10"
    stroke="#000"
    strokeDasharray="188.49555921538757 64.83185307179586"
    transform="rotate(36 50 50)"
  >
    <animateTransform
      attributeName="transform"
      type="rotate"
      repeatCount="indefinite"
      dur="1s"
      keyTimes="0;1"
      values="0 50 50;360 50 50"
    ></animateTransform>
  </circle>
</svg></div>
}
<div className="dropcontainer absolute rounded-md border-1 bg-purple-100">{dropdown.map(item => {
        return <div key={item.slug} className="container flex justify-between my-1 p-2 border-b-2">
          <span className='slug'>{item.slug} ({item.quantity} available for {item.price})</span>
          <div className="mx-5">
          <button disabled={loading} className='inline-block px-3 py-1 cursor-pointer bg-purple-500 font-semibold rounded-lg shadow-md disabled:bg-purple-200'>-</button>
          <span className='quantity inline-block mx-3 min-w-3'>{item.quantity}</span>
          <button disabled={loading} className='inline-block px-3 py-1 cursor-pointer bg-purple-500 font-semibold rounded-lg shadow-md disabled:bg-purple-200'>+</button>
          </div>
        </div>
      })}</div>
      
      <div className="text-green-800 text-center">{alert}</div>
      <div className="container mx-auto p-4">
        <h1 style={{ marginBottom: '1rem' }}>Add a product</h1>
        <form style={{ marginBottom: '1rem' }} onSubmit={addProduct}>
          <div style={{ display: 'flex', marginBottom: '0.5rem' }}>
            <input
              type="text"
              name="slug"
              placeholder="Product Slug"
              value={productForm?.slug || ""}
              style={{ flex: 1, marginRight: '0.5rem', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
              required onChange={handleChange}
            />
            <input
              type="number"
              name="quantity"
              placeholder="Quantity"
              value={productForm?.quantity || ""}
              style={{ width: '6rem', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
              required onChange={handleChange}
            />
            <input
              type="text"
              name="price"
              placeholder="Price"
              value={productForm?.price || ""}
              style={{ width: '6rem', marginLeft: '0.5rem', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
              required onChange={handleChange}
            />
            <button type="submit" style={{ padding: '0.5rem 1rem', backgroundColor: 'blue', color: 'white', borderRadius: '4px', border: 'none' }}>
              Add Product
            </button>
          </div>
        </form>
        <h1 style={{ marginBottom: '1rem' }}>Current stock</h1>
        <div style={{ marginBottom: '0.5rem' }}>
        </div>


        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Product Name</th>
              <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Quantity</th>
              <th style={{ padding: '0.5rem', border: '1px solid #ccc' }}>Price</th>
              {/* Add more columns as needed */}
            </tr>
          </thead>
          <tbody>
            {products.map((item) => {
              return <tr key={item.slug}>
                <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{item.slug}</td>
                <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{item.quantity}</td>
                <td style={{ padding: '0.5rem', border: '1px solid #ccc' }}>{item.price}</td>
              </tr>
            })}
          </tbody>
        </table>
      </div></>

  )
}
