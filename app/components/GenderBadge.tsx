"use client";

interface GenderBadgeProps {
    gender: string;
}

export default function GenderBadge({ gender }: GenderBadgeProps) {
    const getBadgeStyle = (gender: string) => {
        const lowerGender = gender.toLowerCase();

        if (lowerGender === 'nam') {
            return {
                backgroundColor: '#3b82f6', // xanh dương
                color: 'white',
            };
        } else if (lowerGender === 'nữ') {
            return {
                backgroundColor: '#ec4899', // hồng
                color: 'white',
            };
        }

        // Màu mặc định
        return {
            backgroundColor: '#6b7280',
            color: 'white',
        };
    };

    const style = getBadgeStyle(gender);

    return (
        <span
            style={{
                ...style,
                padding: '4px 6px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold',
                display: 'inline-block',
                minWidth: '60px',
                textAlign: 'center',
            }}
        >
           {gender}
        </span>
    );
}
