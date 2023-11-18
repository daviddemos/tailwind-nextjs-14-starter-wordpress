export type Post = {
    id: string;
    categories: Category[];
    databaseId: number;
    date: string;
    isSticky: boolean;
    postId: number;
    slug: string;
    title: string;
    excerpt: string;
    seo?: SEO;
};

export type Category = {
    databaseId: number;
    id: string;
    name: string;
    slug: string;
};


export type Author = {
    node: {
        avatar: {
            height: number;
            url: string;
            width: number;
        };
        id: string;
        name: string;
        slug: string;
    };
};

export type FeaturedImage = {
    node: {
        altText: string;
        caption: string;
        sourceUrl: string;
        srcSet: string;
        sizes: string;
        id: string;
    };
};

export type SEO = {
    canonical: string;
    metaDesc: string;
    metaRobotsNofollow: string;
    metaRobotsNoindex: string;
    opengraphAuthor: string;
    opengraphDescription: string;
    opengraphModifiedTime: string;
    opengraphPublishedTime: string;
    opengraphPublisher: string;
    opengraphTitle: string;
    opengraphType: string;
    readingTime: number;
    title: string;
    twitterDescription: string;
    twitterTitle: string;
    twitterImage: {
        altText: string;
        sourceUrl: string;
        mediaDetails: {
            width: number;
            height: number;
        };
    };
    opengraphImage: {
        altText: string;
        sourceUrl: string;
        mediaDetails: {
            height: number;
            width: number;
        };
    };
};

export type PostConnection = {
    edges: Array<{
        node: Post;
    }>;
};

export type AllPostsResponse = {
    posts: PostConnection;
};

export type PostBySlugResponse = {
    post: Post & {
        author: Author;
        excerpt: string;
        featuredImage: FeaturedImage;
        modified: string;
        seo: SEO;
    };
};

export type PostSEOBySlugResponse = {
    post: {
        id: string;
        seo: SEO;
    };
};

export type PostPerPageResponse = {
    allSettings: {
        readingSettingsPostsPerPage: number;
    };
};
