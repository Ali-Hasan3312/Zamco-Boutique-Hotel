import { VscSearch } from "react-icons/vsc";
import AdminSideBar from "../components/AdminSidebar";
import { useTable, Column } from "react-table";
import { ReactElement, useEffect, useId, useMemo, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";
import { FadeUp } from "../utils/animation";

interface DataType {
  id: string;
  name: string;
  mobile: string;
  email: string;
  message: string;
  date: string;
  action: ReactElement;
}

interface PopupDataType {
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  userMessage: string;
  createdAt: string;
}

const Emails = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupData, setPopupData] = useState<PopupDataType | null>(null);
  const uniqueId = useId()

  const fetchAllMails = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/contact/getAll`, {
        withCredentials: true,
      });

     

      if (res && res.data) {
        const mails = res.data.mails.map((i: any) => {
          const id = i._id;
          const name = i?.name || "N/A";
          const mobile = i?.phoneNumber || "N/A";
          const email = i?.email || "N/A";
          const message = i?.userMessage?.length > 50 
            ? `${i.userMessage.substring(0, 50)}...` 
            : i?.userMessage || "No message";

          return {
            id,
            name,
            mobile,
            email,
            message,
            date: i?.createdAt ? new Date(i.createdAt).toLocaleDateString() : "Unknown date",
            action: (
              <div className="flex gap-2 justify-center">
                <button 
                  onClick={() => handleViewClick(i)}
                  className="bg-blue-300 hover:bg-inherit hover:text-black hover:transition-all p-1 rounded-lg text-blue-700">
                  View
                </button>
                <button 
                  onClick={() => handleDelete(i._id)}
                  className="bg-red-300 hover:bg-inherit hover:text-black hover:transition-all p-1 rounded-lg text-red-700">
                  Delete
                </button>
              </div>
            ),
          };
        });

        setData(mails);
      } else {
        console.error("Unexpected response format:", res);
        toast.error("Unexpected response format.");
      }
    } catch (error: any) {
      console.error("Error fetching mails:", error);
      toast.error(error.response?.data?.message || "An error occurred while fetching emails.");
    }
  };

  useEffect(() => {
    fetchAllMails();
  }, []);

  const handleViewClick = (mail: PopupDataType) => {
    setPopupData(mail);
    setShowPopup(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER}/api/v1/contact/delete/${id}`, {
        withCredentials: true,
      });
      
      fetchAllMails();
      toast.success("Email deleted successfully!");
    } catch (error: any) {
      console.error("Error deleting mail:", error);
      toast.error(error.response?.data?.message || "An error occurred while deleting the email.");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setPopupData(null);
  };

  const columns: Column<DataType>[] = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
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
        Header: "Message",
        accessor: "message",
        Cell: ({ cell: { value } }) => (
          <div className="text-center">
            {value.length > 50 ? `${value.substring(0, 50)}...` : value}
          </div>
        ),
      },
      {
        Header: "Date",
        accessor: "date",
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

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div className="h-screen w-full bg-custom-dashboard grid grid-cols-[20%_80%] lg:grid-cols-[20%_80%] sm:grid-cols-[1fr] gap-4 overflow-hidden">
      <AdminSideBar />
      <div className="overflow-y-auto -ml-4">
        <div className="h-[350px] w-full relative bg-custom-blue">
          <div className="absolute top-2 left-4 flex items-center gap-28">
            <span className="text-white text-xl">Zamco Boutique Hotel</span>
            <div className="h-12 w-64 bg-white rounded-md flex items-center justify-between px-4 font-normal">
              <input
                type="text"
                placeholder="Search"
                className="h-full placeholder:text-gray-500 w-[80%] rounded-md outline-none"
              />
              <VscSearch className="z-10" />
            </div>
          </div>
          <div className="text-white relative top-20 text-3xl font-semibold left-4">
            My Mails
          </div>
          <motion.div
           variants={FadeUp(0.3)}
           initial="hidden"
           whileInView={"visible"}
          className="p-4 mt-28">
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
                {rows.map((row,rowIndex) => {
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
      {showPopup && popupData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center z-30 justify-center">
          <motion.div
           initial={{opacity: 0, scale: 0.5}}
           whileInView={{opacity: 1, scale: 1}}
           transition={{type: "spring", stiffness: 100, delay: 0.3}}
           className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Mail Details</h2>
            <p><strong>Name:</strong> {popupData.name}</p>
            <p><strong>Mobile:</strong> {popupData.phoneNumber}</p>
            <p><strong>Email:</strong> {popupData.email}</p>
            <p><strong>Message:</strong> {popupData.userMessage}</p>
            <p><strong>Date:</strong> {new Date(popupData.createdAt).toLocaleDateString()}</p>
            <button 
              onClick={closePopup} 
              className="mt-4 bg-blue-500 text-white py-2 px-4 ml-32 rounded">
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Emails;
