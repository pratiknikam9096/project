import React from 'react';
import ColorBoxProduct from '../components/ColorBoxProduct';

export default function ProductPage() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {[...Array(6)].map((_, i) => (
        <ColorBoxProduct key={i} />
      ))}
    </div>
  );
}
