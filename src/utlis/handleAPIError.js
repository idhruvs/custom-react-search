export default function handleAPIErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
