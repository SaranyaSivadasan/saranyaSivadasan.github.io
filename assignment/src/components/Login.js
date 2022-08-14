import React from "react";
import { useEffect,useState } from "react";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import { Navigate, useNavigate } from "react-router-dom";
import FileUploadDownload from "./FileUploadDownload";

const Login = () => {
    const clientId = '731777965673-krnhalvcl8tjaes5heksi2rto8nkafin.apps.googleusercontent.com';
    const navigate = useNavigate();
    const [profile, setProfile] = useState([])
    const [showUploadOption, setShowUploadOption] = useState(false)

  useEffect(() => {
    const initClient = () => {
          gapi.client.init({
          clientId: clientId,
          scope: ''
        });
      };
      gapi.load('client:auth2', initClient);
  });



  const onSuccess = (res) => {
    setProfile(res.profileObj)
    console.log("res.profileObj",res.profileObj)
    setShowUploadOption(true)
    //navigate("/fileUpload")
  };
  const onFailure = (err) => {
      console.log('failed:', err);
  };


return (
    <div>
        <div>
            {
                !showUploadOption ? 
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with Google"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                /> : ''
            }
            
        </div>
        <div>
            {
                showUploadOption && profile ? <FileUploadDownload profile={profile} setShowUploadOption={setShowUploadOption} /> : ''
            }
        </div>
    </div>
   
  )
}

export default Login;