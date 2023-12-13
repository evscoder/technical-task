import React, {useEffect} from 'react';
import styles from './Comments.module.css';
import getCommentsRequest from "../../../api/comments/getCommentsRequest";
import Button from "../../ui/button/Button";
import Container from "../../layout/container/Container";
import Icon from "../../ui/icon/Icon";
import bg from "../../../assets/bg.jpg";
import Comment from "../comment/Comment";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../../redux/store";
import cn from "clsx";

const Comments = () => {
    const {comments, commentsCount, commentLikes, loading, error, page, isLoad} = useSelector((state: RootState) => state.commentsSlice);
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(getCommentsRequest({init: true, page}));
    }, []);

    const onLoad = () => {
        dispatch(getCommentsRequest({page}));
    };

    return (
        <div className={styles.comments}>
            <div className={styles.bg} style={{backgroundImage: `url(${bg})`}}></div>
            <Container classNames={styles.container}>
                <>
                    <div className={styles.stat}>
                        <div className={styles.allComments}>{commentsCount} комментариев</div>
                        <div className={styles.allLikes}>
                            <Icon name={'icon-like-grey'} width={22} />
                            {commentLikes}
                        </div>
                    </div>
                    <div className={styles.items}>
                        {comments && comments.map(item => {
                            return (
                                <Comment item={item} />
                            )
                        })}
                    </div>
                    <div className={styles.bottom}>
                        <Button onClick={onLoad} disabled={loading as boolean} type={'button'} classNames={cn(styles.buttonLoad, isLoad && styles.load)}>
                            {loading ?
                                'Загрузка ...' :
                                'Загрузить еще'
                            }
                        </Button>
                        {error && <span className={styles.errorHelper}>Ошибка загрузки. Попробуйте ещё раз.</span>}
                    </div>
                </>
            </Container>
        </div>
    );
};

export default Comments;
