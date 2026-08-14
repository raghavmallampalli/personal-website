export default function TitleBar() {
  return (
    <div 
      className="h-8 flex items-center px-3 flex-shrink-0 select-none"
      style={{
        backgroundColor: '#000000',
      }}
    >
      <div className="flex space-x-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      </div>
    </div>
  );
} 