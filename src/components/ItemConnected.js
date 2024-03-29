import { API_URL } from "../utils/BaseUrl";
import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import ResponsiveDialog from "../components/ResponsiveDialog";
import toast from "react-hot-toast";

// define use toast
const errorToast = (message) => toast.error(message, { duration: 10000 });

const ItemConnected = (props) => {
  // props data
  const { profileData, AccountList, basic_id, open } = props;
  // props function
  const { fetchData, setOpen, disconnectClick, disconnectClose } = props;

  // Call API when Confirm disconnect
  const disconnectAccount = () => {
    fetch(`${API_URL}/line`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: profileData.userId,
        basic_id,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log("delete response:", data);
        if (data.status === 200) {
          toast.success("Success");
          // new fetch ConnectAccData in App
          fetchData();
          // close alert dialog
          setOpen(false);
        } else {
          toast(data.message, {
            icon: "⚠️",
            duration: 10000,
            style: {
              borderRadius: "12px",
              background: "#333",
              color: "#ffd700",
            },
          });
        }
      })
      .catch((error) => {
        console.error("Error to get connect disconnectAccount:", error);
        errorToast(error.message);
      });
  };

  return (
    <li>
      {AccountList.display_name}
      <span>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
          }}
        >
          <Button
            variant="outlined"
            onClick={() => {
              disconnectClick();
            }}
            sx={{
              borderColor: "#8b0000",
              color: "#8b0000",
              "&:hover": { borderColor: "#8b0000", color: "#8b0000" },
              width: "100%",
              fontSize: "3vw",
            }}
          >
            Disconnect
          </Button>
          <ResponsiveDialog
            open={open}
            disconnectClose={disconnectClose}
            disconnectConfirm={disconnectAccount}
          />
        </Box>
      </span>
    </li>
  );
};

export default ItemConnected;
