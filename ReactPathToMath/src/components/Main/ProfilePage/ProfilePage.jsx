import React, { useState, useEffect, useRef } from 'react';
import background from '../../../assets/Images/Background/profileBg.jpg';

const defaultUserData = {
    "name": "Alice",
    "email": "alice@gmail.com",
    "password": "alice123",
    "currentGrade": 3,
    "avatar": "./src/Images/Avatars/avatar1.png",
    "streak": 5,
    "lastDailyCompleted": "2025-04-14",
    "gradeLevel": [
        { "Addition": 0, "Subtraction": 0, "Multiply": 0, "Division": 0, "Percentage": 0 },
        { "Addition": 0, "Subtraction": 0, "Multiply": 0, "Division": 0, "Percentage": 0 },
        { "Addition": 0, "Subtraction": 0, "Multiply": 0, "Division": 0, "Percentage": 0 },
        { "Addition": 0, "Subtraction": 0, "Multiply": 0, "Division": 0, "Percentage": 0 },
        { "Addition": 0, "Subtraction": 0, "Multiply": 0, "Division": 0, "Percentage": 0 },
        { "Addition": 0, "Subtraction": 0, "Multiply": 0, "Division": 0, "Percentage": 0 }
    ],
    "badges": [
        [],
        [],
        ["plusBadge", "multiplyBadge"],
        [],
        [],
        [],
        [],
        []
    ]
};

