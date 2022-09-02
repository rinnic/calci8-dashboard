import LeagueItem from "./LeagueItem";

const LeagueList = (props) => {
  const content = "Loading";
  if (props.error) {
    content = "Faild fetching the leagues " + props.error;
  }
  if (props.leagues) {
    //console.log(props.leagues);
    content = props.leagues.data.map((e) => {
      return <LeagueItem league={e} key={e.id}/>;
    });
  }

  return <div>{content}</div>;
};

export default LeagueList;
