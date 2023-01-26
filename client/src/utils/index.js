import FileSaver from "file-saver";
import { surpriseMePrompts } from "../constants";

/**
 * If the random prompt is the same as the current prompt, call the function again.
 * @param prompt - The prompt that the user is currently on.
 * @returns A random prompt from the surpriseMePrompts array.
 */
export function getRandomPrompt(prompt) {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}

/**
 * It takes the _id and photo from the MongoDB database and downloads the photo as a .jpg file.
 * </code>
 * @param _id - the id of the document
 * @param photo - the image data
 */
export async function downloadImage(_id, photo) {
  FileSaver.saveAs(photo, `download-${_id}.jpg`);
}
