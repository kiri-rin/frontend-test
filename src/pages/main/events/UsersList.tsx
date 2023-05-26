import { useMutation, useQuery, useQueryClient } from "react-query";
import React, { useState } from "react";
import { api } from "../../../api";
import { CButton, CContainer, CSpinner, CTable } from "@coreui/react";
import { Pagination } from "../../../components/Pagination";
import { formatCtime } from "../../../utils/ctime";
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

  return (
    <CContainer className={"main__row-inner"}>
      <CTable
        columns={columns}
        items={
          data?.items?.map((it) => ({
            ...it,
            ctime: formatCtime(it.ctime),
            options: (
              <CButton onClick={() => deleteUser(it.id)}>Удалить</CButton>
            ),
          })) || []
        }
      >
        {(isLoading || isPreviousData) && (
          <tbody className={"main__loading-hover"}>
            <tr>
              <td>
                <CSpinner />
              </td>
            </tr>
          </tbody>
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
