import { useState, useEffect, useRef } from "react";
import ChangePasswordSection from "../components/account/ChangePasswordSection";
import { useNavigate } from "react-router";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import ProfileSection from "../components/account/ProfileSection";
import EditProfileModal from "../components/account/EditProfileModal";
import SuccessAlert from "../components/ui/SuccessAlert";
import Spinner from "../components/ui/Spinner";

export default function AccountPage() {
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [editOpen, setEditOpen] = useState(false);
	const [avatarPreview, setAvatarPreview] = useState(null);
	const [editForm, setEditForm] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		address: "",
		bio: "",
		twitter: "",
		linkedin: "",
		showTwitter: true,
		showLinkedin: true,
	});
	const [formErrors, setFormErrors] = useState({});
	const [status, setStatus] = useState("active");
	const [showSuccess, setShowSuccess] = useState(false);
	const avatarInputRef = useRef();
	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged(async (user) => {
			if (!user) {
				setError("No user signed in.");
				setLoading(false);
				setUserData(null);
				return;
			}
			try {
				const docRef = doc(db, "users", user.uid);
				const docSnap = await getDoc(docRef);
				if (docSnap.exists()) {
					setUserData(docSnap.data());
				} else {
					setError("User profile not found.");
				}
			} catch {
				setError("Error fetching user profile.");
			}
			setLoading(false);
		});
		return () => unsubscribe();
	}, []);

	useEffect(() => {
		if (userData) {
			setEditForm({
				firstName: userData.firstName || "",
				lastName: userData.lastName || "",
				email: userData.email || "",
				phone: userData.phone || "",
				address: userData.address || "",
				bio: userData.bio || "",
				twitter: userData.twitter || "",
				linkedin: userData.linkedin || "",
				showTwitter: true,
				showLinkedin: true,
			});
			setAvatarPreview(userData.avatarUrl || null);
			setStatus(userData.status || "active");
		}
	}, [userData]);

	const handleSignOut = async () => {
		await auth.signOut();
		navigate("/auth");
	};

	if (loading)
		return <Spinner className="mt-10" />;
	if (error) return <div className="text-error text-center mt-10">{error}</div>;

		return (
			<div className="max-w-3xl mx-auto p-4 sm:p-8">
				<div className="card bg-base-100 shadow-xl border border-base-300 p-4 sm:p-8 mb-4 sm:mb-8">
					<h1 className="text-2xl sm:text-4xl font-bold text-accent mb-4 sm:mb-6">Account</h1>
					{/* Success Alert */}
					<SuccessAlert message="Profile saved successfully!" show={showSuccess} />
					<ProfileSection
						avatarPreview={avatarPreview}
						avatarInputRef={avatarInputRef}
						onAvatarChange={(e) => {
							const file = e.target.files[0];
							if (file) {
								// Show preview immediately (local only)
								const reader = new FileReader();
								reader.onload = (ev) => setAvatarPreview(ev.target.result);
								reader.readAsDataURL(file);
							}
						}}
						userData={userData}
						status={status}
						handleEdit={() => setEditOpen(true)}
						handleSignOut={handleSignOut}
					/>
					{/* Change Password Section */}
					<ChangePasswordSection />
				</div>
				{/* Edit Profile Modal */}
				<EditProfileModal
					editOpen={editOpen}
					editForm={editForm}
					setEditForm={setEditForm}
					formErrors={formErrors}
					setFormErrors={setFormErrors}
					setEditOpen={setEditOpen}
					auth={auth}
					db={db}
					updateUserData={async (form) => {
						const user = auth.currentUser;
						if (user) {
							const docRef = doc(db, "users", user.uid);
							await updateDoc(docRef, {
								firstName: form.firstName,
								lastName: form.lastName,
								email: form.email,
								phone: form.phone,
								address: form.address,
								bio: form.bio,
								twitter: form.showTwitter ? form.twitter : "",
								linkedin: form.showLinkedin ? form.linkedin : "",
							});
							setUserData((prev) => ({
								...prev,
								...form,
								twitter: form.showTwitter ? form.twitter : "",
								linkedin: form.showLinkedin ? form.linkedin : "",
							}));
							setShowSuccess(true);
							setTimeout(() => setShowSuccess(false), 3000);
						}
					}}
				/>
			</div>
		);
}
