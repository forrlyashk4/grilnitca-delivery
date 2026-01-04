export default function Loading() {
  return (
    <div className="fixed top-0 left-0 h-screen w-screen bg-black/50 z-100 flex justify-center items-center">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-black" />
    </div>
  );
}
