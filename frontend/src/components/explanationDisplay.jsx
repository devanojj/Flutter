export default function ExplanationDisplay({ explanation }) {
  return (
    <div style={{ marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>
      {explanation || 'Your explanation will appear here.'}
    </div>
  );
}