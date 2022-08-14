import React, { useEffect } from "react";
import { GoogleLogout } from "react-google-login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DropzoneArea } from "material-ui-dropzone";
import { saveAs } from "file-saver";
import { makeStyles, TextField } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
    firstBox : {
        background : 'black'
    },
    logout : {
        height:50,
        margin : 1,
        radius : 3,
        float : "right",
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    name : {
        float: "left",
        color : 'black'
    },
    download : {
        width : 90,
        height: 40
    }, 
    showFile : {
        width : 150,
        height: 40
    }
})
)

const FileUploadDownload = (props) => {

    const {profileName, setShowUploadOption} = props
    const [files, setFiles] = useState([])
    const [profile, setProfile] = useState([])
    const [upload, setUpload] = useState({
        file : '',
        msg : ''
    })
    const [showFiles, setShowFiles] = useState({})
    const navigate = useNavigate()
    const clientId = '731777965673-krnhalvcl8tjaes5heksi2rto8nkafin.apps.googleusercontent.com';

    const classes = useStyles()

    const logOut = () => {
        setProfile(null);
        setShowUploadOption(false)
        navigate("/")
    };

    const saveFile = () => {
        files.map((f) => {
            saveAs(f)
        })
      };

      const uploadFileData = (e) => {
        setUpload({file: e,msg: "File successfully uploaded"});
        axios.post('http://localhost:3000',upload)
        .then((response) => {
            console.log(response)
        })
        .catch((ex) => {
            console.log(ex);
        });

		// setUpload({file:e, msg: ''});

		// let data = new FormData();
		// data.append('file', upload);

		// fetch('http://localhost:3000', {
        //     mode: 'cors',
		// 	method: 'POST',
		// 	body: data
		// }).then(response => {
		// 	setUpload({file: e,msg: "File successfully uploaded"});
		// }).catch(err => {
		// 	setUpload({error: err});
		// });

	}

    const showFile = () => {
        axios.get('http://localhost:3000')
        .then((response) => {
            setShowFiles(response.data)
        })
        .catch((ex) => {
            console.log(ex);
        });
        // fetch('http://localhost:3000', {
		// 	method: 'GET'
		// }).then(response => {
		// 	setShowFiles(response.data)
		// }).catch(err => {
		// 	setShowFiles({err})
		// });
    }

    const handleSave = (e) => {
        console.log(e)
        setFiles(e)
        uploadFileData(e)
    }
   

    return (
        <>          
            <div className={classes.firstBox}> 
                <div className={classes.name}>
                    {profileName ? <h3>Hai {profileName}</h3> : ''} 
                </div>
                
                                            
                <GoogleLogout clientId={clientId} buttonText="Log out" className={classes.logout} onLogoutSuccess={logOut} />                
            </div>
            <div>
            <DropzoneArea
                acceptedFiles={[
                    ".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values, application/vnd.ms-excel,application/vnd.ms-excel.sheet.macroEnabled.12, application/msexcel, application/x-msexcel, application/x-ms-excel, application/x-excel, application/x-dos_ms_excel,application/xls, application/x-xls,  application/x-msi, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,.jpeg,.png,.pdf,.txt,.json,.csv,.txt,.text,application/json,text/csv,text/plain",
                ]}
                filesLimit={5}
                onChange={handleSave}
                showAlerts={false}
                maxFileSize={100000000}
                dropzoneText={"Upload Files"}
            />
            </div>

            <div>
                <button className={classes.showFile} onClick={showFile}>Show All The Files</button>
                    {/* <div>{
                        showFiles? showFiles.map((up) => {
                            <div>{up}</div>
                        }) : ''
                    }</div> */}
                <button className={classes.download} onClick={saveFile}>Download</button>
            </div>
            

        </>
    )
}
export default FileUploadDownload;