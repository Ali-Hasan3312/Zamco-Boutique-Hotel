import axios from "axios";
import { EmailAuthProvider, reauthenticateWithCredential, updatePassword, verifyBeforeUpdateEmail } from "firebase/auth";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegAddressBook } from "react-icons/fa";
import { LuUser2 } from "react-icons/lu";
import { MdCall, MdLockOutline, MdOutlineMailOutline } from "react-icons/md";
import { VscSearch } from "react-icons/vsc";
import { Link } from "react-router-dom";
import AdminSideBar from "../components/AdminSidebar";
import { auth } from "../firebase";
import { Context } from "../main";
const Settings = () => {
  const {user} = useContext(Context);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("")
  const [address, setAddress] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [photo, setPhoto] = useState<File | string>("");
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [currentEmail, setCurrentEmail] = useState("");
  const [emailPassword, setEmailPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setMobile(user.mobile || "");
      setAddress(user.address || "");
      // setDateOfBirth(user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString() : "");
      setPhoto(user.photo || "");
    }
    if (user && user.dateOfBirth) {
      const date = new Date(user.dateOfBirth);
      const formattedDate = date.toISOString().substring(0, 10); // Convert to YYYY-MM-DD
      setDateOfBirth(formattedDate);
    }
  }, [user]);
 
 
  const handleSaveChanges = async () => {
   
    const formData = new FormData();
  formData.append("name", name!);
  formData.append("email", email); 
  formData.append("mobile", mobile);
  formData.append("address", address);
  formData.append("dateOfBirth", dateOfBirth);
  if (typeof photo === "object") {
    formData.append("photo", photo);
  }
    try {
      await axios.put(
        `${import.meta.env.VITE_SERVER}/api/v1/staff/update/${user?._id}`,
        formData,
        {
          withCredentials: true,
        }
      );
      
      
      toast.success("Changes saved successfully!");
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Failed to save changes.");
    }
  };
  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setPhoto(file);
      const objectUrl = URL.createObjectURL(file);
      setPhotoUrl(objectUrl); 
    }
  };
 
  const handleUpdateEmail = async () => {
    if (newEmail !== confirmEmail) {
      toast.error("Emails do not match");
      return;
    }
  
    const firebaseUser = auth.currentUser;
  
    if (!firebaseUser) {
      toast.error("No user is currently signed in");
      return;
    }
  
    try {
      // Re-authenticate the user with their current password
      const credential = EmailAuthProvider.credential(firebaseUser.email!, emailPassword);
      await reauthenticateWithCredential(firebaseUser, credential);
      // Send verification email to the new email address before updating
      await verifyBeforeUpdateEmail(firebaseUser, newEmail);
      toast.success("Verification email sent. Please check your inbox to verify the new email.");
  
      // After email verification is sent, optionally update email in your backend
      await axios.put(`${import.meta.env.VITE_SERVER}/api/v1/staff/update/${user?._id}`, { email: newEmail });
      
    } catch (error: any) {
      console.error("Error updating email:", error);
  
      // Handle specific error codes
      switch (error.code) {
        case "auth/requires-recent-login":
          toast.error("Please sign in again before updating your email.");
          break;
        case "auth/invalid-email":
          toast.error("The email address is invalid.");
          break;
        case "auth/email-already-in-use":
          toast.error("The email address is already in use by another account.");
          break;
        default:
          toast.error("Failed to send verification email. Please try again later.");
      }
    }
  };
  
  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
  
    const firebaseUser = auth.currentUser;
  
    if (!firebaseUser) {
      toast.error("No user is currently signed in");
      return;
    }
  
    try {
      // Re-authenticate the user with their current credentials (email & current password)
      const credential = EmailAuthProvider.credential(firebaseUser.email!, currentPassword);
      await reauthenticateWithCredential(firebaseUser, credential);
  
      // Update the password
      await updatePassword(firebaseUser, newPassword);
      toast.success("Password updated successfully");
  
      // Reset the input fields after successful update
      setNewPassword("");
      setConfirmPassword("");
      setCurrentPassword("");
    } catch (error: any) {
      console.error("Error updating password:", error);
  
      // Handle specific error codes from Firebase
      switch (error.code) {
        case "auth/requires-recent-login":
          toast.error("Please sign in again before updating your password.");
          break;
        case "auth/weak-password":
          toast.error("The password is too weak. Please choose a stronger password.");
          break;
        default:
          toast.error("Failed to update password. Please try again later.");
      }
    }
  };
  
  
  
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
              <VscSearch className="z-10" />
            </div>
          </div>
         <div className="flex items-center justify-between">
         <div className="text-white relative lg:top-20 sm:top-28 text-3xl font-semibold lg:left-4 sm:left-32">
            Settings
          </div>
          <div className="h-14 w-[330px] relative lg:top-20 sm:top-28 right-8 text-white text-[18px] rounded-lg bg-black/30 flex items-center justify-center gap-3">
          <Link to={"/"}>Home</Link>
          <div className="h-1 w-1 bg-white rounded-full"></div>
          <Link to={"/admin/dashboard"}>Dashboard</Link>
          <div className="h-1 w-1 bg-white rounded-full"></div>
          <span>Settings</span>
          </div>
         </div>
         <div className="grid lg:grid-cols-2 sm:grid-cols-1 lg:ml-0 sm:ml-56 lg:mt-0 sm:mt-16">
         <div className="h-[660px] w-[530px] bg-white lg:ml-8 sm:ml-0 rounded-md mt-32">
              <div className="h-16 w-full border border-b border-gray-300 rounded-t-md flex items-center px-4 text-2xl font-medium">
                <h1>Personal Information</h1>
              </div>
              <div className="h-24 w-[90%] flex gap-8 mt-12 items-center mx-auto">
                <div>
                  <img
                    src={typeof photo === 'string' ?  user?.photo : photoUrl}
                    className="rounded-md"
                    alt="User"
                  />
                </div>
                <div className="flex flex-col gap-4 items-start w-[70%] justify-center">
                  <p className="text-lg">
                    Max file size is 5MB, Minimum dimension: 150x150. Suitable files are .jpg & .png
                  </p>
                  <input
                   type="file"
                   onChange={handlePhotoChange}
                  />
                
                </div>
              </div>
              <div className="mt-16 w-[90%] mx-auto grid grid-cols-2">
                <div className="flex flex-col gap-4">
                  <label className="text-base">Full Name</label>
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-12 w-[220px] rounded-md border border-gray-300 outline-none px-8"
                    />
                    <LuUser2 className="absolute left-2 top-4 text-gray-500 text-lg" />
                  </div>
                </div>
                <div className="flex flex-col gap-4 w-full">
                  <label className="text-base">Email Address</label>
                  <div className="relative w-[100%]">
                    <input
                      type="email"
                      readOnly={true}
                      value={user?.email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-12 w-[220px] rounded-md border border-gray-300 outline-none px-8"
                    />
                    <MdOutlineMailOutline className="absolute left-2 top-4 text-gray-500 text-lg" />
                  </div>
                </div>
                <div className="flex flex-col gap-4 mt-4">
                  <label className="text-base">Phone number</label>
                  <div className="relative w-[100%]">
                    <input
                      type="text"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
                      className="h-12 w-[220px] rounded-md border border-gray-300 outline-none px-8"
                    />
                    <MdCall className="absolute left-2 top-4 text-gray-500 text-lg" />
                  </div>
                </div>
                <div className="flex flex-col gap-4 mt-4">
                  <label className="text-base">Date of birth</label>
                  <div className="relative w-[100%]">
                    <input
                     type="date"
                     value={dateOfBirth}
                     onChange={(e) => setDateOfBirth(e.target.value)} 
                      className="h-12 appearance-none w-[220px] rounded-md border border-gray-300 outline-none px-2"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-4 mt-4">
                  <label className="text-base">Address</label>
                  <div className="relative w-[100%]">
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="h-12 w-[455px] rounded-md border border-gray-300 outline-none px-8"
                    />
                    <FaRegAddressBook className="absolute left-2 top-4 text-gray-500 text-lg" />
                  </div>
                  <button
                    onClick={handleSaveChanges}
                    className="h-14 rounded w-36 font-medium text-lg text-white bg-custom-blue hover:bg-white hover:border hover:border-custom-blue hover:text-custom-blue transition-all duration-300"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
         <div className=" h-[660px] w-[530px] bg-white rounded-md lg:mt-32 sm:mt-8">
         <div className=" h-16 w-full border border-b border-gray-300 rounded-t-md flex items-center px-4 text-2xl font-medium">
         <h1>Change Email</h1>
         </div>
       
         <div className="mt-8 w-[90%] mx-auto grid grid-cols-1 gap-4">
        <div className="flex flex-col gap-4 w-full">
            <label className="text-base">Current Email</label>
            <div className="relative w-[100%]">
            <input type="email"
            value={currentEmail}
            onChange={(e) => setCurrentEmail(e.target.value)}
            placeholder="Current email" className="h-12 w-[455px] rounded-md border border-gray-300 outline-none px-8" />
            <MdOutlineMailOutline className="absolute left-2 top-4 text-gray-500 text-lg" />
            </div>
          </div>
        <div className="flex flex-col gap-4 w-full">
            <label className="text-base">Password</label>
            <div className="relative w-[100%]">
            <input type="password"
            value={emailPassword}
            onChange={(e) => setEmailPassword(e.target.value)}
            placeholder="Password" className="h-12 w-[455px] rounded-md border border-gray-300 outline-none px-8" />
            <MdOutlineMailOutline className="absolute left-2 top-4 text-gray-500 text-lg" />
            </div>
          </div>
        <div className="flex flex-col gap-4 w-full">
            <label className="text-base">New Email</label>
            <div className="relative w-[100%]">
            <input
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            type="email" placeholder="New email" className="h-12 w-[455px] rounded-md border border-gray-300 outline-none px-8" />
            <MdOutlineMailOutline className="absolute left-2 top-4 text-gray-500 text-lg" />
            </div>
          </div>
        <div className="flex flex-col gap-4 w-full">
            <label className="text-base">New Email Again</label>
            <div className="relative w-[100%]">
            <input
            value={confirmEmail}
            onChange={(e) => setConfirmEmail(e.target.value)}
            type="email" placeholder="New email again" className="h-12 w-[455px] rounded-md border border-gray-300 outline-none px-8" />
            <MdOutlineMailOutline className="absolute left-2 top-4 text-gray-500 text-lg" />
            </div>
          </div>
          <button
          onClick={handleUpdateEmail}
          className="h-14 rounded w-36 font-medium text-lg text-white bg-custom-blue hover:bg-white hover:border hover:border-custom-blue hover:text-custom-blue transition-all duration-300">Change Email</button>
         </div>
          </div>
         <div className=" h-[420px] w-[530px] bg-white lg:ml-8 sm:ml-0 rounded-md mt-8">
         <div className=" h-16 w-full border border-b border-gray-300 rounded-t-md flex items-center px-4 text-2xl font-medium">
         <h1>Change Password</h1>
         </div>
       
         <div className="mt-8 w-[90%] mx-auto grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-4 w-full">
            <label className="text-base">Current Password</label>
            <div className="relative w-[100%]">
            <input
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            type="password" placeholder="Current password" className="h-12 w-[220px] rounded-md border border-gray-300 outline-none px-8" />
            <MdLockOutline className="absolute left-2 top-4 text-gray-500 text-lg" />
            </div>
          </div>  
        <div className="flex flex-col gap-4 w-full">
            <label className="text-base">New Password</label>
            <div className="relative w-[100%]">
            <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            type="password" placeholder="New password" className="h-12 w-[220px] rounded-md border border-gray-300 outline-none px-8" />
            <MdLockOutline className="absolute left-2 top-4 text-gray-500 text-lg" />
            </div>
          </div>  
        <div className="flex flex-col gap-4 w-full">
            <label className="text-base">New Password Again</label>
            <div className="relative w-[100%]">
            <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password" placeholder="New password again" className="h-12 w-[220px] rounded-md border border-gray-300 outline-none px-8" />
            <MdLockOutline className="absolute left-2 top-4 text-gray-500 text-lg" />
            </div>
          </div>  
         </div>
          <button
          onClick={handleUpdatePassword}
          className="h-14 mt-6 ml-6 rounded w-40 font-medium text-lg text-white bg-custom-blue hover:bg-white hover:border hover:border-custom-blue hover:text-custom-blue transition-all duration-300">Change Password</button>
         <div className="h-12 mt-6"></div>
          </div>
         </div>
        </div>
      </div>
     
    </div>
  );
};

export default Settings;
