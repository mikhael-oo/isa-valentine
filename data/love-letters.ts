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
    body: `Since it is a day of firsts, I will reminisce on a bunch of our firsts.

The day I met you as you radiantly danced into my life. 

The first time I looked into your eyes - those honey brown depths that I could not help but wade in.

The first time we touched - as you placed your hand on mine to dance. I was not very good, but your grace eased me safely into unfamiliar territory.

The first time we kissed - as the world faded away the moment our lips met. I immediately knew I wanted to kiss those lips a thousand times more.

The first time you cried - in my car outside whole foods. Something within me shifted and my whole being scrambled to ease whatever pain made those precious tears fall.

The first time I told you I loved you - it was scary and vulnerable and it was just right.

The first time you told me you loved me - it felt like angels finally sang in my ears a song I have longed for.

There are so many tiny and big firsts, some we will forget, but all will be cherished. And since this is our first valentine, with my heart burstling with love, I say "Happy valentine mi amor"`,
    bodyEs: `Ya que hoy es un día de primeras veces, voy a recordar varias de nuestras primeras veces.

El día en que te conocí, cuando entraste en mi vida bailando con esa luz tan tuya.

La primera vez que miré tus ojos — esas profundidades color miel en las que no pude evitar sumergirme.

La primera vez que nos tocamos — cuando pusiste tu mano sobre la mía para bailar. Yo no era muy bueno, pero tu gracia me llevó con suavidad y seguridad a un territorio desconocido.

La primera vez que nos besamos — cuando el mundo se desvaneció en el instante en que nuestros labios se encontraron. Supe de inmediato que quería besar esos labios mil veces más.

La primera vez que lloraste — en mi carro, afuera de Whole Foods. Algo dentro de mí cambió y todo mi ser se movilizó para aliviar cualquier dolor que hiciera caer esas lágrimas tan preciadas.

La primera vez que te dije que te amaba — fue aterrador y vulnerable, y fue perfecto.

La primera vez que me dijiste que me amabas — se sintió como si por fin los ángeles cantaran en mis oídos una canción que había anhelado por tanto tiempo.

Hay tantas primeras veces, pequeñas y grandes. Algunas las olvidaremos, pero todas serán atesoradas. Y como este es nuestro primer San Valentín, con el corazón rebosando de amor, te digo: “Feliz San Valentín, mi amor.”`,
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
