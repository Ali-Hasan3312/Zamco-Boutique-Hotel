import { VscSearch } from "react-icons/vsc";
import AdminSideBar from "../components/AdminSidebar";
import { useTable, Column } from "react-table";
import { ReactElement, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { motion } from "framer-motion";
import { FadeUp } from "../utils/animation";
interface DataType {
  name: string;
  mobile: string;
  email: string;
  message: string;
  date: string;  // I'll change Date to string for formatting
  action: ReactElement;
}

const Emails = () => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchAllMails = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/contact/getAll`, {
          withCredentials: true,
        });
        if (res.data) {
          console.log(res.data);
          const mails = res.data.mails.map((i: any) => ({
            name: i.name,
            mobile: i.phoneNumber,
            email: i.email,
            message: i.userMessage,
            date: new Date(i.date).toLocaleDateString(),
            action: (
              <button className="bg-blue-300 hover:bg-inherit hover:text-black hover:transition-all p-1 rounded-lg text-blue-700">
                View
              </button>
            ),
          }));
          setData(mails);
        }
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    };

    fetchAllMails();
  }, []);

  const columns: Column<DataType>[] = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name" as const,
      },
      {
        Header: "Mobile",
        accessor: "mobile" as const,
      },
      {
        Header: "Email",
        accessor: "email" as const,
      },
      {
        Header: "Message",
        accessor: "message" as const,
      },
      {
        Header: "Date",
        accessor: "date" as const,
      },
      {
        Header: "Action",
        accessor: "action" as const,
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <div className="h-screen w-full bg-custom-dashboard grid grid-cols-[20%_80%] gap-4 overflow-hidden">
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
              <VscSearch className="z-20" />
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
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()} className="border p-2">
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()} className="border p-2">
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
    </div>
  );
};

export default Emails;
