import HeaderBox from "./(components)/Header";

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className='size-full flex  flex-col bg-gray-50'>
      <HeaderBox />
      {children}
      <footer className='flex h-16 items-center justify-center bg-gray-100 text-gray-500'>
        <div className=''>Made with ❤️ by Neb23</div>
      </footer>
    </main>
  );
}