const ProfilePage = ({ user }) => {
    const [userData, setUserData] = useState(user || defaultUserData);
    const [isAlert, setIsAlert] = useState(false);
    const [message, setMessage] = useState({ message: "", isSuccess: false });
    const [showAvatarSection, setShowAvatarSection] = useState(false);
    const [avatar, setAvatar] = useState(userData.avatar);
    const showPassword = useRef(false);

    /**
     * Displays an alert with a custom message and style.
     * @param {string} message - The alert message to display.
     * @param {boolean} isSuccess - Whether the alert is a success (true) or an error (false).
     * @returns {void}
     */
    const showAlert = (message, isSuccess) => {
        setMessage({ message: message, isSuccess: isSuccess });
        setIsAlert(true);
    };

    /**
     * Handles profile update form submission.
     * Updates user data if any changes are detected.
     * @param {Event} event - The form submission event.
     * @returns {void}
     */
    const updateProfile = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);

        const isEmpty = !formData.get("name") || !formData.get("email") || !formData.get("password");
        const isSame = formData.get("name") == userData.name && formData.get("email") == userData.email &&
            formData.get("password") == userData.password && formData.get("grade") == userData.currentGrade &&
            avatar == userData.avatar;

        if (isEmpty || isSame) {
            showAlert("No changes made", false);
            return;
        }

        setUserData({
            ...userData,
            name: formData.get("name") || userData.name,
            email: formData.get("email") || userData.email,
            password: formData.get("password") || userData.password,
            currentGrade: formData.get("grade") || userData.currentGrade,
            avatar: avatar || userData.avatar,
        });

        showAlert("Profile Updated Successfully!", true);
    };

    /**
     * Renders an alert box based on the message and success flag.
     * @param {Object} props
     * @param {string} props.message - The message to display.
     * @param {boolean} props.isSuccess - Whether it's a success alert.
     * @returns {JSX.Element}
     */
    const Alert = ({ message, isSuccess }) => {
        const messageModel = {
            success: "bg-green-500",
            error: "bg-red-500"
        };

        const closeAlert = () => {
            setIsAlert(false);
        };

        useEffect(() => {
            const timeout = setTimeout(() => {
                const alert = document.getElementById("alert");
                if (alert) {
                    alert.style.opacity = "0";
                    alert.style.transition = "opacity 0.6s ease-in-out";
                }
            }, 5000);

            return () => clearTimeout(timeout);
        }, []);

        const alertColor = messageModel[isSuccess ? "success" : "error"];
        return (
            <div id="alert" className={`fixed right-5 top-5 bg-green-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between space-x-4 z-10 ${alertColor}`}>
                <p className="font-semibold">{message}</p>
                <button className="text-white font-bold px-2 hover:text-gray-300" onClick={closeAlert}>OK</button>
            </div>
        );
    };

    /**
     * Renders avatar selection options and handles avatar update.
     * @returns {JSX.Element}
     */
    const AvatarOptions = () => {
        const avatars = ["avatar1", "avatar2", "avatar3", "avatar4png"];

        const fileWithoutExtenstion = (path) => {
            const fileName = path.split("/").pop(); // e.g., "avatar1.png"
            return fileName.split(".")[0];          // e.g., "avatar1"
        };

        /**
         * Renders a single avatar image option.
         * @param {Object} props
         * @param {string} props.avatarEndSrc - The avatar file name (e.g., "1.png").
         * @returns {JSX.Element}
         */
        const Avatar = ({ avatarEndSrc }) => {
            const currentAvatar = fileWithoutExtenstion(userData.avatar);
            const selectedAvatar = fileWithoutExtenstion(avatar);
            const borderColor = selectedAvatar == avatarEndSrc ? "border-blue-500" : currentAvatar == avatarEndSrc ? "border-blue-200" : "border-transparent";

            const avatarSrc = `./src/Images/Avatars/${avatarEndSrc}.png`;

            const handleAvatarClick = () => {
                setAvatar(avatarSrc);
                setShowAvatarSection(false);
            };

            return (
                <img src={avatarSrc} className={`md:w-40 md:h-40 h-30 w-30 rounded-xl cursor-pointer border-5 transition hover:scale-105 ${borderColor}`} onClick={handleAvatarClick} />
            );
        };

        return (
            <div className="fixed top-0 left-0 w-full h-full bg-black flex items-center justify-center">
                <div className="bg-white p-2 rounded-xl grid grid-cols-1 justify-center gap-6 w-3/4 md:w-1/2 h-1/2 z-50">
                    <div className='justify-center'>
                        <h1 className="lg:text-6xl sm:text-5xl text-3xl font-extrabold text-center">Choose Avatar:</h1>
                    </div>
                    <div className='flex flex-wrap gap-7 justify-center'>
                        {avatars.map((av) => (
                            <Avatar key={av} avatarEndSrc={av} />
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    /**
     * Renders the main editable profile UI.
     * @returns {JSX.Element}
     */
    const body = () => {
        const AvatarSection = () => {
            return (
                <div id="avatar" className="flex flex-col items-center justify-center md:w-1/3 w-full mr-5 p-6">
                    <img id="AvatarImg" src={avatar} className="bg-white border-5 border-blue-500 w-48 h-48 object-cover rounded-xl p-3 mb-4" />
                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => setShowAvatarSection(true)}>
                        Change Avatar
                    </button>
                </div>
            );
        };

        const GradePicker = () => {
            const gradeOptions = [
                { value: 1, label: "1st Grade" },
                { value: 2, label: "2nd Grade" },
                { value: 3, label: "3rd Grade" },
                { value: 4, label: "4th Grade" },
                { value: 5, label: "5th Grade" },
            ];

            return (
                <div className="flex-row">
                    <select
                        name="grade"
                        className="w-full p-2 rounded shadow bg-white hover:cursor-pointer"
                        defaultValue={userData.currentGrade}
                    >
                        {gradeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
            );
        };

        /**
         * Renders a text, email, or password input with optional password visibility toggle.
         * @param {Object} props
         * @param {string} props.type - Input type (e.g., "text", "email", "password").
         * @param {string} props.field - Field name (e.g., "name", "email").
         * @returns {JSX.Element}
         */
        const InputBox = ({ type, field }) => {
            const isPassword = type === "password";

            const handleTogglePasswordVisibility = () => {
                showPassword.current = !showPassword.current;
                document.getElementById(field).type = showPassword.current ? "text" : "password";
            };

            return (
                <div className="w-full w-2/3">
                    <input
                        id={field}
                        placeholder={userData[field]}
                        name={field}
                        type={isPassword && showPassword.current ? "text" : type}
                        defaultValue={userData[field]}
                        className="p-2 rounded shadow bg-white w-full"
                    />
                    {isPassword && (
                        <button
                            type="button"
                            className="mt-1 text-blue-500 hover:text-blue-700 hover:cursor-pointer transition-all duration-300"
                            onClick={handleTogglePasswordVisibility}
                        >
                            {showPassword.current ? "Hide" : "Show"}
                        </button>
                    )}
                </div>
            );
        };

        return (
            <div className="border-10 border-white md:flex bg-blue-200 rounded-xl py-2 md:py-10 md:h-1/2 xl:w-1/2 justify-center align-middle shadow-md w-full">
                <AvatarSection />
                <div className="flex flex-col justify-center h-full w-full md:w-1/2 lg:w-1/3 md:gap-3 items-center">
                    <form className="gap-6 flex flex-col" onSubmit={(event) => updateProfile(event)}>
                        <InputBox type="text" field="name" />
                        <InputBox type="email" field="email" />
                        <InputBox type="password" field="password" />
                        <GradePicker />
                        <button type="submit"
                            className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded mt-2 my-5 md:my-0">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-cover bg-center flex-grow w-full h-full" style={{ backgroundImage: `url(${background})` }}>
            <div className='font-sans antialiased flex-col align-middle justify-items-center justify-center items-center w-full h-full p-20'>
                {isAlert && <Alert message={message.message} isSuccess={message.isSuccess} />}
                {showAvatarSection && <AvatarOptions />}
                <h2 className="text-white text-2xl font-extrabold mb-7 py-7 tracking-widest">Lets Edit Your Profile:</h2>
                {body()}
            </div>
        </div>
    );
};

export default ProfilePage;
