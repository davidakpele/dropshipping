export const getState = (stateKey, initialState) => {
  const cachedState = JSON.parse(localStorage.getItem("app_state") || "{}");

  return cachedState[stateKey] || initialState;
};

export const saveState = (stateKey, updatedState) => {
  const currentAppState = JSON.parse(localStorage.getItem("app_state") || "{}");

  localStorage.setItem(
    "app_state",
    JSON.stringify({
      ...currentAppState,
      [stateKey]: updatedState,
    })
  );
};
