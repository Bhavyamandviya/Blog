import { VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSignupData, setToken } from "../Redux/Slice/authSlice";
import toast from "react-hot-toast";
import { Dropdown, Image } from "react-bootstrap";
import { setUser } from "../Redux/Slice/userSlice";

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.UserDetails);
  console.log(user);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(setToken(null));
    dispatch(setSignupData(null));
    dispatch(setUser(null));
    localStorage.removeItem("token");
    toast.success("Logged Out");
    navigate("/");
  };
  return (
    <>
      <Dropdown style={{ background: "#161D29" }}>
        <Dropdown.Toggle style={{ background: "#161D29" }} id="dropdown-basic">
          <Image
            src={
              user?.image
                ? user?.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${user.name}`
            }
            style={{ width: "30px" }}
            rounded
          />
        </Dropdown.Toggle>

        <Dropdown.Menu style={{ background: "", width: "30px" }}>
          <Dropdown.Item>
            <div onClick={handleLogout}>
              <VscSignOut />
              Logout
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
export default ProfileDropdown;
