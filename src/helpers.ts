// Convert time to hours and minutes
export const calcTime = (time: number): string => {
  const hours: number = Math.floor(time / 60);
  const mins: number = time % 60;
  return `${hours}h ${mins}m`;
};
// Convert a number to money formatting
export const convertMoney = (money: number): string => {
  const formatter: Intl.NumberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency', //style of formatting 
    currency: 'USD',
    minimumFractionDigits: 0,
  });
  return formatter.format(money);
};

export const isPersistedState = (stateName: string): any => {
  const sessionState = localStorage.getItem(stateName); // state from localStorage
  return sessionState && JSON.parse(sessionState); // if state in localStorage is not empty
};
