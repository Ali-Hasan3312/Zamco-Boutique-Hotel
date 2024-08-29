import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { VscSearch } from "react-icons/vsc";
import { Column, useTable } from "react-table";
import AdminSideBar from "../components/AdminSidebar";
import { FadeUp } from "../utils/animation";
import { motion } from "framer-motion";
interface DataType {
  guest: string;
  roomPrice: number;
  discount: number;
  rooms: number;
  amount: string;
  status: "unpaid" | "paid";
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Guest",
    accessor: "guest",
    Cell: ({ cell: { value } }) => (
      <div className="text-center">{value}</div>
    ),
  },
  {
    Header: "Amount",
    accessor: "amount",
    Cell: ({ cell: { value } }) => (
      <div className="text-center">${value}</div>
    ),
  },
  {
    Header: "Discount",
    accessor: "discount",
    Cell: ({ cell: { value } }) => (
      <div className="text-center">{value}%</div>
    ),
  },
  {
    Header: "Rooms",
    accessor: "rooms",
    Cell: ({ cell: { value } }) => (
      <div className="text-center">{value}</div>
    ),
  },
  {
    Header: "Status",
    accessor: "status",
    Cell: ({ cell: { value } }) => (
      <div className="text-center capitalize text-red-500">{value}</div>
    ),
  },
  {
    Header: "Action",
    accessor: "action",
    Cell: ({ cell: { value } }) => (
      <div className="flex justify-center items-center">{value}</div>
    ),
  },
];

const Transactions = () => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/book/getAll`, {
          withCredentials: true,
        });
        if (res.data) {
          const transactions = res.data.booking.map((i: any) => ({
            guest: i.name,
            amount: i.roomPrice,  // Ensure roomPrice is a number
            discount: i.discount,
            rooms: i.rooms,
            status: "unpaid",
            action: (
              <button className="bg-blue-300 hover:bg-inherit hover:text-black hover:transition-all p-1 rounded-lg text-blue-700">
                Manage
              </button>
            ),
          }));
          setData(transactions);
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Error fetching transactions");
      }
    };

    fetchTransactions();
  }, []);

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
            My Transactions
          </div>
        </div>
        <motion.div
           variants={FadeUp(0.3)}
           initial="hidden"
           whileInView={"visible"}
        className="p-4 relative -top-52">
          <table {...getTableProps()} className="min-w-full bg-white border rounded-md">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()} className="border p-2 text-center">
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
                      <td {...cell.getCellProps()} className="border p-2 text-center">
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
  );
};

export default Transactions;
