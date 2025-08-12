"use client";

interface ClassBadgeProps {
  className: string;
}

export default function ClassBadge({ className }: ClassBadgeProps) {
  const getBadgeStyle = (className: string) => {
    const lowerClass = className.toLowerCase();
    
    if (lowerClass.includes('thiếu nhi')) {
      return {
        backgroundColor: '#3b82f6',
        color: 'white',
        border: '1px solid #2563eb'
      };
    } else if (lowerClass.includes('nghĩa sĩ')) {
      return {
        backgroundColor: '#fbbf24',
        color: '#92400e',
        border: '1px solid #f59e0b'
      };
    } else if (lowerClass.includes('hiệp sĩ')) {
      return {
        backgroundColor: '#a16207',
        color: 'white',
        border: '1px solid #92400e'
      };
    } else if (lowerClass.includes('dự trưởng')) {
      return {
        backgroundColor: '#ef4444',
        color: 'white',
        border: '1px solid #dc2626'
      };
    }
    
    return {
      backgroundColor: '#6b7280',
      color: 'white',
      border: '1px solid #4b5563'
    };
  };

  const style = getBadgeStyle(className);

  return (
    <span 
      style={{
        ...style,
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 'bold',
        display: 'inline-block',
        minWidth: '80px',
        textAlign: 'center'
      }}
    >
      {className}
    </span>
  );
}
