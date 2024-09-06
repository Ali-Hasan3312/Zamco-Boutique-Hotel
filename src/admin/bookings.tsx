import { VscSearch } from "react-icons/vsc";
import AdminSideBar from "../components/AdminSidebar";
import { ReactElement, useEffect, useId, useMemo, useState } from "react";
import { useTable, Column } from 'react-table';
import axios from "axios";
import toast from "react-hot-toast";
import { FadeUp } from "../utils/animation";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface DataType {
  _id: string;
  name: string;
  phoneNumber: string;
  email: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  paymentStatus: string;
  action: ReactElement;
}

const Bookings = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<DataType | null>(null);
  const uniqueId = useId()

  const fetchAllRooms = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_SERVER}/api/v1/book/getAll`, {
        withCredentials: true,
      });
      if (res.data && res.data.booking) {
        const bookings = res.data.booking.map((booking: any) => ({
          id: booking._id,
          name: booking.name,
          phoneNumber: booking.phoneNumber,
          email: booking.email,
          checkIn: new Date(booking.checkIn).toLocaleDateString(),
          checkOut: new Date(booking.checkOut).toLocaleDateString(),
          roomType: booking.roomType,
          paymentStatus: booking.paymentStatus,
          action: (
            <div className="flex gap-2 justify-center">
              <button 
                onClick={() => handleManageClick(booking)}
                className='bg-blue-300 hover:bg-inherit hover:text-black hover:transition-all p-1 rounded-lg text-blue-700'>
                Manage
              </button>
              <button 
                onClick={() => handleDelete(booking._id)}
                className='bg-red-300 hover:bg-inherit hover:text-black hover:transition-all p-1 rounded-lg text-red-700'>
                Delete
              </button>
            </div>
          ),
        }));
        setData(bookings);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error fetching bookings');
    }
  };

  useEffect(() => {
    fetchAllRooms();
  }, []);

  const handleManageClick = (booking: DataType) => {
    setSelectedBooking(booking);
    setShowPopup(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER}/api/v1/book/deleteBooking/${id}`, {
        withCredentials: true,
      });
      toast.success("Booking deleted successfully!");
      fetchAllRooms();  // Re-fetch all bookings after deletion
    } catch (error: any) {
      console.error("Error deleting booking:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "An error occurred while deleting the booking.");
    }
  };

  const handleProcessPayment = async (id: string) => {
    try {
      console.log("Processing Payment for ID:", id);

      await axios.put(
        `${import.meta.env.VITE_SERVER}/api/v1/book/updatePayment/${id}`,
        { paymentStatus: "Paid" },
        { withCredentials: true }
      );
      
      toast.success("Payment processed successfully!");
      setShowPopup(false);
      fetchAllRooms();  // Re-fetch all bookings after payment is processed
    } catch (error: any) {
      console.error("Error processing payment:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "An error occurred while processing the payment.");
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedBooking(null);
  };

  const columns: Column<DataType>[] = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Mobile',
        accessor: 'phoneNumber',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Arrive',
        accessor: 'checkIn',
      },
      {
        Header: 'Depart',
        accessor: 'checkOut',
      },
      {
        Header: 'Room Type',
        accessor: 'roomType',
      },
      {
        Header: 'Payment',
        accessor: 'paymentStatus',
        Cell: ({ cell: { value } }) => (
          <div className={`text-center ${value === "Unpaid" ? "text-red-500" : "text-green-500"}`}>
            {value}
          </div>
        ),
      },
      {
        Header: 'Action',
        accessor: 'action',
      },
    ],
    []
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
            <span className="text-white text-2xl">Zamco Boutique Hotel</span>
            <div className="h-12 w-64 bg-white rounded-md flex items-center justify-between px-4 font-normal">
              <input
                type="text"
                placeholder="Search"
                className="h-full placeholder:text-gray-500 w-[80%] rounded-md outline-none"
              />
              <VscSearch className="z-20" />
            </div>
          </div>
          <div className="flex items-center justify-between">
         <div className="text-white relative top-20 text-3xl font-semibold left-4">
            My Bookings
          </div>
          <div className="h-14 w-[330px] relative top-20 right-8 text-white text-[18px] rounded-lg bg-black/30 flex items-center justify-center gap-3">
          <Link to={"/"}>Home</Link>
          <div className="h-1 w-1 bg-white rounded-full"></div>
          <Link to={"/admin/dashboard"}>Dashboard</Link>
          <div className="h-1 w-1 bg-white rounded-full"></div>
          <span>Bookings</span>
         
          </div>
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

      {showPopup && selectedBooking && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center z-30 justify-center">
          <motion.div
           initial={{opacity: 0, scale: 0.5}}
           whileInView={{opacity: 1, scale: 1}}
           transition={{type: "spring", stiffness: 100, delay: 0.3}}
           className="bg-white p-8 rounded-lg shadow-lg w-[400px]">
            <h2 className="text-xl font-semibold mb-4">Manage Booking</h2>
            <p><strong>Name:</strong> {selectedBooking.name}</p>
            <p><strong>Mobile:</strong> {selectedBooking.phoneNumber}</p>
            <p><strong>Email:</strong> {selectedBooking.email}</p>
            <p><strong>Arrive:</strong> {new Date(selectedBooking.checkIn).toLocaleDateString()}</p>
            <p><strong>Depart:</strong> {new Date(selectedBooking.checkOut).toLocaleDateString()}</p>
            <p><strong>Room Type:</strong> {selectedBooking.roomType}</p>
            <p><strong>Payment Status:</strong> {selectedBooking.paymentStatus}</p>
            {selectedBooking.paymentStatus === "Unpaid" && (
              <button 
                onClick={() => handleProcessPayment(selectedBooking._id)} 
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded">
                Process Payment
              </button>
            )}
            <button
              onClick={closePopup} 
              className="mt-4 bg-gray-500 text-white py-2 px-4 rounded ml-2">
              Close
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Bookings;
