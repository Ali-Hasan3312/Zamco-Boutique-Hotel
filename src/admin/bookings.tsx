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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBooking, setCurrentBooking] = useState<DataType | null>(null);
  
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
                 onClick={() => {
                  setCurrentBooking(booking); // Set current booking
                  setIsModalOpen(true); // Open modal
                }}
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
        <div className="absolute lg:top-2 sm:top-8 lg:left-8 sm:left-32 flex items-center gap-28">
            <span className="text-white text-2xl">Zamco Boutique Hotel</span>
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
            My Bookings
          </div>
          <div className="h-14 w-[330px] relative lg:top-20 sm:top-28 right-8 text-white text-[18px] rounded-lg bg-black/30 flex items-center justify-center gap-3">
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
        className="p-4 relative lg:-top-52 sm:-top-40 lg:ml-0 sm:ml-16">
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
      {isModalOpen && currentBooking && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
    className="bg-white p-4 rounded-md w-[600px]">
      <h2 className="text-xl mb-4">Update Booking</h2>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const updatedBooking = {
              name: currentBooking.name,
              phoneNumber: currentBooking.phoneNumber,
              email: currentBooking.email,
              checkIn: currentBooking.checkIn,
              checkOut: currentBooking.checkOut,
              roomType: currentBooking.roomType,
              paymentStatus: currentBooking.paymentStatus,
            };
            await axios.put(`${import.meta.env.VITE_SERVER}/api/v1/book/update/${currentBooking._id}`, updatedBooking, {
              withCredentials: true,
            });
            toast.success("Booking updated successfully!");
            setIsModalOpen(false); // Close modal
            fetchAllRooms(); // Refresh the booking list
          } catch (error) {
            toast.error("Failed to update booking.");
            console.error(error);
          }
        }}
      >
        <div className="mb-2">
          <label className="block text-sm">Name</label>
          <input
            type="text"
            value={currentBooking.name}
            onChange={(e) => setCurrentBooking({ ...currentBooking, name: e.target.value })}
            className="border w-full p-2 rounded-md"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm">Phone Number</label>
          <input
            type="text"
            value={currentBooking.phoneNumber}
            onChange={(e) => setCurrentBooking({ ...currentBooking, phoneNumber: e.target.value })}
            className="border w-full p-2 rounded-md"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm">Email</label>
          <input
            type="email"
            value={currentBooking.email}
            onChange={(e) => setCurrentBooking({ ...currentBooking, email: e.target.value })}
            className="border w-full p-2 rounded-md"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm">Check-In Date</label>
          <input
            type="date"
            value={new Date(currentBooking.checkIn).toISOString().substring(0, 10)}
            onChange={(e) => setCurrentBooking({ ...currentBooking, checkIn: e.target.value })}
            className="border w-full p-2 rounded-md"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm">Check-Out Date</label>
          <input
            type="date"
            value={new Date(currentBooking.checkOut).toISOString().substring(0, 10)}
            onChange={(e) => setCurrentBooking({ ...currentBooking, checkOut: e.target.value })}
            className="border w-full p-2 rounded-md"
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm">Room Type</label>
          <input
            type="text"
            value={currentBooking.roomType}
            onChange={(e) => setCurrentBooking({ ...currentBooking, roomType: e.target.value })}
            className="border w-full p-2 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm">Payment Status</label>
          <select
          disabled={currentBooking.paymentStatus === "Paid"}
            value={currentBooking.paymentStatus}
            onChange={(e) => setCurrentBooking({ ...currentBooking, paymentStatus: e.target.value })}
            className="border w-full p-2 rounded-md"
          >
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-300 hover:bg-gray-400 p-2 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-md"
          >
            Save Changes
          </button>
        </div>
      </form>
    </motion.div>
  </div>
)}

     
    </div>
  );
}

export default Bookings;
