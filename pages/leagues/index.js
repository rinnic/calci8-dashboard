import { useState, useEffect } from "react";
import React from "react";
import AuthContext from "../../store/auth-context";
import LeagueForm from "../../components/leagues/LeagueForm";
import { createLeague } from "../../lib/api";
import useHttp from "../../hooks/use-http";

const Leagues = (props) => {
  const [leagues, setLeagues] = useState(props.leagues);
  const [createLeagueRequest, createLeagueData] = useHttp(createLeague);
  const [error, setError] = useState(null);

  const createLeagueHandler = async (leagueName, token) => {
    setError(null);
    await createLeagueRequest({ leagueName, token });
  };

  useEffect(() => {
    if (createLeagueData.error) {
      setError(createLeagueData.error.message);
    }
    if (!createLeagueData.pending && createLeagueData.data) {
      if (!createLeagueData.data.ok) setError("Name already taken");
    }
  }, [createLeagueData.error, createLeagueData.pending, createLeagueData.data]);

  return (
    <React.Fragment>
      <LeagueForm onCreate={createLeagueHandler} />
      {error}
    </React.Fragment>
  );
};

export default Leagues;
