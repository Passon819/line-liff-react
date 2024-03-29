import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/tecmove-logo.png";
import "./ConnectedPage.css";
import ItemConnected from "../components/ItemConnected";

const linkStyle = {
  fontSize: "3vw",
  textDecoration: "none",
  color: "#4682b4",
};

function ConnectedPage(props) {
  // props data
  const { profileData, connectAccData } = props;
  // props function
  const { fetchData } = props;

  // set up for open close alert dialog
  const [open, setOpen] = useState(false);
  const disconnectClick = () => {
    setOpen(true);
  };
  const disconnectClose = () => {
    setOpen(false);
  };

  return (
    <div className="connected-page">
      <div className="logo-container">
        <img className="logo-org" alt="tecmove" src={logo} />
      </div>
      <div className="connected-user-container">
        <img
          className="connected-picture-user"
          alt="pic"
          src={profileData.pictureUrl}
        />
        <p>{profileData.displayName}</p>
      </div>
      <Link to="/connect" style={linkStyle}>
        NEW CONNECT
      </Link>

      {connectAccData ? (
        <ul className="item-connected">
          {connectAccData.map((element) => {
            return (
              <ItemConnected
                key={element.id}
                profileData={profileData}
                {...element}
                open={open}
                fetchData={fetchData}
                setOpen={setOpen}
                disconnectClick={disconnectClick}
                disconnectClose={disconnectClose}
              />
            );
          })}
        </ul>
      ) : (
        <center>
          <p> Loading...</p>
        </center>
      )}
      <hr className="connected-endline"></hr>
      <p className="connected-endtext">
        Your connect LINE Official Accounts with Tecmove.
      </p>
    </div>
  );
}

export default ConnectedPage;
