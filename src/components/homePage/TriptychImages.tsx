export interface TriptychImage {
    imageUrl: string;
    title: string;
    description: string;
}

export const triptychImages: TriptychImage[] = [
    {
        imageUrl: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=2070&auto=format&fit=crop',
        title: 'Romantic Escape to Paradise',
        description: `Celebrate your love with a dreamy honeymoon in the world's most romantic destinations.`,
    },
    {
        imageUrl: 'https://images.unsplash.com/photo-1433838552652-f9a46b332c40?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Rejuvenation Escape',
        description: 'Reconnect with yourself on this 12-day wellness retreat.',
    },
    {
        imageUrl: 'https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=2092&auto=format&fit=crop',
        title: 'Luxury Business Expedition',
        description: 'Combine work and pleasure on this 12-day luxury business trip.',
    },
];
