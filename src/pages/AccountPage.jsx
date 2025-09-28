import { useState, useEffect, useRef } from "react";
import { motion as Motion } from "framer-motion";
import { PlusIcon, EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import ChangePasswordSection from "../components/account/ChangePasswordSection";
import { useNavigate } from "react-router";
import { auth, db } from "../firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import ProfileSection from "../components/account/ProfileSection";
import EditProfileModal from "../components/account/EditProfileModal";
import SuccessAlert from "../components/ui/SuccessAlert";
import Spinner from "../components/ui/Spinner";
import AccountSidebar from "../components/account/AccountSidebar";
import ApplicationTracker from "../components/ui/ApplicationTracker";
import SavedJobsSection from "../components/account/SavedJobsSection";
import NotificationsSection from "../components/account/NotificationsSection";
import SettingsSection from "../components/account/SettingsSection";

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
		profession: "",
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
	const [activeSection, setActiveSection] = useState("profile");
	const [sidebarOpen, setSidebarOpen] = useState(false);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
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
				profession: userData.profession || "",
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
		await signOut(auth);
		navigate("/auth");
	};

	if (loading) return <Spinner className="mt-10" />;
	if (error) return <div className="text-error text-center mt-10">{error}</div>;

	return (
		<>
			<div className="flex min-h-screen bg-base-100">
				<AccountSidebar
					userData={userData}
					avatarPreview={avatarPreview}
					activeSection={activeSection}
					setActiveSection={setActiveSection}
					open={sidebarOpen}
					setOpen={setSidebarOpen}
				/>
				<main className="flex-1 p-4 sm:p-8 relative">
					<SuccessAlert message="Profile saved successfully!" show={showSuccess} />
					
					{activeSection === "profile" && (
						<Motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							<ProfileSection
								avatarPreview={avatarPreview}
								avatarInputRef={avatarInputRef}
								onAvatarChange={(e) => {
									const file = e.target.files[0];
									if (file) {
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
						</Motion.div>
					)}
					
					{activeSection === "password" && (
						<Motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							<ChangePasswordSection />
						</Motion.div>
					)}
					
					{activeSection === "saved" && (
						<Motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							<SavedJobsSection />
						</Motion.div>
					)}
					
					{activeSection === "applications" && (
						<Motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							<ApplicationTracker />
						</Motion.div>
					)}
					
					{activeSection === "notifications" && (
						<Motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							<NotificationsSection />
						</Motion.div>
					)}
					
					{activeSection === "settings" && (
						<Motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5 }}
						>
							<SettingsSection 
								userData={userData}
								onUpdateUserData={setUserData}
							/>
						</Motion.div>
					)}
				</main>
			</div>
			
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
							profession: form.profession,
							twitter: form.showTwitter ? form.twitter : "",
							linkedin: form.showLinkedin ? form.linkedin : "",
						});
						setUserData((prev) => ({
							...prev,
							...form,
							profession: form.profession,
							twitter: form.showTwitter ? form.twitter : "",
							linkedin: form.showLinkedin ? form.linkedin : "",
						}));
						setShowSuccess(true);
						setTimeout(() => setShowSuccess(false), 3000);
					}
				}}
			/>
		</>
	);
}
