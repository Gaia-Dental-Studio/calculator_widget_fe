
"use client";
import {useState} from 'react';

export default function Home() {
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [pdf, setPdf] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name_product', name);
        formData.append('image', image);
        formData.append('description', description);
        formData.append('category', category);
        formData.append('pdf', pdf);

        const response = await fetch('http://localhost:8080/api/v0.0.1/create-product', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const result = await response.text();
            alert(result); // Show success message
        } else {
            alert('Error uploading image');
        }
    };

    return (
        <div>
            <h1>Upload Image</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    accept="image/*"
                    required
                />
                <input
                    type="file"
                    onChange={(e) => setPdf(e.target.files[0])}
                    required
                />
                <input
                    type="text"
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    placeholder='category'
                    value={category}
                />
                <input
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    placeholder='desc'
                    value={description}
                />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}
