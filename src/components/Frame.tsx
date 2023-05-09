export default function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="hidden md:block p-10">
      <div className="z-40 fixed bg-white top-0 left-0 w-full h-10" />
      <div className="z-40 fixed bg-white bottom-0 left-0 w-full h-10" />
      <div className="z-40 fixed bg-white top-0 bottom-0 left-0 w-10 h-full" />
      <div className="z-40 fixed bg-white top-0 bottom-0 right-0 w-10 h-full" />

      {children}
    </div>
  );
}
