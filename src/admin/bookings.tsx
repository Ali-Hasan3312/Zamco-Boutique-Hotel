import { VscSearch } from "react-icons/vsc";
import AdminSideBar from "../components/AdminSidebar";
import { ReactElement, useEffect, useMemo, useState } from "react";
import { useTable, Column } from 'react-table';
import axios from "axios";
import toast from "react-hot-toast";
import { FadeUp } from "../utils/animation";
import { motion } from "framer-motion";
interface DataType {
  name: string;
  mobile: string;
  email: string;
  arrive: string;
  depart: string;
  roomType: string;  // Updated to be a string type
  payment: "PAID" | "UNPAID";
  action: ReactElement;
}

const Bookings = () => {
  const [data, setData] = useState<DataType[]>([]);

  useEffect(() => {
    const fetchAllRooms = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/v1/book/getAll`, {
          withCredentials: true,
        });
        if (res.data && res.data.booking) {
          console.log(res.data);
          
          const bookings = res.data.booking.map((booking: any) => ({
            name: booking.name,
            mobile: booking.phoneNumber,
            email: booking.email,
            arrive: new Date(booking.checkIn).toLocaleDateString(),
            depart: new Date(booking.checkOut).toLocaleDateString(),
            roomType: booking.roomType,  // Fixed to use the correct property
            payment: booking.paymentStatus === 'PAID' ? 'PAID' : 'UNPAID',
            action: (
              <button className='bg-blue-300 hover:bg-inherit hover:text-black hover:transition-all p-1 rounded-lg text-blue-700'>
                Manage
              </button>
            ),
          }));
          setData(bookings);
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || 'Error fetching bookings');
      }
    };

    fetchAllRooms();
  }, []);

  const columns: Column<DataType>[] = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Mobile',
        accessor: 'mobile',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Arrive',
        accessor: 'arrive',
      },
      {
        Header: 'Depart',
        accessor: 'depart',
      },
      {
        Header: 'Room Type',
        accessor: 'roomType',
      },
      {
        Header: 'Payment',
        accessor: 'payment',
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
          <div className="text-white relative top-20 text-3xl font-semibold left-4">My Bookings</div>
        </div>
        <motion.div
         variants={FadeUp(0.3)}
         initial="hidden"
         whileInView={"visible"}
        className="p-4 relative -top-52">
          <table {...getTableProps()} className="min-w-full bg-white border rounded-md">
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()} className="border p-2">{column.render('Header')}</th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                return (
                  
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()} className="border p-2">{cell.render('Cell')}</td>
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
}

export default Bookings;
