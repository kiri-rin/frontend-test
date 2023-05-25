import { useMutation, useQuery, useQueryClient } from "react-query";
import React, { useState } from "react";
import { api } from "../../../api";
import {
  CButton,
  CContainer,
  CPagination,
  CSpinner,
  CTable,
  CTableBody,
  CTableHeaderCell,
  CTableRow,
} from "@coreui/react";
import { Pagination } from "../../../components/Pagination";
import { format } from "date-fns";
import { UserItem } from "../../../api/models/Users";
const columns = [
  {
    key: "id",
    label: "#",
  },
  {
    key: "name",
    label: "Name",
  },
  {
    key: "role",
    label: "Role",
  },
  {
    key: "ctime",
    label: "Date",
  },
  {
    key: "options",
    label: "Options",
  },
];
export const UsersList = () => {
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const queryClient = useQueryClient();
  const { isLoading, error, data, isPreviousData, refetch } = useQuery({
    queryKey: ["users", page],
    keepPreviousData: true,
    queryFn: () =>
      api.users
        .get({
          params: {
            limit: limit,
            offset: page * limit,
          },
        })
        .then(({ data: _data }) => _data),
  });
  const { mutate: deleteUser } = useMutation<any, any, number>(
    {
      //@ts-ignore
      mutationKey: ["users"],
      mutationFn: (id: number) => {
        queryClient.setQueriesData("users", {
          ...data,
          items: data?.items.filter((it) => it.id !== id),
        });
      },
    },
    {}
  );
  console.log(isLoading, "LOADING USERS");

  return (
    <CContainer className={"main__row-inner"}>
      <CTable
        columns={columns}
        items={
          data?.items?.map((it) => ({
            ...it,
            ctime: format(Number(it.ctime), "dd.MM.yyyy HH:mm"),
            options: (
              <CButton onClick={() => deleteUser(it.id)}>Удалить</CButton>
            ),
          })) || []
        }
      >
        {(isLoading || isPreviousData) && (
          <div className={"main__loading-hover"}>
            <CSpinner />
          </div>
        )}
      </CTable>
      <Pagination
        totalPages={data ? Math.ceil(data.total / data.per_page) : 1}
        page={page}
        onChangePage={(value) => setPage(value)}
      />
    </CContainer>
  );
};
const UserRow = ({ user }: { user: UserItem }) => {
  return <CTableRow></CTableRow>;
};
