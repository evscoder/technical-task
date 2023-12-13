import React, {FC, useEffect, useState} from 'react';
import styles from './comment.module.css';
import cn from 'clsx';
import Icon from "../../ui/icon/Icon";
import {CommentItemProps} from "../../../types/types";
import {useDispatch} from "react-redux";
import {commentLikesToggle} from "../../../redux/commentsSlice";

interface CommentProps {
    item: CommentItemProps
}

const Comment: FC<CommentProps> = ({ item }) => {
    const [like, setLike] = useState<boolean>(false);
    const [date, setDate] = useState<string>(item.created);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(commentLikesToggle(like));
    }, [dispatch, like]);

    useEffect(() => {
        setDate(item.created && date.replace('T', ', ').replace(/\..*/,''))
    }, [date, item.created]);

    const onLiked = () => {
        setLike(!like);
    };

    return (
        <>
            {item.text &&
                <div className={cn(styles.comment, item.parent !== null && styles['comment--child'])}>
                    <figure className={styles.avatar}>
                        {item.avatar && <img src={item.avatar} alt={item.name}/>}
                    </figure>
                    <div className={styles.nameColumn}>
                        <h4 className={styles.name}>{item.name ? item.name : 'User'}</h4>
                        <time className={styles.time}>{date}</time>
                    </div>
                    <div className={styles.likes}>
                        <button className={styles.likeBtn} type={'button'} onClick={onLiked}>
                            <Icon name={like ? 'icon-like-filled' : 'icon-like-empty'} width={22} />
                        </button>
                        <span className={styles.likesText}>{(() => {
                            if (!item.likes && like) {
                                return 1
                            } else if (like) {
                                return item.likes + 1
                            } else {
                                return item.likes
                            }
                        })()}</span>
                    </div>
                    <p className={styles.text}>{item.text}</p>
                </div>
            }
        </>
    );
};

export default Comment;
