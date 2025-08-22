
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
              await updateUserData(editForm);
            }
          } catch {
            alert("Failed to update profile. Please try again.");
          }
          setEditOpen(false);
        }}
      >
        <h3 className="font-bold text-lg mb-4">Edit Profile</h3>
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="First Name"
            className="input input-bordered w-full mb-2"
            value={editForm.firstName}
            onChange={(e) =>
              setEditForm((f) => ({ ...f, firstName: e.target.value }))
            }
          />
          {formErrors.firstName && (
            <span className="text-error col-span-2">
              {formErrors.firstName}
            </span>
          )}
          <input
            type="text"
            placeholder="Last Name"
            className="input input-bordered w-full mb-2"
            value={editForm.lastName}
            onChange={(e) =>
              setEditForm((f) => ({ ...f, lastName: e.target.value }))
            }
          />
          {formErrors.lastName && (
            <span className="text-error col-span-2">
              {formErrors.lastName}
            </span>
          )}
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full mb-2 col-span-2"
            value={editForm.email}
            onChange={(e) =>
              setEditForm((f) => ({ ...f, email: e.target.value }))
            }
          />
          {formErrors.email && (
            <span className="text-error col-span-2">
              {formErrors.email}
            </span>
          )}
          <input
            type="text"
            placeholder="Phone"
            className="input input-bordered w-full mb-2 col-span-2"
            value={editForm.phone}
            onChange={(e) =>
              setEditForm((f) => ({ ...f, phone: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Address"
            className="input input-bordered w-full mb-2 col-span-2"
            value={editForm.address}
            onChange={(e) =>
              setEditForm((f) => ({ ...f, address: e.target.value }))
            }
          />
          <textarea
            placeholder="Bio"
            className="textarea textarea-bordered w-full mb-2 col-span-2"
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
          <button type="submit" className="btn btn-primary">
            Save
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => setEditOpen(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
}
