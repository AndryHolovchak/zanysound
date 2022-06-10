export const sec2MMSS = (sec: number) => {
  let hours: string = ~~(sec / 60) + "";

  if (hours.length === 1) {
    hours = "0" + hours;
  }

  let minutes: string = ~~(sec % 60) + "";

  if (minutes.length === 1) {
    minutes = "0" + minutes;
  }

  return `${hours}:${minutes}`;
};
