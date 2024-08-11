import React from 'react';

interface LoadingProps {
  isLoading: boolean;
}

export const Loading: React.FC<LoadingProps> = ({ isLoading }) => {
  if (!isLoading) return null; // Skip rendering if not loading

  return (
    <div style={styles.container}>
      <div style={styles.dot}></div>
      <div style={{ ...styles.dot, animationDelay: '0.2s' }}></div>
      <div style={{ ...styles.dot, animationDelay: '0.4s' }}></div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    gap: '8px',
  },
  dot: {
    width: '15px',
    height: '15px',
    borderRadius: '50%',
    backgroundColor: '#3b82f6', // Blue color
    animation: 'bounce 1s infinite ease-in-out',
  },
};

// Injecting keyframes into the document head
const keyframes = `
  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1); }
  }
`;

const styleSheet = document.styleSheets[0];
styleSheet.insertRule(keyframes, styleSheet.cssRules.length);
