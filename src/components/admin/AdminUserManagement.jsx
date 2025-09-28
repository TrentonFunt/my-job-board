import { Dialog, Transition, TransitionChild, DialogPanel } from '@headlessui/react';
import { motion as Motion } from "framer-motion";
import Button from "../ui/Button";
import { Fragment, useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

export default function AdminUserManagement() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [roleUpdate, setRoleUpdate] = useState("");
  const [statusUpdate, setStatusUpdate] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      const usersCol = collection(db, "users");
      const usersSnap = await getDocs(usersCol);
      setUsers(usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    }
    fetchUsers();
  }, [success]);

  const filteredUsers = users.filter(u => {
    const matchesSearch =
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.firstName?.toLowerCase().includes(search.toLowerCase()) ||
      u.lastName?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus =
      !filterStatus || (u.status || "active") === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSelectUser = user => {
    setSelectedUser(user);
    setRoleUpdate(user.role || "user");
    setStatusUpdate(user.status || "active");
  };

  const handleUpdateUser = async () => {
    if (!selectedUser) return;
    await updateDoc(doc(db, "users", selectedUser.id), {
      role: roleUpdate,
      status: statusUpdate,
    });
    setSuccess("User updated successfully!");
    setSelectedUser(null);
  };

  return (
    <Motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-slate-800 rounded-lg p-6 border border-slate-700"
    >
      <h2 className="text-2xl font-bold text-white mb-6">User Management</h2>
      
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          placeholder="Search by name or email"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-8">
          <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="ml-4 text-slate-300">Loading users...</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-600">
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Email</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Status</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Role</th>
                  <th className="text-left py-3 px-4 text-slate-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center text-slate-400 py-8">No users found.</td>
                  </tr>
                ) : (
                  filteredUsers.map(user => (
                    <tr key={user.id} className="border-b border-slate-700 hover:bg-slate-700/50 transition-colors">
                      <td className="py-3 px-4 text-white">{user.firstName} {user.lastName}</td>
                      <td className="py-3 px-4 text-slate-300">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          (user.status || "active") === "active" 
                            ? "bg-emerald-500/20 text-emerald-400" 
                            : "bg-red-500/20 text-red-400"
                        }`}>
                          {user.status || "active"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          (user.role || "user") === "admin" 
                            ? "bg-purple-500/20 text-purple-400" 
                            : "bg-blue-500/20 text-blue-400"
                        }`}>
                          {user.role || "user"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <button 
                          className="bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                          onClick={() => handleSelectUser(user)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
      )}
      
      <Transition show={!!selectedUser} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setSelectedUser(null)}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-30 transition-opacity" />
          </TransitionChild>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="bg-slate-800 rounded-lg p-6 max-w-md w-full shadow-xl border border-slate-700">
                <form onSubmit={e => {e.preventDefault(); handleUpdateUser();}}>
                  <h3 className="font-bold text-lg mb-4 text-white">Edit User</h3>
                  <div className="mb-4">
                    <label className="block mb-2 text-slate-300">Role</label>
                    <select 
                      id="user-role" 
                      name="user-role" 
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" 
                      value={roleUpdate} 
                      onChange={e => setRoleUpdate(e.target.value)}
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  </div>
                  <div className="mb-6">
                    <label className="block mb-2 text-slate-300">Status</label>
                    <select 
                      id="user-status" 
                      name="user-status" 
                      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent" 
                      value={statusUpdate} 
                      onChange={e => setStatusUpdate(e.target.value)}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-lg font-medium transition-colors">Save</button>
                    <button type="button" className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-4 py-3 rounded-lg font-medium transition-colors" onClick={() => setSelectedUser(null)}>Cancel</button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
      
      {success && (
        <Motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-4 py-3 rounded-lg mt-4"
        >
          {success}
        </Motion.div>
      )}
    </Motion.div>
  );
}
