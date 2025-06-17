import { useState } from 'react';
import { Card, CardContent, CardMedia, Typography, MenuItem, Select, Button, Box } from '@mui/material';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';

const colorOptions = [
  { name: 'White', image: 'https://www.color-name.com/images/white-color.jpg' },
  { name: 'Green', image: 'https://www.color-name.com/images/green-color.jpg' },
  { name: 'Red', image: 'https://www.color-name.com/images/red-color.jpg' },
  { name: 'Blue', image: 'https://www.color-name.com/images/blue-color.jpg' },
];

const quantityOptions = [
  { label: '1 Liter', value: 1 },
  { label: '5 Liter', value: 5 },
  { label: '10 Liter', value: 10 },
];

const basePricePerLiter = 105;

export default function ColorBoxProduct() {
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [selectedQuantity, setSelectedQuantity] = useState(quantityOptions[0]);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  const price = selectedQuantity.value * basePricePerLiter;

  function handleAdd() {
    addToCart({
      name: selectedColor.name,
      quantity: selectedQuantity.value,
      price: price,
    });
    setAdded(true);
  }

  return (
    <Card sx={{ maxWidth: 300, m: 2 }}>
      <CardMedia
        component="img"
        height="180"
        image={selectedColor.image}
        alt={selectedColor.name}
      />
      <CardContent>
        <Typography variant="h6">{selectedColor.name} Paint</Typography>

        <Box sx={{ my: 1 }}>
          <Typography variant="body2">Select Color</Typography>
          <Select
            fullWidth
            value={selectedColor.name}
            onChange={(e) =>
              setSelectedColor(
                colorOptions.find((c) => c.name === e.target.value)
              )
            }
          >
            {colorOptions.map((color) => (
              <MenuItem key={color.name} value={color.name}>
                {color.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={{ my: 1 }}>
          <Typography variant="body2">Select Quantity</Typography>
          <Select
            fullWidth
            value={selectedQuantity.value}
            onChange={(e) =>
              setSelectedQuantity(
                quantityOptions.find((q) => q.value === e.target.value)
              )
            }
          >
            {quantityOptions.map((q) => (
              <MenuItem key={q.value} value={q.value}>
                {q.label}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Typography variant="h6" color="primary">
          ₹{price}
        </Typography>

        {added ? (
          <Link to="/cart">
            <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
              View Cart
            </Button>
          </Link>
        ) : (
          <Button variant="contained" fullWidth sx={{ mt: 2 }} onClick={handleAdd}>
            Add to Cart
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
