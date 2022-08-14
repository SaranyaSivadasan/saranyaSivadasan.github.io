import React from "react";
import { useEffect,useState } from "react";
import GoogleLogin from "react-google-login";
import { gapi } from "gapi-script";
import FileUploadDownload from "./FileUploadDownload";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  logout : {
      margin : '30px',
      radius : 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      direction:"column",
      alignItems:"center",
      justifyContent:"center",
      
  }
})
)

const Login = () => {
    const clientId = '731777965673-krnhalvcl8tjaes5heksi2rto8nkafin.apps.googleusercontent.com';
    const [profile, setProfile] = useState([])
    const [showUploadOption, setShowUploadOption] = useState(false)
    const profileDetails = React.useRef({ value : {} });

    const classes = useStyles()

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
    profileDetails.current.value = res.profileObj
    console.log("res.profileObj",res.profileObj)
    setShowUploadOption(true)
  };
  const onFailure = (err) => {
      console.log('failed:', err);
  };


return (
    <div className={classes.loginBox}>
        
        <div>
            {
                !showUploadOption ? (
                <div>
                  <div>
                    <h2>Welcome To Your File Collection!!!</h2>
                    <p>Here you can upload and download umlimited files...</p>
                  </div>
                  <div>
                    <GoogleLogin
                        clientId={clientId}
                        buttonText="Sign in with Google"
                        onSuccess={onSuccess}
                        onFailure={onFailure}
                        cookiePolicy={'single_host_origin'}
                        isSignedIn={true}
                    /> 
                  </div>
                </div>
            ) : '' } 
        </div>
        <div>
            {
                showUploadOption && profileDetails ? <FileUploadDownload profileName={profileDetails.current.value.name} setShowUploadOption={setShowUploadOption} /> : ''
            }
        </div>
    </div>
   
  )
}

export default Login;