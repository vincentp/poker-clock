export const loadState = () => {
  try {
    //localStorage.removeItem('state');
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) 
      return undefined;
    else
      return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
  }
};