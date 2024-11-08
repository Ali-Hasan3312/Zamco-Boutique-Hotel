import { VscSearch } from "react-icons/vsc";
import AdminSideBar from "../components/AdminSidebar";
import { useTable, Column } from "react-table";
import { ChangeEvent, ReactElement, useContext, useEffect, useId, useMemo, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";
import { FadeUp } from "../utils/animation";
import { Link } from "react-router-dom";
import userProfile from "../assets/Profile.png"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { Context } from "../main";
interface DataType {
  id: string;
  image: string;
  name: string;
  designation: string;
  mobile: string;
  email: string;
  address: string;
  joiningDate: string;
  action: ReactElement;
}
const Staff = () => {
  const {user} = useContext(Context)
  const [data, setData] = useState<DataType[]>([]);
  const [showModal, setShowModal] = useState(false); 
  const [photo, setPhoto] = useState<File | string>(userProfile);
  const [newStaff, setNewStaff] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    designation: "",
    address: "",
    dateofBirth: "",
    image: "",
  });

  const uniqueId = useId();

  const fetchAllStaff = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/staff/getAll`, {
        withCredentials: true,
      }); 
      const staffData = Array.isArray(res.data.users) ? res.data.users : [];
      if (staffData.length > 0) {
        const staff = staffData.map((i: any) => {
          const id = i._id;
          const image = i?.photo || "N/A"; // Ensure your API returns the image URL or path
          const name = i?.name || "N/A";
          const designation = i?.designation || "N/A";
          const mobile = i?.mobile || "N/A";
          const email = i?.email || "N/A";
          const address = i?.address || "N/A";
          const joiningDate = i?.joiningDate
            ? new Date(i.joiningDate).toLocaleDateString()
            : "Unknown date";

          return {
            id,
            image,
            name,
            designation,
            mobile,
            email,
            address,
            joiningDate,
            action: (
              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => handleDelete(i._id)}
                  className="bg-red-300 hover:bg-inherit hover:text-black hover:transition-all p-1 rounded-lg text-red-700"
                >
                  Delete
                </button>
              </div>
            ),
          };
        });

        setData(staff);
      } else {
        console.error("Unexpected response format:", res);
        toast.error("Unexpected response format.");
      }
    } catch (error: any) {
      console.error("Error fetching staff:", error);
      toast.error(error.response?.data?.message || "An error occurred while fetching staff.");
    }
  };
  useEffect(() => {
    fetchAllStaff();
  }, []);

  const handleDelete = async (id: string) => {
    console.log(user?.designation);
    
    if(user?.designation=="Admin")
    {

      try {
        await axios.delete(`${import.meta.env.VITE_SERVER}/api/v1/staff/delete/${id}`, {
          withCredentials: true,
  
        });
        
        fetchAllStaff(); 
        toast.success("Member deleted successfully!");
      } catch (error: any) {
        toast.error(error.response?.data?.message || "An error occurred while deleting the member.");
      }
    }
    if(user?.designation!="Admin")
    {
      toast.error("You are not authorized to delete members!");
      return;
    }
  };
 
  const handleCreateStaff = async () => {
    try {
     const userCredentials = await createUserWithEmailAndPassword(auth, newStaff.email, newStaff.password)
      const formData = new FormData();
      if(userCredentials){
        formData.append("_id", userCredentials.user.uid);
        formData.append("name", newStaff.name);
        formData.append("email", newStaff.email);
        formData.append("mobile", newStaff.mobile);
        formData.append("address", newStaff.address);
        formData.append("dateOfBirth", newStaff.dateofBirth);
        formData.append("photo", photo || "");
      }
      await axios.post(`${import.meta.env.VITE_SERVER}/api/v1/staff/new`, formData, {
        withCredentials: true,
      });
      setShowModal(false);
      fetchAllStaff(); 
      toast.success("New staff member created successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred while creating staff.");
    }
  };

  const columns: Column<DataType>[] = useMemo(
    () => [
      {
        Header: "Image",
        accessor: "image",
        Cell: ({ cell: { value } }) => <div className="text-center"><img src={value} alt="staff" className="w-12 h-12 rounded-full"/></div>,
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ cell: { value } }) => <div className="text-center">{value}</div>,
      },
      {
        Header: "Designation",
        accessor: "designation",
        Cell: ({ cell: { value } }) => <div className="text-center">{value}</div>,
      },
      {
        Header: "Mobile",
        accessor: "mobile",
        Cell: ({ cell: { value } }) => <div className="text-center">{value}</div>,
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: ({ cell: { value } }) => <div className="text-center">{value}</div>,
      },
      {
        Header: "Address",
        accessor: "address",
        Cell: ({ cell: { value } }) => <div className="text-center">{value}</div>,
      },
      {
        Header: "Joining Date",
        accessor: "joiningDate",
        Cell: ({ cell: { value } }) => <div className="text-center">{value}</div>,
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ cell: { value } }) => (
          <div className="flex justify-center items-center">{value}</div>
        ),
      },
    ],
    [data]
  );
  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div className="h-screen w-full bg-custom-dashboard grid grid-cols-[20%_80%] lg:grid-cols-[20%_80%] sm:grid-cols-[1fr] gap-4 overflow-hidden">
      <AdminSideBar />
      <div className="overflow-y-auto -ml-4">
        <div className="h-[350px] w-full relative bg-custom-blue">
        <div className="absolute lg:top-4 sm:top-8 lg:left-8 sm:left-32 flex items-center gap-28">
            <span className="text-white lg:text-2xl sm:text-3xl text-nowrap">Zamco Boutique Hotel</span>
            <div className="h-12 w-64 bg-white rounded-md flex lg:ml-0 sm:ml-32 items-center justify-between px-4 font-normal">
              <input
                type="text"
                placeholder="Search"
                className="h-full placeholder:text-gray-500 w-[80%] rounded-md outline-none"
              />
              <VscSearch className="" />
            </div>
          </div>
          <div className="flex items-center justify-between">
          <div className="text-white relative lg:top-20 sm:top-28 text-3xl font-semibold lg:left-4 sm:left-32">
          Staff
            </div>
            <div className="h-14 w-[330px] relative lg:top-20 sm:top-28 right-8 text-white text-[18px] rounded-lg bg-black/30 flex items-center justify-center gap-3">
            <Link to={"/"}>Home</Link>
              <div className="h-1 w-1 bg-white rounded-full"></div>
              <Link to={"/admin/dashboard"}>Dashboard</Link>
              <div className="h-1 w-1 bg-white rounded-full"></div>
              <span>Staff</span>
            </div>
          </div>
         {user?.designation==="Admin"&&
          <button
            className="relative lg:top-28 sm:top-32 hover:opacity-85 lg:left-4 sm:left-28 h-10 w-28 rounded-lg bg-red-600 text-white"
            onClick={() => setShowModal(true)} // Show modal on click
          >
            Create Staff
          </button>}
          <motion.div
            variants={FadeUp(0.3)}
            initial="hidden"
            whileInView={"visible"}
            className="p-4 lg:mt-32 sm:mt-40 lg:ml-0 sm:ml-24"
          >
            <table {...getTableProps()} className="w-[95%] bg-white border">
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()} key={uniqueId}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()} key={column.id} className="border p-2 text-center">
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row, rowIndex) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()} key={rowIndex}>
                      {row.cells.map((cell, cellIndex) => (
                        <td {...cell.getCellProps()} key={cellIndex} className="border p-2 text-center">
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        </div>
      </div>

      {/* Modal for creating new staff */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <motion.div
           initial={{opacity: 0, scale: 0.5}}
           whileInView={{opacity: 1, scale: 1}}
           transition={{type: "spring", stiffness: 100, delay: 0.3}}
          className="bg-white p-6 rounded-lg w-[550px] z-50">
            <h2 className="text-2xl font-semibold mb-4">Create New Staff</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleCreateStaff();
              }}
            >
              <label className="block mb-2">
                Name:
                <input
                  type="text"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </label>
              <label className="block mb-2">
                Email:
                <input
                  type="email"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({ ...newStaff, email: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </label>
              <label className="block mb-2">
                Password:
                <input
                  type="password"
                  value={newStaff.password}
                  onChange={(e) => setNewStaff({ ...newStaff, password: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </label>
              <label className="block mb-2">
                Mobile:
                <input
                  type="text"
                  value={newStaff.mobile}
                  onChange={(e) => setNewStaff({ ...newStaff, mobile: e.target.value })}
                  className="w-full p-2 border rounded"
                  required
                />
              </label>
             
              <label className="block mb-2">
                Address:
                <input
                  type="text"
                  value={newStaff.address}
                  onChange={(e) => setNewStaff({ ...newStaff, address: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </label>
              <label className="block mb-2">
                Date of Birth:
                <input
                  type="date"
                  value={newStaff.dateofBirth}
                  onChange={(e) => setNewStaff({ ...newStaff, dateofBirth: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </label>
              <label className="block mb-4">
                Image
                <input
                  type="file"
                  onChange={handlePhotoChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </label>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Create Staff
              </button>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded ml-2"
              >
                Cancel
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Staff;
