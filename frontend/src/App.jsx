import { useState } from 'react';
import { fetchExplanation } from './services/aiService.js';
import InputField from './components/InputField.jsx';
import ExplanationDisplay from './components/ExplanationDisplay.jsx';
import KeywordButtons from './components/KeywordButtons.jsx';

export default function App() {

  

  const [term, setTerm] = useState('');
  const [explanation, setExplanation] = useState('');
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async newTerm => {
    setLoading(true);
    setError('');
    try {
      const { explanation, related } = await fetchExplanation(newTerm);
      setTerm(newTerm);
      setExplanation(explanation);
      setRelated(related);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>AI Concept Explorer</h1>
      <InputField onSubmit={handleSubmit} disabled={loading} />
      {loading && <div>Loading…</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {!loading && !error && <ExplanationDisplay explanation={explanation} />}
      {!loading && !error && related.length > 0 && (
        <KeywordButtons related={related} onClick={handleSubmit} />
      )}
    </div>
    
  );
}