export const dateConversor = (
  addTime: number, // adicionar um valor default para o parâmetro
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

export const dateCountdown = (date: string | Date) => {
  const currentTime = new Date().getTime();
  const timing = dateConversor(0, date).time;
  const timeLeft = timing - currentTime;

  const value = Math.max(timeLeft, 0);
  const segundo = Math.floor((value / 1000) % 60);
  const minuto = Math.floor((value / 1000 / 60) % 60);
  const hora = Math.floor((value / (1000 * 60 * 60)) % 24);
  const dia = Math.floor(value / (1000 * 60 * 60 * 24));

  let timeFormat = "";
  if (dia >= 1) timeFormat = `${dia} d e ${hora} h`;
  else if (hora >= 1) timeFormat = `${hora}h e ${minuto}m`;
  else if (minuto >= 1) timeFormat = `${minuto}m e ${segundo}s`;
  else timeFormat = `${segundo} s`;

  return timeLeft < 0 ? "expired" : timeFormat;

};

export const notifierError = (errors: string[]) => {
  const message = errors.join("\n");
  alert(`Error: ${message}`);
}

export const notifierSuccess = (message: string) => {
  alert(`Success: ${message}`);
}