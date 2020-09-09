import fetchUrl from "../utils/fetchUrl/fetchUrl";
import { Books } from "./types";

export async function getBooksByType(type: string) {
  try {
    return await fetchUrl<Books>(
      `https://www.googleapis.com/books/v1/volumes?q=${type}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      }
    );
  } catch (exception) {
    return null;
  }
}
