import { useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import useFetchGames from "./helpers/useFetchGames";
import Game from "./components/Game";
import SearchForm from "./components/SearchForm";
import Pagination from "./components/Pagination";

function App() {
  const [params, setParams] = useState({});
  const [page, setPage] = useState(0);
  const { games, loading, error, hasNextPage } = useFetchGames(params, page);

  const handleParamChange = (e) => {
    const param = e.target.name;
    const value = e.target.value;
    setPage(0);
    setParams((prevParams) => {
      return { ...prevParams, [param]: value };
    });
  };

  const handleError = (error) => {
    if (error.message.includes("429")) {
      return "Sorry, too many requests, try again later";
    } else {
      return "Error, try again later";
    }
  };

  return (
    <Container>
      <h1>Seach Steam Sales</h1>
      <h5>
        Powered by <a href="https://apidocs.cheapshark.com/">CheapShark API</a>
      </h5>
      <SearchForm params={params} onParamChange={handleParamChange} />
      <Pagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && <Spinner animation="border" variant="primary" />}
      {error && <h1>{handleError(error)}</h1>}
      {games.map((game) => {
        return <Game key={game.steamAppID} game={game} />;
      })}
      <Pagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
}

export default App;
