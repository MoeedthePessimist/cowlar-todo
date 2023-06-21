export function getTimeElapsed(date: Date) {
  const prev = new Date(date);
  const now = new Date();
  const elapsedMilliseconds = now.getTime() - prev.getTime();

  // Calculate the time elapsed in minutes, hours, and days
  const minutes = Math.floor(elapsedMilliseconds / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // Construct the appropriate time elapsed string
  if (minutes < 1) {
    return 'completed just now';
  } else if (minutes < 60) {
    return `completed ${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  } else if (hours < 24) {
    return `completed ${hours} hour${hours !== 1 ? 's' : ''} ago`;
  } else {
    return `completed ${days} day${days !== 1 ? 's' : ''} ago`;
  }
}
