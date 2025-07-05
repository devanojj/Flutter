export default function KeywordButtons({ related, onClick }) {
  return (
    <div>
      {related.map(term => (
        <button
          key={term}
          onClick={() => onClick(term)}
          style={{ margin: '0.25rem', padding: '0.5rem 0.75rem' }}
        >
          {term}
        </button>
      ))}
    </div>
  );
}