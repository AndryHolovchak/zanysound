import { object2queryParams } from "./../utils/urlUtils";
export enum ApiMethods {
  Get = "GET",
  Post = "POST",
  Delete = "DELETE",
}

export const deezerApiRequest = async (
  path: string,
  queryParams: object = {},
  method = ApiMethods.Get,
  body: object = {}
) => {
  let generatedPath = path + object2queryParams(queryParams);
  let promise = new Promise((resolve, reject) => {
    //@ts-ignore
    DZ.api(generatedPath, method, body, (response: any) => {
      resolve(response);
    });
  });

  return promise;
};

export const getUserInfo = async () => {
  let response = await deezerApiRequest("/user/me");
  return response;
};

export const getUserPlaylists = async () => {
  let response: any = await deezerApiRequest("/user/me/playlists");
  return response.data;
};

export const getPlaylistTracks = async (id: string) => {
  let response: any = await deezerApiRequest(`/playlist/${id}`);
  return response.tracks.data;
};

export const searchTrackApiCall = async (query: string, index: number = 0) => {
  let encodedQueyr = encodeURIComponent(query);
  let response: any = await deezerApiRequest(
    `/search?q=${encodedQueyr}&strict=off&order=RANKING&index=${index}`
  );
  return response.data;
};
