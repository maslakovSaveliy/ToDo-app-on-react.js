import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../API/PostService";
import Loader from "../components/UI/Loader/Loader";
import { useFetching } from "../hooks/useFetching";
const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  // Полученный комментарий нам необходимо будет сохранить в состояние, поэтому создаём новое состояние, которое по дефолту принимает пустой массив
  const [comments, setComments] = useState([]);
  const [fetchPostById, isLoading, error] = useFetching(async (id) => {
    const response = await PostService.getById(id);
    setPost(response.data);
  });
  const [fetchComments, isComLoading, comError] = useFetching(async (id) => {
    // Вызываем функцию
    const response = await PostService.getCommentsByPostId(id);
    // И после того, как мы получим комментарии от сервера, мы сетим их в состояние
    setComments(response.data);
  });
  useEffect(() => {
    fetchPostById(params.id);
    // И в useEffect вызываем функцию для получения комментариев, и аргументом передаём туда id поста
    fetchComments(params.id);
  }, []);
  return (
    <div>
      <h1>Post №{params.id} page</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {post.id}. {post.title}
        </div>
      )}
      <h1>Комментарии</h1>
      {/*Остаётся эти комментарии отрисовать*/}
      {/*Если они ещё грузятся, то будем отрисовывать компонент Loader, если всё загрузилось то будем отрисовывать какую-то структуру*/}
      {isComLoading ? (
        <Loader />
      ) : (
        <div>
          {comments.map((comm) => (
            // Просто вставим email пользователя, а под ним его комментарий
            <div style={{ marginTop: 15 }}>
              <h5>{comm.email}</h5>
              <div>{comm.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default PostIdPage;
