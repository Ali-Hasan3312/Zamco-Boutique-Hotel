import axios from "axios";
import { ReactElement, useEffect, useState, ChangeEvent, FormEvent, useId } from "react";
import toast from "react-hot-toast";
import { VscSearch } from "react-icons/vsc";
import { Column, useTable } from "react-table";
import AdminSideBar from "../components/AdminSidebar";
import { FadeUp } from "../utils/animation";
import { motion } from "framer-motion";

interface DataType {
  photo: ReactElement;
  roomType: string;
  roomPrice: number;
  roomStatus: boolean;
  description: string;
  action: ReactElement;
}

// Define the columns array outside the component
const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
    Cell: ({ cell: { value } }) => (
      <div className="flex justify-center items-center">{value}</div>
    ),
  },
  {
    Header: "Room Type",
    accessor: "roomType",
    Cell: ({ cell: { value } }) => (
      <div className="text-center">{value}</div>
    ),
  },
  {
    Header: "Price",
    accessor: "roomPrice",
    Cell: ({ cell: { value } }) => (
      <div className="text-center">${value}</div>
    ),
  },
  {
    Header: "Status",
    accessor: "roomStatus",
    Cell: ({ cell: { value } }) => (
      <div className="text-center">{value ? "Available" : "Occupied"}</div>
    ),
  },
  {
    Header: "Description",
    accessor: "description",
    Cell: ({ cell: { value } }) => (
      <div className="text-center">
        {value.length > 50 ? `${value.substring(0, 47)}...` : value}
      </div>
    ),
  },
  {
    Header: "Action",
    accessor: "action",
    Cell: ({ cell: { value } }) => (
      <div className="flex gap-2 justify-center items-center">{value}</div>
    ),
  },
];

