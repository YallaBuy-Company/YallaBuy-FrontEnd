import React, { useState, useEffect } from "react";
import { Itemscontainer } from '../Itemscontainer';
import { Cardgrid } from '../Cardgrid';
import { getGames } from "../../apis/rapidApi"; // Ensure this import path is correct

export const HomePage = () => {
  const [games, setGames] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resmes, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage(""); // Clear any previous errors

      try {
        const today = new Date();
        const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`; // Format date as DD/MM/YYYY
        const { allGames, resMes } = await getGames(null, null, null, null, formattedDate);
        setMessage(resMes);
        setGames(allGames);

      } catch (error) {
        console.error("Error fetching games:", error);
        setErrorMessage("Failed to fetch games. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Fetch data on component mount
  }, []);

  const handleError = () => {
    // Handle error cases (e.g., display an error message)
    if (errorMessage) {
      return <div className="error-message">{errorMessage}</div>;
    }
  };

  const handleLoading = () => {
    // Handle loading state (e.g., display a loading indicator)
    if (isLoading) {
      return <div className="loading">Loading games...</div>;
    }
  };

  return (
    <>
      {handleError()}
      {handleLoading()}
      {games.length > 0 && (
        <>
          <Itemscontainer rows={games} resmes={resmes} />
          <Cardgrid />
        </>
      )}
      {games.length === 0 && !isLoading && !errorMessage && (
        <div className="no-results">No games found for today.</div>
      )}
    </>
  );
};
