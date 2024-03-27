function ConnectedPage(props) {
  const { profileData, connectAccData } = props;

  return (
    <div>
      connectAccData In ConnectedPage:
      {connectAccData ? (
        connectAccData.map((element) => (
          <div>
            <p>displayName: {element.displayName}</p>
            <p>basic_id: {element.basic_id}</p>
          </div>
        ))
      ) : (
        <center>
          <p> Loading...</p>
        </center>
      )}
      <br />
      profileData: {profileData.displayName}
      {/* <ConnectPage profileData={profileData} /> */}
    </div>
  );
}

export default ConnectedPage;
