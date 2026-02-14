export type Moment = {
  id: string;
  date: string;
  description: string;
  image?: string;
};

/**
 * Add or remove moments here. They will be automatically sorted by date.
 * Set `image` to a path (e.g. "/photos/sunset.jpg") for an optional picture.
 */
export const MOMENTS: Moment[] = [
  {
    id: "1",
    date: "May 15, 2025",
    description:
      "I stepped out of my comfort zone and went into the world of salsa dancing. All I was looking for was a new hobby, but I found so much more.I found you, and life has never been the same since.",
  },
  {
    id: "2",
    date: "May 25, 2025",
    description:
      "We went on our first date. I was so nervous and tired but seeing you there made it all worth it. I had so much fun and I knew I had to see you again.",
    image: "/images/IMG_1308.JPG",
  },
  {
    id: "3",
    date: "August 1, 2025",
    description:
      "The day I asked you to be my girlfriend. I was so nervous and sweaty but you looked into my eyes and said yes. And God, you looked so beautiful in that dress.",
  },
  {
    id: "4",
    date: "July 13, 2025",
    description:
      "It was your birthday and I wanted it to be special. The smile on your face at the end of the night was the best gift I could have given you.",
  },
  {
    id: "5",
    date: "August 31, 2025",
    description:
      "We went on a day trip to Squamish and it was so much fun. I enjoyed every moment, from the drive there and back, to the ride on the gondola. It was a perfect day.",
  },
].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
