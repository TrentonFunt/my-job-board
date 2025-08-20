import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router";

export default function AccountPage() {
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUserData = async () => {
			const user = auth.currentUser;
			if (!user) {
				setError("No user signed in.");
				setLoading(false);
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
			} finally {
				setLoading(false);
			}
		};
		fetchUserData();
	}, []);

	const handleSignOut = async () => {
		await auth.signOut();
		navigate("/auth");
	};

	if (loading)
		return <div className="text-center mt-10">Loading profile...</div>;
	if (error) return <div className="text-error text-center mt-10">{error}</div>;

	return (
		<div className="max-w-md mx-auto mt-10 card bg-base-100 p-8 shadow-lg">
			<h2 className="text-2xl font-bold mb-4">Account Profile</h2>
			<p>
				<strong>First Name:</strong> {userData?.firstName}
			</p>
			<p>
				<strong>Last Name:</strong> {userData?.lastName}
			</p>
			<p>
				<strong>Email:</strong> {userData?.email}
			</p>
			<p>
				<strong>Role:</strong> {userData?.role}
			</p>
			<p className="text-xs text-gray-400 mt-4">
				Account created: {userData?.createdAt}
			</p>
			<button
				className="btn btn-outline btn-error mt-6 w-full"
				onClick={handleSignOut}
			>
				Sign Out
			</button>
		</div>
	);
}
