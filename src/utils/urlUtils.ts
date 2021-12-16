export const object2queryParams = (obj: any, encodeValues: boolean = true): string => {
  let resultArray = ["?"];

  for (const [key, value] of Object.entries<string>(obj)) {
    resultArray.push(`${key}=${encodeValues ? encodeURIComponent(value) : value}`);
  }

  return resultArray.join("&");
};
