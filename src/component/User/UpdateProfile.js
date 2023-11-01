import React from 'react'
import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from 'react'
import Loader from "../Layout/Loader/Loader"
import MailOutlineIcon from "@mui/icons-material/MailOutline"
import FaceIcon from "@mui/icons-material/Face"
import { useNavigate } from 'react-router-dom'
import { updateProfile, clearErrors, loadUser } from '../../actions/userAction'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstant'
import MetaData from "../Layout/MetaData"
import "./UpdateProfile.css"

const UpdateProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector(state => state.user)
    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState("");

    const updateProfileSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();

        myForm.set("name", name)
        myForm.set("email", email)
        myForm.set("avatar", avatar)

        dispatch(updateProfile(myForm));
    }

    const updateProfileDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result)
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }
    useEffect(() => {

        if (user) {
            setName(user.name);
            setEmail(user.email)
            setAvatarPreview(user.avatar.url);
        }

        if (isUpdated) {
            dispatch(loadUser())
            navigate("/account")
            dispatch({
                type: UPDATE_PROFILE_RESET,
            })
        }
    }, [isUpdated, navigate, user, isUpdated])

    return (loading ? <Loader /> : <>
        <MetaData title="Update Profile" />
        <div className="updateProfileContainer">
            <div className="updateProfileBox">
                <h2 className='updateProfileHeading'>UPDATE PROFILE</h2>
                <form className='updateProfileForm'
                    encType='multipart/form-data'
                    onSubmit={updateProfileSubmit}>
                    <div className="updateProfileName">
                        <FaceIcon />
                        <input type="text"
                            placeholder='"Name'
                            required
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="updateProfileName">
                        <MailOutlineIcon />
                        <input type="email"
                            placeholder='"Email'
                            required
                            name="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>

                    <div id="updateProfileImage">
                        <img src={avatarPreview} alt="Avatar Preview" />
                        <input type="file"
                            name="avatar"
                            accept="image/*"
                            onChange={updateProfileDataChange} />
                    </div>
                    <input type="submit" value="Update" className='updateProfileBtn' />
                </form>
            </div>
        </div>
    </>

    )
}

export default UpdateProfile