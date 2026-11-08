export const isNumber = (value) => {
  if (!value) return true;
  if ((value.match(/\./g)?.length || 0) > 1) return false;
  if (value.endsWith(".")) return true;

  const re = /^[0-9.\b]+$/;

  // if value is not blank, then test the regex
  return re.test(value);
};

export const getDateTime = (dateString, seconds) => {
  const new_date = new Date(dateString);

  const day = new_date.getDate();
  const month = new_date.getMonth();
  const year = new_date.getFullYear();

  const hours = new_date.getHours();
  const meridian = hours < 12 ? "AM" : "PM";

  let hours12format = hours % 12;
  hours12format = hours12format ? hours12format : 12;

  const comp_date = `${String(day).padStart(2, "0")}-${String(
    month + 1
  ).padStart(2, "0")}-${year}`;
  const comp_time = `${String(hours12format).padStart(2, "0")}:${String(
    new_date.getMinutes()
  ).padStart(2, "0")}${
    seconds ? `:${String(new_date.getSeconds()).padStart(2, "0")}` : ""
  } ${meridian}`;

  return [comp_date, comp_time];
};

export const getTime = (dateString) => {
  let retDate = "";

  const [date] = getDateTime(dateString);

  if (date === getDateTime(new Date().toString())[0]) {
    retDate = "Today";
  } else if (
    date === getDateTime(new Date(Date.now() - 86400000).toString())[0]
  ) {
    retDate = "Yesterday";
  } else {
    retDate = date;
  }

  return retDate;
};
