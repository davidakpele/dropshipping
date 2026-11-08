import axios from "axios";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { baseUrl, currency_formatter, formatTransations } from "../libries";
import Alert from "../components/Alert";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";

// components import
import DashboardHeader from "../components/DashboardHeader";
import Pagination from "../components/Pagination";
import Empty from "../components/Empty";
import UserVerify from "../components/UserVerify";

// images import
import bank from "../assets/imgs/bank-outline.svg";

const MyWallet = () => {
  const token = useSelector((state) => state.auth.accessToken);
  const userBankDetails = useSelector((state) => state.auth.userDetails.bank);
  const verified = useSelector((state) => state.auth.userDetails.verification);
  const walletAmount = useSelector((state) => state.auth.userDetails.wallet);

  // showing alert states
  const [showAlert, setShowAlert] = useState(false);
  const [alertStatus, setAlertStatus] = useState("");
  const [alertMsg, setAlertMsg] = useState("");

  // state to hold number of items per page
  const [perPage, setPerPage] = useState(null);

  // state for pagination links
  const [links, setLinks] = useState(null);

  const [lastPage, setLastPage] = useState(null);

  // state to catch network error
  const [networkError, setNetworkError] = useState(false);

  // state to track loading state
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("all");
  const [customSort, setCustomSort] = useState({
    start: "",
    end: "",
  });

  const [transacType, setTransacType] = useState("all");
  const [url, setUrl] = useState(
    `${baseUrl}/wallet-order/transactions/${sort}/${transacType}`
  );

  const handleChangeSort = (e) => {
    const changedSort = e.target.value;
    if (changedSort !== "custom")
      setCustomSort({
        start: "",
        end: "",
      });
    setSort(changedSort);
  };

  const handleChangeCustomSort = (e) => {
    const { name, value } = e.target;
    setCustomSort({
      ...customSort,
      [name]: value,
    });
  };

  const isCustomEmpty = Object.values(customSort).every((val) => val !== "");
  const handleChangeTransacTypeSort = (e) => {
    const changedTransacType = e.target.value;
    setTransacType(changedTransacType);
  };

  const [transacHistory, setTransacHistory] = useState(null);
  useEffect(() => {
    if (sort === "custom") {
      if (isCustomEmpty)
        setUrl(
          `${baseUrl}/wallet-order/transactions/${sort}/${transacType}?start=${customSort.start}&end=${customSort.end}`
        );
    } else
      setUrl(`${baseUrl}/wallet-order/transactions/${sort}/${transacType}`);
  }, [sort, isCustomEmpty, transacType, customSort]);

  let duration;
  if (sort === "custom")
    duration = {
      start: `${customSort.start}`,
      end: `${customSort.end}`,
    };
  else duration = `${sort}`;

  // fetching transaction history
  useEffect(() => {
    setLoading(true);
    axios({
      url,
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((resp) => {
        setLoading(false);
        setNetworkError(false);
        const transHistory = resp.data.data.transactions.data;
        const transHistoryLinks = resp.data.data.transactions.links;
        setPerPage(resp.data.data.transactions.per_page);
        setLastPage(resp.data.data.transactions.last_page);
        setTransacHistory(transHistory);
        setLinks(transHistoryLinks);
      })
      .catch((err) => {
        setLoading(false);
        if (err.code === "ERR_BAD_REQUEST") {
          setAlertMsg(err.response.data.message);
        } else {
          setNetworkError(true);
          setAlertMsg(err.message);
        }
      });
  }, [url, token]);

  // 👇 Using our custom hook
  const [copyToClipboard, copyResult] = useCopyToClipboard();
  const handleClickCopy = (accNum) => {
    copyToClipboard(accNum);

    if (copyResult?.status === "success") {
      setAlertStatus("success");
      setAlertMsg("Copied Successfully!");
      setShowAlert(true);
    }
  };

  return (
    <>
      <div className="verify__showing__mobile">
        <div className="show__on__mobile">
          <UserVerify />
        </div>
        <div className="my__wallet">
          <DashboardHeader title="My Wallet" isIcon="false" />
          <div className="my__wallet__content">
            <div className="wallet__contain">
              <div className="balance">
                <span className="balance__available">Available balance</span>
                <p>
                  {currency_formatter(
                    walletAmount ? walletAmount.available_balance : 0
                  )}
                </p>
              </div>
              <div className="bank__details">
                <div className="bank">
                  <div className="bank__name__icon">
                    <img src={bank} alt="bank icon" />
                    <span>Providus Bank</span>
                  </div>
                  <span className="deposit__info">
                    (₦50 naira charge per deposit)
                  </span>
                </div>
                <div className="account__num">
                  {verified.is_verified === 1 &&
                  userBankDetails.account_number ? (
                    <>
                      <span>{userBankDetails.account_number}</span>
                      <button
                        className="copy"
                        onClick={() =>
                          handleClickCopy(userBankDetails.account_number)
                        }
                      >
                        Copy
                        <ion-icon name="copy-outline"></ion-icon>
                      </button>
                    </>
                  ) : (
                    <span>Verify your account to get an account number</span>
                  )}
                </div>
                <span className="wallet__info">
                  This works like a regular bank account. You will be credited
                  instantly
                </span>
              </div>
            </div>
            <div className="transaction__history">
              <div className="custom__trans">
                <div className="table__heading">
                  <span className="history__title">Transaction History</span>
                  <div className="sort__filter">
                    <div className="filter">
                      <span>Filter: </span>
                      <select
                        name="transacTypeSort"
                        onChange={handleChangeTransacTypeSort}
                        value={transacType}
                      >
                        <option value="all">All</option>
                        <option value="purchase">Purchases</option>
                        <option value="deposit">Deposit</option>
                      </select>
                    </div>
                    <div className="sort">
                      <span>Sort by: </span>
                      <select
                        name="sort"
                        onChange={handleChangeSort}
                        value={sort}
                      >
                        <option value="all">All</option>
                        <option value="daily">Today</option>
                        <option value="weekly">This Week</option>
                        <option value="monthly">This Month</option>
                        <option value="last_month">Last Month</option>
                        {/* <option value="year">This Year</option> */}
                        <option value="custom">Custom</option>
                      </select>
                    </div>
                  </div>
                </div>
                {sort === "custom" && (
                  <div className="custom__show">
                    <div className="custom__sort">
                      <div className="date__box">
                        <div className="date__box__input">
                          <label>Start date</label>
                          <input
                            type="date"
                            name="start"
                            value={customSort.start}
                            onChange={handleChangeCustomSort}
                          />
                        </div>
                        <div className="date__box__input">
                          <label>End date</label>
                          <input
                            type="date"
                            name="end"
                            value={customSort.end}
                            onChange={handleChangeCustomSort}
                          />
                        </div>
                      </div>
                      {/* <button className="custom__sort__btn">Sort</button> */}
                    </div>
                  </div>
                )}
              </div>
              <table>
                <thead>
                  <tr className="trans__head">
                    <th>Transaction type</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Date</th>
                  </tr>
                </thead>
                {loading && (
                  <tbody>
                    <tr>
                      <div className="loading__spin__address">
                        <span className="loader"></span>
                      </div>
                    </tr>
                  </tbody>
                )}
                {!loading && !networkError && transacHistory?.length ? (
                  transacHistory.map((history, index) => (
                    <tbody>
                      <tr className="wallet__products" key={index}>
                        <td className="wallet__products__id">
                          <div
                            className={`${
                              history.mode === "deposit"
                                ? "deposit"
                                : history.mode === "purchase" && "purchase"
                            } transacType`}
                          >
                            {history.mode}
                          </div>
                        </td>
                        <td className="wallet__products__amount">
                          {currency_formatter(history.amount)}
                        </td>
                        <td
                          className={`${
                            history.transaction_status === "Successful"
                              ? "successful"
                              : history.transaction_status === "Unsuccessful"
                              ? "unsuccessful"
                              : history.transaction_status === "Pending" &&
                                "pending"
                          }`}
                        >
                          {history.transaction_status}
                        </td>
                        <td className="date__of__transaction">
                          <div className="date-trans">
                            <span className="date__year">
                              {
                                formatTransations(history.created_at).split(
                                  " "
                                )[0]
                              }
                            </span>
                            <span className="time">
                              {
                                formatTransations(history.created_at).split(
                                  " "
                                )[1]
                              }
                            </span>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  ))
                ) : (
                  <tbody>
                    <tr>
                      {!loading && !networkError && transacHistory && (
                        <Empty
                          emptyTitle="No transaction history"
                          // emptySubTitle="Fund your wallet and make some orders!"
                        />
                      )}
                      {!loading && networkError && (
                        <Empty
                          emptyTitle={alertMsg}
                          emptySubTitle="Something went wrong! TRY AGAIN.."
                          network={true}
                        />
                      )}
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
            {!loading &&
              (transacHistory?.length >= perPage || lastPage !== 1) &&
              !networkError && <Pagination links={links} setUrl={setUrl} />}
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

export default MyWallet;
