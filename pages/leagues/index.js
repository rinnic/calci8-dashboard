import { useState, useEffect, useContext } from "react";
import React from "react";
import LeagueForm from "../../components/leagues/LeagueForm";
import LeagueList from "../../components/leagues/LeagueList";
import { createLeague, getLeagues } from "../../lib/api";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";

const Leagues = (props) => {
  const [leagues, setLeagues] = useState(null);
  const [error, setError] = useState(null);

  const authCtx = useContext(AuthContext);

  const [createLeagueRequest, createLeagueData] = useHttp(createLeague);
  const [getLeaguesRequest, leaguesData] = useHttp(getLeagues);

  const createLeagueHandler = async (leagueName, token) => {
    setError(null);
    await createLeagueRequest({ leagueName, token });
  };

  //manage the change of the new league reqest
  useEffect(() => {
    if (createLeagueData.error) {
      setError(createLeagueData.error.message);
    }
    if (!createLeagueData.pending && createLeagueData.data) {
      if (!createLeagueData.data.ok) setError("Name already taken");
    }
  }, [createLeagueData.error, createLeagueData.pending, createLeagueData.data]);

  useEffect(() => {
    if (!leaguesData.error && !leaguesData.loading) {
      setLeagues(leaguesData.data);
    }
  }, [leaguesData.error, leaguesData.pending, leaguesData.data]);

  //manage the loading of the leagues
  useEffect(() => {
    const fetchLeagues = async () => {
      await getLeaguesRequest({ token: authCtx.token });
      setLeagues(leaguesData.data);
    };
    fetchLeagues();
  }, []);

  return (
    <React.Fragment>
      <LeagueForm onCreate={createLeagueHandler} />
      <hr />
      <LeagueList error={leaguesData.error} leagues={leagues} />
      {error}
    </React.Fragment>
  );
};

export default Leagues;
