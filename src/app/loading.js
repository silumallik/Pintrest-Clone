export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="flex gap-2">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
        <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce delay-150"></div>
        <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce delay-300"></div>
      </div>
    </div>
  );
}