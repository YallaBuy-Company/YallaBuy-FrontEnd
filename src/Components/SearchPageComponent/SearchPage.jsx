import React, { useState, useEffect } from "react";
import { Itemscontainer } from "../Itemscontainer";
import { Cardgrid } from "../Cardgrid";
import { Link, useLocation } from "react-router-dom";
import { getGames } from "../../apis/rapidApi"; // Assuming rapidApi.js is in a sibling folder


export const SearchPage = () => {
  const location = useLocation();
  const [games, setGames] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resmes, setMessage] = useState("");

  const getQueryParams = () => {
    const searchParams = new URLSearchParams(location.search);
    return {
      dateFrom: searchParams.get("dateFrom"),
      country: searchParams.get("country"),
      city: searchParams.get("city"),
      team: searchParams.get("team"),
      league: searchParams.get("league"),
      dateTo: searchParams.get("dateTo"),
    };
  };

  useEffect(() => {
    const { dateFrom, country, city, team, league, dateTo } = getQueryParams();

    const fetchData = async () => {
      setIsLoading(true);
      setErrorMessage(""); // Clear any previous errors


      try {
        const { allGames, resMes } = await getGames(country, city, team, league, dateFrom, dateTo);
        setMessage(resMes)
        setGames(allGames);

        if (resMes) {
          console.log(resMes); // Log success message for debugging purposes
        }
      } catch (error) {
        console.error("Error fetching games:", error);
        setErrorMessage("Failed to fetch games. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

  // Call fetchData only when necessary (on mount or param changes)
  if (dateFrom) { // Ensure dateFrom is present before fetching
      fetchData();
    }
  }, [location.search]);

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
        <div className="no-results">No games found for your search criteria.</div>
      )}
    </>
  );
};
