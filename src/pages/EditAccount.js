import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../libries";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserDetails } from "../store/slices/authSlice";
import Alert from "../components/Alert";

import DashboardHeader from "../components/DashboardHeader";

const EditAccount = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.auth.userDetails);

  console.log(userDetails);

  const token = useSelector((state) => state.auth.accessToken);
  const [editAcc, setEditAcc] = useState({
    first_name: userDetails.first_name,
    last_name: userDetails.last_name,
    middle_name: userDetails.middle_name,
    date_of_birth: userDetails.date_of_birth,
    gender: userDetails.gender,
    phone_number: userDetails.phone_number,
    address: userDetails.address,
  });

  const [updatedUserDetails, setUpdatedUserDetails] = useState(null);

  // showing alert states
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  // state for get fetch gender from the backend
  const [getGender, setGetGender] = useState({});

  useEffect(() => {
    axios({
      url: `${baseUrl}/list-genders`,
      method: "GET",
    })
      .then((resp) => {
        // console.log(resp);
        setGetGender(resp.data.data.genders);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const arrayOfGender = Object.keys(getGender);

  const handleChangeAccEdit = (e) => {
    const { name, value } = e.target;

    setEditAcc({
      ...editAcc,
      [name]: value,
    });
  };

  const handleEditAccount = () => {
    axios({
      url: `${baseUrl}/accounts/update`,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: JSON.stringify(editAcc),
    })
      .then((resp) => {
        // console.log(resp);
        setAlertStatus("success");
        setAlertMsg(resp.data.data.message);
        setShowAlert(true);
        const update = resp.data.data.account;
        setUpdatedUserDetails(update);
        dispatch(
          updateUserDetails({
            ...userDetails,
            first_name: update.first_name,
            last_name: update.last_name,
            middle_name: update.middle_name,
            gender: update.gender,
            phone_number: update.phone_number,
            address: update.address,
            date_of_birth: update.date_of_birth,
          })
        );
        navigate("/dashboard/my-account");
      })
      .catch((err) => {
        console.log(err);

        setAlertStatus("error");
        setAlertMsg(err.response.data.message);
        setShowAlert(true);
      });
  };

  return (
    <>
      <div className="edit__account">
        <DashboardHeader title="Edit Account" isIcon="true" />
        <div className="verify">
          <p className="verify__icon">
            <ion-icon name="alert-circle"></ion-icon>
          </p>
          <p className="verify__text">
            Account not verified! Kindly complete your KYC to verify your
            account
          </p>
        </div>

        <div className="edit__page">
          <form action="submit">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              id="first-name"
              placeholder="Adetayo"
              name="first_name"
              value={editAcc.first_name}
              onChange={handleChangeAccEdit}
            />
            <label htmlFor="last-name">Last Name</label>
            <input
              type="text"
              id="last-name"
              placeholder="Akins"
              name="last_name"
              value={editAcc.last_name}
              onChange={handleChangeAccEdit}
            />
            <label htmlFor="middle-name">Middle Name</label>
            <input
              type="text"
              id="middle-name"
              placeholder="Jones"
              name="middle_name"
              value={editAcc.middle_name}
              onChange={handleChangeAccEdit}
            />
            <label htmlFor="dob">Date of Birth</label>
            <input
              type="date"
              id="dob"
              placeholder="07 July 1995"
              name="date_of_birth"
              value={editAcc.date_of_birth}
              onChange={handleChangeAccEdit}
            />
            <label htmlFor="gender">Gender</label>
            <div className="">
              <select
                name="gender"
                id="gender"
                className="select"
                value={editAcc.gender}
                onChange={handleChangeAccEdit}
              >
                <option value="">select</option>
                {arrayOfGender.map((gender) => (
                  <option value={getGender[gender]} key={gender}>
                    {getGender[gender]}
                  </option>
                ))}
              </select>
            </div>

            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              placeholder="+23480******78"
              name="phone_number"
              value={editAcc.phone_number}
              onChange={handleChangeAccEdit}
            />
            <label htmlFor="adddress">Address</label>
            <input
              type="text"
              id="address"
              placeholder="3, jericho estate, Ibadan"
              name="address"
              value={editAcc.address}
              onChange={handleChangeAccEdit}
            />
          </form>
          <div className="save__butn">
            <button type="submit" className="savee" onClick={handleEditAccount}>
              save
            </button>
          </div>
        </div>
      </div>
      {showAlert && (
        <Alert
          alertMsg={alertMsg}
          alertStatus={alertStatus}
          setShowAlert={setShowAlert}
        />
      )}
    </>
  );
};

export default EditAccount;
