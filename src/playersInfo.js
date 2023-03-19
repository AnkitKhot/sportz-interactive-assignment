import React, { useState, useEffect } from "react";

function PlayerList() {
  const [players, setPlayers] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("https://api.npoint.io/20c1afef1661881ddc9c")
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data?.playerList);
      });
  }, []);

  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPlayersArr =
    players &&
    players.filter(
      (player) =>
        player.TName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.PFName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    console.log(filteredPlayersArr,"::aa")

  const sortedPlayers =
    filteredPlayersArr &&
    filteredPlayersArr.sort((a, b) =>
      sortOrder === "asc" ? a.Value - b.Value : b.Value - a.Value
    );

  return (
    <>
      <div>
        <h1>Search Your Favourite Player</h1>
        <input
          className="searchInput"
          type="text"
          placeholder="Search by name or team"
          value={searchTerm}
          onChange={handleSearchTermChange}
        />
        <div className="buttonWrapper">
          <button onClick={handleSortOrderChange}>
            {sortOrder === "asc" ? "Sort Descending" : "Sort Ascending"}
          </button>
        </div>
      </div>
      <div className="cardWrapper">
        {sortedPlayers &&
          sortedPlayers.length > 0 &&
          sortedPlayers.map((player) => (
            <div className="playerCard" key={player.Id} style={{ width: "300px", margin: "10px" }}>
              <img className="playerImg" src={`/images/${player.Id}.jpg`} alt={player.PFName} />
              <div>{`${player.PFName} (${player.SkillDesc})`}</div>
              <div>{`Value: $${player.Value}`}</div>
              <div>{`Upcoming match: ${player.UpComingMatchesList[0].CCode} vs. ${player.UpComingMatchesList[0].VsCCode}`}</div>
              <div>{`Next match time: ${new Date(
                player.UpComingMatchesList[0].MDate
              ).toLocaleString()}`}</div>
            </div>
          ))}
      </div>
    </>
  );
}

export default PlayerList;
