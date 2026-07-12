import React from 'react';
import { Card } from '@heroui/react';

export const StatCard = ({ title, value, icon: Icon, className = "" }) => {
    return (
        <Card
            className={`bg-green-50 text-green-900 rounded-2xl p-2 ${className}`}
        >
            <Card.Content className="flex flex-col gap-6 justify-between p-4">
                {/* Icon Wrapper */}
                {Icon && (
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-green-200 text-green-800">
                        <Icon width={20} height={20} />
                    </div>
                )}

                {/* Content */}
                <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium text-green-700">
                        {title}
                    </span>
                    <span className="text-3xl font-semibold text-green-950 tracking-tight">
                        {value}
                    </span>
                </div>
            </Card.Content>
        </Card>
    );
};