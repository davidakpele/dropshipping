import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { baseUrl } from "../libries";
import axios from "axios";
import { updateUserDetails } from "../store/slices/authSlice";

export const useData = () => {

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
              console.log(resp);
              dispatch(updateUserDetails(resp.data.data));
              resolve("Profile fetched successfully");
            })
            .catch((err) => {
              resolve("An error occured");
            });
        });
      }, [token]);

      return [fetchProfile];
  
}