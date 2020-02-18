/**
 * handleAPIErrors
 * Checks for errors in API response
 * Returns the response if response.ok is true
 * Throws error if response.ok is false
 *
 * @param {response} FetchAPIResponseObject
 * @public
 */
export default function handleAPIErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
