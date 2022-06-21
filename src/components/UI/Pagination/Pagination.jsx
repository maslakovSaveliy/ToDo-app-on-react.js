import React from "react";
import MyButton from "../button/MyButton";
import { usePagination } from "../../../hooks/usePagination";
const Pagination = ({ totalPages, page, changePage }) => {
  let pagesArray = usePagination(totalPages);
  return (
    <div>
      {pagesArray.map((p) => (
        <MyButton
          style={
            page === p
              ? {
                  marginRight: 10,
                  border: "2px solid orange",
                  fontWeight: "bold",
                }
              : { marginRight: 10 }
          }
          onClick={() => {
            changePage(p);
          }}
          key={p}
        >
          {p}
        </MyButton>
      ))}
    </div>
  );
};
export default Pagination;
