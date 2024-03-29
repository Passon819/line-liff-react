import { useState } from "react";
import logo from "../assets/tecmove-logo.png";
import "./ConnectedPage.css";
import ConnectPage from "./ConnectPage";
import ItemConnected from "../components/ItemConnected";

function ConnectedPage(props) {
  // props data
  const { profileData, connectAccData } = props;
  // props function
  const { fetchData } = props;

  const [isNewConnect, setIsNewConnect] = useState(false);
  const handleClickNewConnect = () => {
    setIsNewConnect(true);
  };
  const setIsNewConnectFunc = () => {
    setIsNewConnect(false);
  };

  // set up for open close alert dialog
  const [open, setOpen] = useState(false);
  const disconnectClick = () => {
    setOpen(true);
  };
  const disconnectClose = () => {
    setOpen(false);
  };

  return (
    <>
      {isNewConnect ? (
        <ConnectPage
          profileData={profileData}
          connectAccData={connectAccData}
          fetchData={fetchData}
          setIsNewConnectFunc={setIsNewConnectFunc}
        />
      ) : (
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
          <button className="btn newconn" onClick={handleClickNewConnect}>
            NEW Connect
          </button>

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
      )}
    </>
  );
}

export default ConnectedPage;
