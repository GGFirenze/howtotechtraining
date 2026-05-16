export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-zinc-50 px-6 py-16 sm:px-10 sm:py-24 dark:bg-zinc-950">
      <header className="w-full max-w-5xl">
        <div className="flex items-center gap-2 text-sm font-semibold tracking-widest text-zinc-700 uppercase dark:text-zinc-300">
          <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-cyan-500" />
          CrackVILT
        </div>
      </header>

      <section className="flex w-full max-w-3xl flex-1 flex-col items-start justify-center py-16">
        <p className="mb-6 inline-flex items-center rounded-full border border-zinc-300 bg-white px-3 py-1 text-xs font-medium tracking-wider text-zinc-700 uppercase dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
          Coming soon
        </p>

        <h1 className="text-4xl leading-tight font-bold tracking-tight text-zinc-900 sm:text-5xl md:text-6xl dark:text-zinc-50">
          Crack the secret to a successful{" "}
          <span className="text-cyan-600 dark:text-cyan-400">VILT</span> session.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
          The practical guide to designing and delivering Virtual Instructor-Led Training that
          actually sticks &mdash; for engineers, dev advocates, consultants, and anyone who teaches
          technical topics live.
        </p>

        <div className="mt-10 flex flex-col gap-3 text-sm text-zinc-600 sm:flex-row sm:items-center sm:gap-6 dark:text-zinc-400">
          <span>By Giuliano Giannini</span>
          <span aria-hidden className="hidden h-1 w-1 rounded-full bg-zinc-400 sm:inline-block" />
          <span>Launching shortly</span>
        </div>
      </section>

      <footer className="flex w-full max-w-5xl flex-col items-start justify-between gap-4 text-xs text-zinc-500 sm:flex-row sm:items-center dark:text-zinc-500">
        <p>&copy; {new Date().getFullYear()} CrackVILT. All rights reserved.</p>
        <p>Built in the UK.</p>
      </footer>
    </main>
  );
}
