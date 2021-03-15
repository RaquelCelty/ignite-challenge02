import { useContext } from "react"
import { ContentContext } from "../contexts/ContentContext"

export function Header() {
  const { selectedGenre } = useContext(ContentContext);

  return (
    <header>
      <span className="category">Categoria:<span> {selectedGenre.title}</span></span>
    </header>
  );
}