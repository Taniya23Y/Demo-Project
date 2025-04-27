import React, { FC, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { useTheme } from "next-themes";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import { toast } from "react-toastify";
import LoaderOne from "../../Loader/LoaderOne";
import { styles } from "@/app/styles/style";
import { MdMarkEmailRead } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";

type Props = {
  isTeam: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme, setTheme } = useTheme();
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [userId, setUserId] = useState("");
  const [open, setOpen] = useState(false);
  const [updateUserRole, { isSuccess, error: roleError }] =
    useUpdateUserRoleMutation();
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteUserError }] =
    useDeleteUserMutation({});
  const { isLoading, data, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );

  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success("User role updated successfully");
      setActive(false);
    }
    if (roleError) {
      if ("data" in roleError) {
        const errorMessage = roleError as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (deleteSuccess) {
      refetch();
      toast.success("User delete successfully");
      setOpen(false);
    }
    if (deleteUserError) {
      if ("data" in deleteUserError) {
        const errorMessage = deleteUserError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, roleError, deleteSuccess, deleteUserError, refetch]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.7 },
    { field: "role", headerName: "Role", flex: 0.3 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
    { field: "createdAt", headerName: "Joined At", flex: 0.4 },
    {
      field: " ",
      headerName: "Delete",
      flex: 0.3,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open), setUserId(params.row.id);
              }}
            >
              <AiOutlineDelete size={20} className={"text-red-500"} />
            </Button>
          </>
        );
      },
    },
    {
      field: "  ",
      headerName: "Send-mail",
      flex: 0.3,
      renderCell: (params: any) => {
        return (
          <>
            <button>
              <a href={`mailto:${params.row.email}`}>
                <MdMarkEmailRead size={20} className={"text-emerald-500"} />
              </a>
            </button>
          </>
        );
      },
    },
  ];
  const rows: any = [];
  if (isTeam) {
    const admins =
      data && data.users.filter((item: any) => item.role === "admin");

    admins &&
      admins.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          createdAt: format(item.createdAt),
        });
      });
  } else {
    data &&
      data.users.forEach((item: any) => {
        rows.push({
          id: item._id,
          name: item.name,
          email: item.email,
          role: item.role,
          courses: item.courses.length,
          createdAt: format(item.createdAt),
        });
      });
  }
  const handleSubmit = async () => {
    await updateUserRole({ email, role });
  };
  const handleDeleteUser = async () => {
    const id = userId;
    await deleteUser(id);
  };

  return (
    <div className="mt-[120px] ml-7">
      {isLoading ? (
        <LoaderOne />
      ) : (
        <Box m="20px">
          {isTeam && (
            <div className="w-full flex justify-end">
              <div
                className={`!w-[160px] bg-purple-400 p-2 text-center rounded-lg cursor-pointer font-bold`}
                onClick={() => setActive(!active)}
              >
                Add New Member
              </div>
            </div>
          )}
          <Box
            m="40px 0 0 0"
            height="80vh"
            borderRadius={20}
            sx={{
              "& MuiDataGrid-root": {
                border: "none",
                outline: "none",
              },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: "#871d05",
              },
              "& .MuiDataGrid-row": {
                color: "#fff",
                borderBottom: "1px solid #ffffff30 !important",
              },
              "& .MuiTablePagination-root": {
                color: "#fff",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: "#fff",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#242527",
                borderBottom: "none",
                color: "#000",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: "#070808",
              },
              "& .MuiDataGrid-footerContainer": {
                color: "#fff",
                borderTop: "none",
                backgroundColor: "#242527",
              },
              "& .MuiCheckbox-root": {
                color: `#d2e02f !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#fff !important`,
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>
          {active && (
            <Modal
              open={active}
              onClose={() => setActive(!active)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className=" absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <h1 className={styles.title}>Add new Member</h1>
                <div className="mt-4">
                  <input
                    type="email"
                    placeholder="Enter Email.."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={styles.inputs}
                  />
                  <br />
                  <br />
                  <p className={styles.label}>Select the Role</p>
                  <select
                    name=""
                    id=""
                    className={styles.inputs}
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option
                      value="admin"
                      className=" dark:bg-[#2b2323] bg-white"
                    >
                      Admin
                    </option>
                    <option
                      value="user"
                      className=" dark:bg-[#2b2323] bg-white"
                    >
                      User
                    </option>
                  </select>
                  <br />
                  <div
                    className={`${styles.btnOnly}`}
                    onClick={() => handleSubmit()}
                  >
                    Submit
                  </div>
                </div>
              </Box>
            </Modal>
          )}
          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className=" absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                <h1 className={styles.title}>
                  Are you sure you want to delete this user?
                </h1>
                <div className=" mt-4 mb-6 flex w-full justify-around items-center">
                  <div
                    className={`${styles.btnOnly} !w-[120px] !bg-[#62cb5b]`}
                    onClick={() => setOpen(!open)}
                  >
                    Cancel
                  </div>
                  <div
                    className={`${styles.btnOnly} !w-[120px] !bg-[#e34141]`}
                    onClick={() => handleDeleteUser()}
                  >
                    Delete
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
