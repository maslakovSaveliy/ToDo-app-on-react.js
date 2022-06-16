import React from "react";
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";
const PostFilter = ({ filter, setFilter }) => {
  // Важно правильно реализовать двустороннее связывание, всё делаем по старой схеме, разворачиваем старый объект и заменяем там нужное нам
  return (
    <div>
      <MyInput
        placeholder="Поиск..."
        value={filter.query}
        // В случае инпута заменяем query
        onChange={(e) => setFilter({ ...filter, query: e.target.value })}
      />
      <MySelect
        value={filter.sort}
        // В случае инпута заменяем sort
        // Напомню, что select возвращает не ивент, а уже выбранный алгоритм сортировки, поэтому достаточно сделать вот так:
        onChange={(selectedSort) =>
          setFilter({ ...filter, sort: selectedSort })
        }
        defaultValue="Сортировка"
        options={[
          { value: "title", name: "По заголовку" },
          { value: "body", name: "По описанию" },
        ]}
      />
    </div>
  );
};
export default PostFilter;
