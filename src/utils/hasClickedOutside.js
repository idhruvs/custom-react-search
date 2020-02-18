/**
 * hasClickedOutside
 * Checks if click event has occured outside the node referred.
 * Returns true if event.target is outside the node.reference
 *
 * @param { event } Event
 * @param { nodeReference } Node
 * @public
 */
export default function hasClickedOutside(event, nodeReference) {
  if (nodeReference && !nodeReference.contains(event.target)) {
    return true;
  }
  return false;
}