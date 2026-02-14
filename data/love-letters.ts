export type LoveLetter = {
  id: string;
  date: string;
  title: string;
  body: string;
  /** Optional Colombian Spanish translation. When present, the modal shows an EN/ES toggle. */
  bodyEs?: string;
};

const EXCERPT_MAX_LENGTH = 180;

/** Derives an excerpt from the letter body (first paragraph, truncated if needed). */
export function getExcerpt(body: string): string {
  const firstParagraph = body.split(/\n\n/)[0]?.trim() ?? body;
  if (firstParagraph.length <= EXCERPT_MAX_LENGTH) return `${firstParagraph}…`;
  const truncated = firstParagraph.slice(0, EXCERPT_MAX_LENGTH);
  const lastSpace = truncated.lastIndexOf(" ");
  return lastSpace > EXCERPT_MAX_LENGTH * 0.5
    ? `${truncated.slice(0, lastSpace)}…`
    : `${truncated}…`;
}

/**
 * Add or remove love letters here. They will be automatically sorted by date (newest first).
 * Excerpts are derived from the first paragraph of each body.
 */
export const LOVE_LETTERS: LoveLetter[] = [
  {
    id: "1",
    date: "February 14, 2026",
    title: "On our first Valentine's",
    body: `I woke up this morning and the first thought was you. Not the coffee. Not the alarm. You.

There are days when I still can't believe we found each other. Out of all the people, all the moments, all the possible paths—we're here. Together.

This letter is just to say: thank you. For being exactly who you are. For the way you laugh at my jokes (even the bad ones). For holding my hand when I'm nervous. For making ordinary days feel extraordinary.

I love you. Today and every day.`,
    bodyEs: `Desperté esta mañana y el primer pensamiento fuiste tú. No el café. No la alarma. Tú.

Hay días en que aún no puedo creer que nos encontramos. De todas las personas, todos los momentos, todos los caminos posibles—estamos aquí. Juntos.

Esta carta es solo para decir: gracias. Por ser exactamente quien eres. Por la forma en que te ríes de mis chistes (incluso los malos). Por tomarme de la mano cuando estoy nervioso. Por hacer que los días ordinarios se sientan extraordinarios.

Te amo. Hoy y todos los días.`,
  },
  {
    id: "2",
    date: "January 8, 2026",
    title: "Loving you",
    body: `Loving you feels like home. Like the right amount of the right things within the right person. It feels like fresh water after walking the desert of life. Like the songs of birds as the sun rises over the horizon. I know little about the future, but every time I look at you, I see our future clear as day. One where our love infinitely grows and blossom. And from there, we walk the world with our head held high, knowing that no matter what, we have won because we have each other.
    
    I often don't know how to tell you how big my love for you is. Who can measure the weight of all the oceans? Or say with certainty the circumference of the universe? Or tell of the beauty of all the colors our eyes cannot perceive? And since my love for you transcends all the metaphors and sentences that can be strung together with words or even the depths of their meanings, I'll simply say "I love you my tigey wifey" ❤️‍🔥❤️‍🔥`,
  },
  {
    id: "3",
    date: "August 22, 2025",
    title: "Loss of words",
    body: `At times I remain suspended within a second, 
Utterly rendered breathless, mute.
What stands before me shatters the pane of reality,
for it defies what beauty is.

I liken you to the sacred geometry of a rose
soft, enchanting,
sculpted by the seasoned hands of the creator.

You are lightning etched into storms
wild, rare,
dangerous and captivating in rawness.

Your eyes blaze brighter than the fullest moon.
Your movements sleeker, more precise than a prowling panther.

How can language cage what you are?
How can words stretch to reach your essence?
Divinity spills from your skin like waves,
breaking me open,
drowning me in love too vast for ribs to hold.

And since the universe cannot fit in a single breath,
since the infinite cannot be distilled into a sentence,
I lean close, surrender, and whisper
“You look pretty today, mi amor.”`,
  },
  {
    id: "4",
    date: "November 22, 2025",
    title: "An ode to my love",
    body: `I love you because you exist
because you are exactly as you are,
and because that is all I’ve ever needed you to be.

There is no condition for what I feel for you.
It is constant,
like it has always been there,
long before I even knew your name.

I love you in your beauty,
in the streaks of tears that grace your royal cheeks.
I love you as you wake,
groggily, grumpily,
still halfway between dream and day.

I love the sound of your laughter,
the octave that rises
with the wave of your passions.
I love your warmth
the one that spreads across my being
whenever we touch.

Just as the mountains stand tall and proud,
and the oceans remain deep and wild,
my love for you will forever be there
in depths no one has ever dared reach.
`
  },
].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);
