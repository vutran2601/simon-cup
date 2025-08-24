"use client";

interface TeamBadgeProps {
  teamName: string;
}

export default function TeamBadge({ teamName }: TeamBadgeProps) {
  const getBadgeStyle = (teamName: string) => {
    const lowerTeam = teamName.toLowerCase();

    // Bạn có thể thêm hoặc chỉnh sửa màu cho từng đội ở đây
    if (lowerTeam.includes('đội 1')) {
      return {
        backgroundColor: '#fbbf24', // 
        color: 'white',
      border: 'none'
      };
    } else if (lowerTeam.includes('đội 2')) {
      return {
        backgroundColor: '#34d399',
        color: 'white',
      border: 'none'
      };
    } else if (lowerTeam.includes('đội 3')) {
      return {
        backgroundColor: '#60a5fa',
        color: 'white',
      border: 'none'
      };
    } else if (lowerTeam.includes('đội 4')) {
      return {
        backgroundColor: '#92400e', // vàng nhạt
        color: 'white',
      border: 'none'
      };
    }

    // Màu mặc định nếu không khớp
    return {
      backgroundColor: '#9ca3af',
      color: 'white',
      border: 'none'
    };
  };

  const style = getBadgeStyle(teamName);

  return (
    <span
      style={{
        ...style,
        padding: '4px 6px',
        borderRadius: '12px',
        fontSize: '12px',
        fontWeight: 'bold',
        display: 'inline-block',
        minWidth: '70px',
        textAlign: 'center'
      }}
    >
      {teamName}
    </span>
  );
}
