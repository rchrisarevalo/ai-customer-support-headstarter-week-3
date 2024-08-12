interface LoadingProps {
  isLoading: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  if (!isLoading) return null; // Skip rendering if not loading

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex space-x-2">
        <div className="h-4 w-4 bg-gradient-to-b from-blue-100 to-green-100rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
        <div className="h-4 w-4 bg-gradient-to-b from-blue-100 to-green-100 rounded-full animate-bounce delay-400" style={{ animationDelay: '0.2s' }}></div>
        <div className="h-4 w-4 bg-gradient-to-b from-blue-100 to-green-100 rounded-full animate-bounce delay-800" style={{ animationDelay: '0.4s' }}></div>
      </div>
    </div>
  );
};