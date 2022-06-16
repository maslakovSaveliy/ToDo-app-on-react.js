import React, { useState, useMemo, useEffect } from "react";
import PostFilter from "./components/PostFilter";
import PostForm from "./components/PostForm";
import PostList from "./components/PostList";
import MyInput from "./components/UI/input/MyInput";
import MySelect from "./components/UI/select/MySelect";
import "./styles/App.css";
import MyModal from "./components/UI/MyModal/MyModal";
import MyButton from "./components/UI/button/MyButton";
import { usePosts } from "./hooks/usePosts";
import PostService from "./API/PostService";
import Loader from "./components/UI/Loader/Loader";
// Импортируем наш новый кастомный хук
import { useFetching } from "./hooks/useFetching";
function App() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  // Теперь мы можем удалить состояние isPostsLoading
  // Сразу же воспользуемся нашим новым хуком
  // Деструктуризируем принимаемые нами функцию, состояние загрузки постов и ошибку
  // Потом вызываем useFetching и внутрь него передаём колбек
  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    // Внутри нашего передаваемого колбека мы реализовываем функционал, который у нас уже был в функции fetchPosts, которую можно также удалять
    const posts = await PostService.getAll();
    setPosts(posts);
  });
  useEffect(() => {
    fetchPosts();
  }, []);
  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };
  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id));
  };
  return (
    <div className="App">
      <MyButton style={{ marginTop: "30px" }} onClick={() => setModal(true)}>
        Создать пост
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <hr style={{ margin: "15px 0" }} />
      <PostFilter filter={filter} setFilter={setFilter} />
      {/*Сразу же обрабатываем некоторую ошибку*/}
      {/*Если у нас в postError что-то есть, то будем выводить следующий заголовок*/}
      {postError && <h1>Произошла ошибка ${postError}</h1>}
      {isPostsLoading ? (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 50 }}
        >
          <Loader />
        </div>
      ) : (
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title={"Список постов 1"}
        />
      )}
    </div>
  );
}
export default App;
