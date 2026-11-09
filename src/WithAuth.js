import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "./libries";
import { updateUserDetails } from "./store/slices/authSlice";

const WithAuth = (Component) =>
  function Comp(props) {
    const dispatch = useDispatch();
    // getting the user token from global state to check if user is logged in or has signed up
    const token = useSelector((state) => state.auth.accessToken);

    // function to fetch user account profile
    const fetchProfile = useCallback(() => {
      return new Promise((resolve, reject) => {
        axios({
          url: `${baseUrl}/accounts`,
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((resp) => {
            const userProfile = resp.data.data.user;
            userProfile.verification = resp.data.data.verification;
            userProfile.wallet = resp.data.data.wallet;
            userProfile.order_count = resp.data.data.order_count;
            userProfile.bank = resp.data.data.bank;
            dispatch(updateUserDetails(userProfile));
            resolve("Profile fetched successfully");
          })
          .catch((err) => {
            resolve("An error occured");
          });
      });
    }, [token, dispatch]);

    // state to store user refectched status
    const [refetchUserProfile, setRefetchUserProfile] = useState(false);

    // resting time before refetching user profile
    const waitTime = (milliseconds) => {
      return new Promise((resolve, reject) => {
        const interval = window.setInterval(() => {
          resolve("wait time completed");
          window.clearInterval(interval);
        }, milliseconds);
      });
    };

    // reloading user profile
    useEffect(() => {
      if (!token) return;

      fetchProfile()
        .finally()
        .then(() => {
          waitTime(5000).then(() => {
            setRefetchUserProfile((refetch) => !refetch);
          });
        });
    }, [token, refetchUserProfile, fetchProfile]);

    return <Component {...props} />;
  };

export default WithAuth;
