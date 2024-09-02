import axios from "axios";
import { ReactElement, useEffect, useId, useState } from "react";
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
  status: string;
  action: ReactElement;
}
interface DataType2 {
  name: string;
  roomPrice: number;
  discount: number;
  rooms: number;
  paymentStatus: string;
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
      <div className={`text-center capitalize ${value === "Unpaid" ? "text-red-500" : "text-green-500"}`}>{value}</div>
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
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<DataType | null>(null);
  const uniqueId = useId()
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/book/getAll`, {
          withCredentials: true,
        });
        if (res.data) {
          const transactions = res.data.booking.map((i: DataType2) => ({
            guest: i.name,
            amount: i.roomPrice.toString(),
            discount: i.discount,
            rooms: i.rooms,
            status: i.paymentStatus,
            action: (
              <button
                onClick={() => handleViewClick({
                  guest: i.name,
                  amount: i.roomPrice.toString(),
                  roomPrice: i.roomPrice, // Pass roomPrice here as well
                  discount: i.discount,
                  rooms: i.rooms,
                  status: i.paymentStatus,
                  action: <></>
                })}
                className="bg-blue-300 hover:bg-inherit hover:text-black hover:transition-all p-1 rounded-lg text-blue-700"
              >
                View
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
  const handleViewClick = (transaction: DataType) => {
    setSelectedTransaction(transaction);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedTransaction(null);
  };

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
       {/* Popup for viewing transaction details */}
       {isPopupOpen && selectedTransaction && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">Transaction Details</h2>
            <div className="mb-4">
              <strong>Guest:</strong> {selectedTransaction.guest}
            </div>
            <div className="mb-4">
              <strong>Amount:</strong> ${selectedTransaction.amount}
            </div>
            <div className="mb-4">
              <strong>Discount:</strong> {selectedTransaction.discount}%
            </div>
            <div className="mb-4">
              <strong>Rooms:</strong> {selectedTransaction.rooms}
            </div>
            <div className="mb-4">
              <strong>Status:</strong> {selectedTransaction.status}
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleClosePopup}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Transactions;
