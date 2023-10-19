export function getFormateDate(date) {
  return date.toISOString().slice(0, 10);
  // return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
}

export function getDateMinusDays(date, days){
  return new Date(today.getFullYear(), today.getMonth(), today.getDate()-days)
  // return date;
  // return date.setDate(date.getDate() - days);
}

