export const convertDate = (
  addTime: number,
  date: string | Date = new Date()
) => {
  const newDate = date instanceof Date ? date : new Date(date);
  const advancedDate = new Date(newDate.getTime() + addTime);

  return {
    localeString: advancedDate.toUTCString(),
    time: advancedDate.getTime(),
    date: advancedDate,
  };
};

export const countDownDate = (date: string | Date) => {
  const currentTime = new Date().getTime();
  const timing = convertDate(0, date).time;
  const timeLeft = timing - currentTime;

  const value = Math.max(timeLeft, 0);
  const s = value / 1000;
  const m = s / 60;
  const h = m / 60;
  const d = h / 24;

  let label = ["s", "ss"];
  if (d >= 1) label = ["d", "dd/hh"];
  else if (h >= 1) label = ["h", "hh/mm"];
  else if (m >= 1) label = ["m", "mm/ss"];

  return {
    value: { s, m, h, d }[label[0]]!,
    label: timeLeft < 0 ? "expired" : label[1],
  };
};

export const notifierError = (errors: string[]) => {
  const message = errors.join("\n");
  alert(`Error: ${message}`);
}

export const notifierSuccess = (message: string) => {
  alert(`Success: ${message}`);
}