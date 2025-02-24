import { BackgroundLines } from '@/components/ui/background-lines';
import { ColourfulText } from '@/components/ui/colourful-text';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import Link from 'next/link';

const games = [
  { name: 'Snake', slug: 'snake', isReady: true },
  { name: '2048', slug: '2048', isReady: false },
  { name: 'Tetris', slug: 'tetris', isReady: false },
  { name: 'Block Breaker', slug: 'block-breaker', isReady: false },
];

export default function Home() {
  return (
    <BackgroundLines className='flex items-center justify-center min-h-screen max-h-screen w-full flex-col'>
      <main className='flex flex-col items-center justify-center min-h-screen bg-[#1A1A1A] text-white px-4 sm:px-8'>
        <h1 className='text-4xl font-bold mb-8 z-40'>
          Enjoy my <ColourfulText text='games' />
        </h1>
        <div className='grid grid-cols-2 gap-4 sm:gap-6 md:gap-10 w-full aspect-square max-h-[70vh]'>
          {games.map((game) =>
            game.isReady ? (
              <Link
                key={game.slug}
                href={`/game/${game.slug}`}
                className='w-full'
              >
                <div className='relative flex items-center justify-center w-full aspect-square rounded-xl border-neutral-600 border-4 p-4 md:rounded-3xl md:p-6 bg-neutral-800/10 hover:bg-neutral-500/20 transition-all duration-500'>
                  <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={6}
                  />
                  <p className='text-2xl font-semibold text-center'>
                    {game.name}
                  </p>
                </div>
              </Link>
            ) : (
              <div
                key={game.slug}
                className='relative flex items-center justify-center w-full aspect-square rounded-xl border-neutral-600 border-4 p-4 md:rounded-3xl md:p-6 bg-neutral-700 cursor-not-allowed opacity-50'
              >
                <p className='text-2xl font-semibold text-center'>
                  {game.name} (Coming Soon)
                </p>
              </div>
            )
          )}
        </div>
      </main>
    </BackgroundLines>
  );
}
