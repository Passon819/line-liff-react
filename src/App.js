import { useEffect, useState } from "react";
import { API_URL } from "./utils/BaseUrl";
import toast, { Toaster } from "react-hot-toast";

import ConnectPage from "./pages/ConnectPage";
import ConnectedPage from "./pages/ConnectedPage";

const liff = window.liff;
const liffid = "2001682725-4xEPQ6rl";

// define use toast
const errorToast = (message) => toast.error(message, { duration: 10000 });

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    userId: "",
    displayName: "",
    pictureUrl: "",
    statusMessage: "",
    language: "",
    basic_id: "",
  });
  const [connectAccData, setConnectAccData] = useState(null);

  const liffInitData = async () => {
    try {
      await liff.init({ liffId: `${liffid}` });
      if (liff.isLoggedIn()) {
        let getProfile = await liff.getProfile();
        let getLanguage = await liff.getLanguage();
        setProfileData({
          ...profileData,
          userId: getProfile.userId,
          displayName: getProfile.displayName,
          pictureUrl: getProfile.pictureUrl,
          statusMessage: getProfile.statusMessage,
          language: getLanguage,
        });
      } else {
        liff.login();
      }
    } catch (err) {
      console.error("liffInitData Error:", err);
      errorToast(err.message);
    }
  };

  //${profileData.userId}  //U30fwhfoesdpbjkophfoewfno
  const fetchData = () => {
    console.log("profileData in fetchData:", profileData);
    fetch(`${API_URL}/line/${profileData.userId}`, {
      method: "GET",
      headers: {
        "ngrok-skip-browser-warning": "69420",
      },
    })
      .then((response) => {
        // const contentType = response.headers.get("content-type");
        // console.log("contentType:", contentType);
        // console.log("response status:", response.status);
        return response.json();
      })
      .then((_data) => {
        console.log("response status:", _data.status);
        console.log("Get connect accounts:", _data);
        const { data } = _data;
        setConnectAccData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error to get connect accounts:", error);
        errorToast(error.message);
      });
  };

  useEffect(() => {
    liffInitData();
  }, []);

  useEffect(() => {
    if (profileData.userId !== "" && connectAccData == null) {
      console.log("fetchData call");
      fetchData();
    }
  }, [profileData.userId]);

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : connectAccData ? (
        <ConnectedPage
          profileData={profileData}
          connectAccData={connectAccData}
          fetchData={fetchData}
        />
      ) : (
        <ConnectPage profileData={profileData} />
      )}
      <Toaster />
    </div>
  );
}

export default App;
