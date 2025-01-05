
export default function Home() {
  return (
    <main
      suppressHydrationWarning={true}
      className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1 className='text-5xl font-bold'>Welcome to the Schedule Builder</h1>
      <p className='text-xl font-semibold'>
        This is a tool to help you build your schedule for the upcoming semester.
      </p>
    </main>
  );
}
