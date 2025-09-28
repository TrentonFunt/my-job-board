
import React from "react";
import Button from "../ui/Button";

export default function EditProfileModal({
  editOpen,
  editForm,
  setEditForm,
  formErrors,
  setFormErrors,
  setEditOpen,
  auth,
  updateUserData
}) {
  if (!editOpen) return null;
  return (
    <dialog open className="modal modal-open">
      <form
        method="dialog"
        className="modal-box max-w-lg"
        onSubmit={async (e) => {
          e.preventDefault();
          // Validation
          const errors = {};
          if (!editForm.firstName.trim())
            errors.firstName = "First name is required.";
          if (!editForm.lastName.trim())
            errors.lastName = "Last name is required.";
          if (!editForm.email.trim()) {
            errors.email = "Email is required.";
          } else if (!/^\S+@\S+\.\S+$/.test(editForm.email)) {
            errors.email = "Invalid email format.";
          }
          if (
            editForm.showTwitter &&
            editForm.twitter &&
            !/^https?:\/\/.+/.test(editForm.twitter)
          ) {
            errors.twitter = "Invalid Twitter URL.";
          }
          if (
            editForm.showLinkedin &&
            editForm.linkedin &&
            !/^https?:\/\/.+/.test(editForm.linkedin)
          ) {
            errors.linkedin = "Invalid LinkedIn URL.";
          }
          setFormErrors(errors);
          if (Object.keys(errors).length > 0) return;
          try {
            const user = auth.currentUser;
            if (user) {
              // Update displayName in Firebase Auth independently
              if (editForm.displayName && user.displayName !== editForm.displayName) {
                const { updateProfile } = await import("firebase/auth");
                await updateProfile(user, {
                  displayName: editForm.displayName
                });
              }
              await updateUserData(editForm);
            }
          } catch {
            alert("Failed to update profile. Please try again.");
          }
          setEditOpen(false);
        }}
      >
        <h3 className="font-bold text-lg mb-4 text-base-content">Edit Profile</h3>
        <div className="max-w-md space-y-4">
          <input
            type="text"
            id="profession"
            name="profession"
            placeholder="Profession (e.g. Software Engineer, Recruiter)"
            className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={editForm.profession || ""}
            onChange={(e) =>
              setEditForm((f) => ({ ...f, profession: e.target.value }))
            }
          />
          <input
            type="text"
            id="displayName"
            name="displayName"
            placeholder="Display Name"
            className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={editForm.displayName || ""}
            onChange={(e) =>
              setEditForm((f) => ({ ...f, displayName: e.target.value }))
            }
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="First Name"
              className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={editForm.firstName}
              onChange={(e) =>
                setEditForm((f) => ({ ...f, firstName: e.target.value }))
              }
            />
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={editForm.lastName}
              onChange={(e) =>
                setEditForm((f) => ({ ...f, lastName: e.target.value }))
              }
            />
          </div>
          {formErrors.lastName && (
            <span className="text-red-400 text-xs">
              {formErrors.lastName}
            </span>
          )}
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={editForm.email}
            onChange={(e) =>
              setEditForm((f) => ({ ...f, email: e.target.value }))
            }
          />
          {formErrors.email && (
            <span className="text-red-400 text-xs">
              {formErrors.email}
            </span>
          )}
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="Phone"
            className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={editForm.phone}
            onChange={(e) =>
              setEditForm((f) => ({ ...f, phone: e.target.value }))
            }
          />
          <input
            type="text"
            id="address"
            name="address"
            placeholder="Address"
            className="w-full bg-base-200 border border-base-300 rounded-lg px-4 py-3 text-base-content placeholder-base-content/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            value={editForm.address}
            onChange={(e) =>
              setEditForm((f) => ({ ...f, address: e.target.value }))
            }
          />
          <textarea
            id="bio"
            name="bio"
            placeholder="Bio"
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
            rows={3}
            value={editForm.bio}
            onChange={(e) =>
              setEditForm((f) => ({ ...f, bio: e.target.value }))
            }
          />
          {/* Social Links Customization */}
          <div className="flex items-center col-span-2 mb-2">
            <input
              type="checkbox"
              checked={editForm.showTwitter}
              onChange={(e) =>
                setEditForm((f) => ({
                  ...f,
                  showTwitter: e.target.checked,
                }))
              }
              className="mr-2"
              id="showTwitter"
            />
            <label htmlFor="showTwitter" className="mr-4">
              Show Twitter
            </label>
            <input
              type="checkbox"
              checked={editForm.showLinkedin}
              onChange={(e) =>
                setEditForm((f) => ({
                  ...f,
                  showLinkedin: e.target.checked,
                }))
              }
              className="mr-2"
              id="showLinkedin"
            />
            <label htmlFor="showLinkedin">Show LinkedIn</label>
          </div>
          {editForm.showTwitter && (
            <>
              <input
                type="url"
                id="twitter"
                name="twitter"
                placeholder="Twitter URL"
                className="input input-bordered w-full mb-2"
                value={editForm.twitter}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, twitter: e.target.value }))
                }
              />
              {formErrors.twitter && (
                <span className="text-error col-span-2">
                  {formErrors.twitter}
                </span>
              )}
            </>
          )}
          {editForm.showLinkedin && (
            <>
              <input
                type="url"
                id="linkedin"
                name="linkedin"
                placeholder="LinkedIn URL"
                className="input input-bordered w-full mb-2"
                value={editForm.linkedin}
                onChange={(e) =>
                  setEditForm((f) => ({ ...f, linkedin: e.target.value }))
                }
              />
              {formErrors.linkedin && (
                <span className="text-error col-span-2">
                  {formErrors.linkedin}
                </span>
              )}
            </>
          )}
        </div>
        <div className="modal-action mt-4">
              <Button type="submit" className="btn-primary">
                Save
              </Button>
              <Button
                type="button"
                className=""
                onClick={() => setEditOpen(false)}
              >
                Cancel
              </Button>
        </div>
      </form>
    </dialog>
  );
}
