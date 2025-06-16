import { useCart } from '../components/CartContext';
import { Typography, Divider, Box } from '@mui/material';

export default function CartPage() {
  const { cartItems } = useCart();
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4, p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>🧾 Paint Purchase Receipt</Typography>
      <Divider sx={{ mb: 2 }} />

      {cartItems.map((item, i) => (
        <Box key={i} sx={{ mb: 2 }}>
          <Typography>{item.name} - {item.quantity} Liter(s)</Typography>
          <Typography>₹{item.price}</Typography>
          <Divider sx={{ mt: 1 }} />
        </Box>
      ))}

      <Typography variant="h6" sx={{ mt: 3 }}>
        Total: ₹{total}
      </Typography>
    </Box>
  );
}
