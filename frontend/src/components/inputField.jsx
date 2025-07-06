import { useState } from 'react';

export default function InputField({ onSubmit, disabled }) {
  const [value, setValue] = useState('');

  const handle = e => {
    e.preventDefault();
    
    if (value.trim()) {
      onSubmit(value.trim());
      setValue('');      
    }

  };

  return (
    <form onSubmit={handle} style={{ marginBottom: '1rem' }}>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Enter a term…"
        disabled={disabled}
        style={{ padding: '0.5rem', width: '70%' }}
      />
      <button type="submit" disabled={disabled || !value.trim()} style={{ marginLeft: '0.5rem' }}>
        Go
      </button>
    </form>
  );
}