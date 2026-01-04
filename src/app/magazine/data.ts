export interface Magazine {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    flipbookUrl: string;
    publishedDate: string; // Format: YYYY-MM-DD
}

export const magazines: Magazine[] = [
    {
        id: "1",
        title: "Accomplishment: Some Ways to Win Life",
        description: "Enter the first dimension of joy, Achievement: Some Ways to Win Life! This December issue invites you to explore the meaning of achievement through inspiring stories, beautiful art, comforting films, and exciting life events. Together, they encourage you to reflect and form your own interpretation of what it truly means to win in life.",
        coverImage: "/magazine/cover/magcover_1.webp",
        flipbookUrl: "https://heyzine.com/flip-book/ae6c5719da.html",
        publishedDate: "2025-01-5",
    },
];

export const getLatestMagazine = (): Magazine => {
    return [...magazines].sort((a, b) => 
        new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    )[0]!;
};

export const getMagazineById = (id: string): Magazine | undefined => {
    return magazines.find((mag) => mag.id === id);
};
