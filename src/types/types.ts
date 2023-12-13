export interface IconProps {
    name?: string,
    width?: number,
    height?: number,
    prepend?: string,
    append?: string
}

export interface CommentItemProps {
    id: number,
    avatar: string,
    name: string,
    text: string,
    author?: number,
    parent?: null,
    likes: number,
    created: any
}