const Rooms = () => {
  const [data, setData] = useState<DataType[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isUpdatePopupOpen, setIsUpdatePopupOpen] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [roomType, setRoomType] = useState<string>("");
  const [roomPrice, setRoomPrice] = useState<string>("");
  const [roomStatus, setRoomStatus] = useState<boolean>(true);
  const [roomDescription, setRoomDescription] = useState<string>("");
  const [photo, setPhoto] = useState<File | null>(null);
  const uniqueId = useId()

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER}/api/v1/room/getAllRooms`,
        {
          withCredentials: true,
        }
      );
      if (res.data) {
        const rooms = res.data.rooms.map((room: any) => ({
          photo: (
            <img
              src={room.photo}
              alt={`${room.roomTitle} photo`}
              className="h-16 w-16 rounded-full object-cover"
            />
          ),
          roomType: room.roomType,
          roomPrice: room.roomPrice,
          roomStatus: room.roomStatus,
          description: room.roomDescription,
          action: (
            <div className="flex gap-2 justify-center">
              <button
               onClick={() => handleManageClick(room._id, room.roomType, room.roomPrice, room.roomStatus, room.roomDescription)}
              className="bg-blue-300 hover:bg-inherit hover:text-black hover:transition-all p-1 rounded-lg text-blue-700">
                Manage
              </button>
              <button
                className="bg-red-300 hover:bg-inherit hover:text-black hover:transition-all p-1 rounded-lg text-red-700"
                onClick={() => handleDeleteRoom(room._id)}
              >
                Delete
              </button>
            </div>
          ),
        }));
        setData(rooms);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error fetching rooms");
    }
  };

  const handleDeleteRoom = async (roomId: string) => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      try {
        const res = await axios.delete(
          `${import.meta.env.VITE_SERVER}/api/v1/room/delete/${roomId}`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          toast.success("Room deleted successfully!");
          fetchRooms(); // Refresh the room list after deletion
        }
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Error deleting room");
      }
    }
  };
  const handleManageClick = (roomId: string, roomType: string, roomPrice: number, roomStatus: boolean, roomDescription: string) => {
    setSelectedRoomId(roomId);
    setRoomType(roomType);
    setRoomPrice(roomPrice.toString());
    setRoomStatus(roomStatus);
    setRoomDescription(roomDescription);
    setIsUpdatePopupOpen(true);
  };
  const handleCreateClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setIsUpdatePopupOpen(false);
  };

  const handleRoomCreated = () => {
    fetchRooms();
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!photo) {
      toast.error("Please upload a photo");
      return;
    }

    const formData = new FormData();
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);
    formData.append("roomStatus", roomStatus.toString());
    formData.append("roomDescription", roomDescription);
    formData.append("photo", photo);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER}/api/v1/room`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        handleRoomCreated(); // Refresh the room list
        handleClosePopup(); // Close the popup
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error creating room");
    }
  };
  const handleUpdateSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("roomType", roomType);
    formData.append("roomPrice", roomPrice);
    formData.append("roomStatus", roomStatus.toString());
    formData.append("roomDescription", roomDescription);
  
    if (photo) {
      formData.append("photo", photo);
    }
  
    // Log form data to verify
    formData.forEach((value, key) => {
      console.log(key, value);
    });
  
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER}/api/v1/room/update/${selectedRoomId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
  
      if (res.data.success) {
        toast.success("Room updated successfully!");
        handleRoomCreated(); // Refresh the room list
        handleClosePopup(); // Close the update popup
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error updating room");
    }
  };
  
  

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns, // Use the columns defined above
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
              <VscSearch className="z-20" />
            </div>
          </div>
          <div className="text-white relative top-20 text-3xl font-semibold left-4">
            My Rooms
          </div>
          <button
            onClick={handleCreateClick}
            className="relative top-24 left-4 h-10 text-white w-24 rounded-md bg-red-600 hover:opacity-85"
          >
            Create
          </button>
        </div>
        <motion.div
          variants={FadeUp(0.3)}
          initial="hidden"
          whileInView={"visible"}
          className="p-4 relative -top-44"
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

      {/* Popup for creating a new room */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">Create New Room</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Room Type</label>
                <input
                  type="text"
                  className="w-full border rounded px-3 py-2 mt-1"
                  
                  onChange={(e) => setRoomType(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Room Price</label>
                <input
                  type="number"
                  className="w-full border rounded px-3 py-2 mt-1"
                
                  onChange={(e) => setRoomPrice(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Room Status</label>
                <select
                  className="w-full border rounded px-3 py-2 mt-1"
                  value={roomStatus.toString()}
                  onChange={(e) => setRoomStatus(e.target.value === "true")}
                  required
                >
                  <option value="true">Available</option>
                  <option value="false">Occupied</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea
                  className="w-full border rounded px-3 py-2 mt-1"
                  
                  onChange={(e) => setRoomDescription(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Upload Photo</label>
                <input
                  type="file"
                  className="w-full"
                  onChange={handlePhotoChange}
                  required
                />
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={handleClosePopup}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Create
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
 {/* Popup for updating an existing room */}
{isUpdatePopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.3 }}
            className="bg-white p-8 rounded-lg shadow-lg"
          >
            <h2 className="text-2xl font-semibold mb-4">Update Room</h2>
            <form onSubmit={handleUpdateSubmit}>
  <div className="mb-4">
    <label className="block text-gray-700">Room Type</label>
    <input
      type="text"
      className="w-full border rounded px-3 py-2 mt-1"
      value={roomType}
      onChange={(e) => setRoomType(e.target.value)}
      required
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700">Room Price</label>
    <input
      type="number"
      className="w-full border rounded px-3 py-2 mt-1"
      value={roomPrice}
      onChange={(e) => setRoomPrice(e.target.value)}
      required
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700">Room Status</label>
    <select
      className="w-full border rounded px-3 py-2 mt-1"
      value={roomStatus.toString()}
      onChange={(e) => setRoomStatus(e.target.value === "true")}
      required
    >
      <option value="true">Available</option>
      <option value="false">Occupied</option>
    </select>
  </div>
  <div className="mb-4">
    <label className="block text-gray-700">Description</label>
    <textarea
      className="w-full border rounded px-3 py-2 mt-1"
      value={roomDescription}
      onChange={(e) => setRoomDescription(e.target.value)}
      required
    />
  </div>
  <div className="mb-4">
    <label className="block text-gray-700">Upload Photo</label>
    <input
      type="file"
      className="w-full"
      onChange={handlePhotoChange}
    />
  </div>
  <div className="flex justify-end gap-4">
    <button
      type="button"
      className="px-4 py-2 bg-gray-300 rounded"
      onClick={handleClosePopup}
    >
      Cancel
    </button>
    <button
      type="submit"
      className="px-4 py-2 bg-blue-600 text-white rounded"
    >
      Update
    </button>
  </div>
</form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Rooms;
