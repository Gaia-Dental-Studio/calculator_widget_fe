
"use client";
import {useState} from 'react';
import {TextField, Button, Box, Grid, Card, CardContent, Typography} from '@mui/material';


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
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            sx={{p: 4}}
        >
            <Card sx={{maxWidth: 600, width: '100%'}}>
                <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                        Upload Product
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Product Name"
                                    variant="outlined"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    component="label"
                                    fullWidth
                                >
                                    Upload Image
                                    <input
                                        type="file"
                                        hidden
                                        onChange={(e) => setImage(e.target.files[0])}
                                        accept="image/*"
                                        required
                                    />
                                </Button>
                                {/* Display the name of the uploaded image */}
                                {image && (
                                    <Typography variant="body2" color="textSecondary" sx={{marginTop: 1}}>
                                        {image.name}
                                    </Typography>
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    component="label"
                                    fullWidth
                                >
                                    Upload PDF
                                    <input
                                        type="file"
                                        hidden
                                        onChange={(e) => setPdf(e.target.files[0])}
                                        required
                                    />
                                </Button>
                                {/* Display the name of the uploaded pdf */}
                                {pdf && (
                                    <Typography variant="body2" color="textSecondary" sx={{marginTop: 1}}>
                                        {pdf.name}
                                    </Typography>
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Category"
                                    variant="outlined"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Description"
                                    variant="outlined"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                >
                                    Upload
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
}
