import React, { useContext, useState, useEffect } from 'react'
import noteContext from "../context/notes/noteContext";
import maleavtar from '../icons/male_avtar.png'
import { useNavigate } from 'react-router-dom';


const UserProfile = () => {
    const context = useContext(noteContext);
    const { setIsLogin, setNotes, showAlert, host } = context;
    let navigate = useNavigate();
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        fetchUserData();
        // eslint-disable-next-line 
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`${host}/api/auth/getuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('token')
                },
            });
            const data = await response.json();
            if (response.ok) {
                setUserData(data);
            } else {
                showAlert('Failed to fetch user data');
            }
        } catch (error) {
            console.error(error);
            showAlert('An error occurred while fetching user data');
        }
    };
    const handleLogout = () => {
        // Perform any necessary logout actions here
        localStorage.removeItem('token'); // Remove the token from local storage
        setNotes([]);

        // Redirect or perform any other actions after logout
        setIsLogin(false); // Update logout state
        showAlert("You're Logged out!");
        navigate('/login'); // Navigate to the login page
    };



    return (
        <section className="pt-4 bg-blueGray-50">
            <div className="w-full lg:w-4/12 px-4 mx-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-1">
                    <div className="px-6">
                        <div className="w-full px-4 flex justify-center">
                            <div className="relative">
                                <img src={maleavtar} alt='avatar' />
                            </div>
                        </div>
                        <div className="text-center mt-12">
                            <h3 className="text-xl font-semibold leading-normal text-blueGray-700 mb-2 uppercase">
                                {userData && userData.name}
                            </h3>
                            <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold">
                                {userData && userData.email}
                            </div>
                            <footer className="m-5  ">
                                <button onClick={handleLogout} className="leading-normal text-blueGray-400 ">logout</button>
                            </footer>
                        </div>

                    </div>
                </div>
            </div>

        </section>
    )
};

export default UserProfile;
