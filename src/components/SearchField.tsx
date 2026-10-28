export function SearchField({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  return <div className="search">
    <span aria-hidden="true">⌕</span>
    <input type="search" aria-label="Search items" placeholder="Найти что-нибудь для стола…" value={value}
      onChange={(event) => onChange(event.target.value)} />
    {value && <button type="button" aria-label="Clear search" onClick={() => onChange('')}>×</button>}
  </div>;
}
