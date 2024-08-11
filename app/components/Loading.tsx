interface LoadingProps {
  isLoading: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  if (!isLoading) return null; // Skip rendering if not loading

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex space-x-2">
        <div className="h-4 w-4 bg-blue-500 rounded-full animate-bounce"></div>
        <div className="h-4 w-4 bg-blue-500 rounded-full animate-bounce delay-400"></div>
        <div className="h-4 w-4 bg-blue-500 rounded-full animate-bounce delay-800"></div>
      </div>
    </div>
  );
};
