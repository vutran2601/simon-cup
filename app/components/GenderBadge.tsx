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
                padding: '4px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold',
                display: 'inline-block',
                minWidth: '90px',
                textAlign: 'center',
            }}
        >
           {gender}
        </span>
    );
}
