import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";

interface CreateRoomPopupProps {
  onClose: () => void;
  onRoomCreated: () => void;
}

const CreateRoomPopup: React.FC<CreateRoomPopupProps> = ({ onClose, onRoomCreated }) => {
  const [roomType, setRoomType] = useState<string>("");
  const [roomPrice, setRoomPrice] = useState<string>("");
  const [roomStatus, setRoomStatus] = useState<boolean>(true);
  const [roomDescription, setRoomDescription] = useState<string>("");
   // Adjust the type based on your reviews structure
  const [photo, setPhoto] = useState<File | null>(null);

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
        toast.success("Room created successfully!");
        onRoomCreated(); // Callback to refresh room list or handle new room
        onClose(); // Close the popup
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Error creating room");
    }
  };

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setPhoto(e.target.files[0]);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-4">Create New Room</h2>
        <form onSubmit={handleFormSubmit}>
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
              required
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded"
              onClick={onClose}
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
      </div>
    </div>
  );
};

export default CreateRoomPopup;
