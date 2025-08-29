import { Dialog, Transition, TransitionChild, DialogPanel } from '@headlessui/react';
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
    <div className="card bg-base-100 shadow-xl p-6 mb-8 max-w-6xl -mx-8">
      <h2 className="text-xl font-bold mb-4">User Management</h2>
      <div className="flex gap-4 mb-4">
        <input
          type="text"
          className="input input-bordered"
          placeholder="Search by name or email"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="select select-bordered"
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
          <span className="loading loading-spinner loading-lg text-accent"></span>
          <span className="ml-4 text-base-content/70">Loading users...</span>
        </div>
      ) : (
        <table className="table w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center text-base-content/70 py-8">No users found.</td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user.id}>
                  <td>{user.firstName} {user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.status || "active"}</td>
                  <td>{user.role || "user"}</td>
                  <td>
                      <button className="btn btn-xs btn-primary rounded" onClick={() => handleSelectUser(user)}>
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
              <DialogPanel className="modal-box max-w-md w-full bg-base-100 shadow-xl border border-base-300">
                <form onSubmit={e => {e.preventDefault(); handleUpdateUser();}}>
                  <h3 className="font-bold text-lg mb-2">Edit User</h3>
                  <div className="mb-2">
                    <label className="block mb-1">Role</label>
                    <select id="user-role" name="user-role" className="select select-bordered w-full" value={roleUpdate} onChange={e => setRoleUpdate(e.target.value)}>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                      <option value="editor">Editor</option>
                      <option value="viewer">Viewer</option>
                    </select>
                  </div>
                  <div className="mb-2">
                    <label className="block mb-1">Status</label>
                    <select id="user-status" name="user-status" className="select select-bordered w-full" value={statusUpdate} onChange={e => setStatusUpdate(e.target.value)}>
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="modal-action mt-4 flex gap-2">
                      <button type="submit" className="btn btn-primary rounded">Save</button>
                      <button type="button" className="btn btn-ghost rounded" onClick={() => setSelectedUser(null)}>Cancel</button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
      {success && <div className="alert alert-success mt-4">{success}</div>}
    </div>
  );
}
