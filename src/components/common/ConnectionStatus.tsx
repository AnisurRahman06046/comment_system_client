import { useSocket } from '../../hooks/useSocket';

const ConnectionStatus = () => {
  const { connected } = useSocket();

  return (
    <div className="flex items-center space-x-2">
      <div
        className={`h-2.5 w-2.5 rounded-full ${
          connected ? 'bg-green-500' : 'bg-red-500'
        } ${connected ? 'animate-pulse' : ''}`}
      ></div>
      <span className="text-xs text-gray-600">
        {connected ? 'Live' : 'Disconnected'}
      </span>
    </div>
  );
};

export default ConnectionStatus;
