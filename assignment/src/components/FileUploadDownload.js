import React, { useEffect } from "react";
import { GoogleLogout } from "react-google-login";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DropzoneArea } from "material-ui-dropzone";
import { saveAs } from "file-saver";
import { upload } from "@testing-library/user-event/dist/upload";

const FileUploadDownload = (props) => {
    const {profiles, setShowUploadOption} = props
    const [files, setFiles] = useState([])
    const [profile, setProfile] = useState([])
    const [upload, setUpload] = useState({
        file : '',
        msg : ''
    })
    const [showFiles, setShowFiles] = useState({})
    const navigate = useNavigate()
    const clientId = '731777965673-krnhalvcl8tjaes5heksi2rto8nkafin.apps.googleusercontent.com';
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
		setUpload({file:e, msg: ''});

		let data = new FormData();
		data.append('file', upload);

		fetch('http://localhost:3000', {
            mode: 'cors',
			method: 'POST',
			body: data
		}).then(response => {
			setUpload({file: e,msg: "File successfully uploaded"});
		}).catch(err => {
			setUpload({error: err});
		});

	}

    const showFile = () => {
        fetch('http://localhost:3000', {
			method: 'GET'
		}).then(response => {
			setShowFiles(response.data)
		}).catch(err => {
			setShowFiles({err})
		});
    }

    const handleSave = (e) => {
        console.log(e)
        setFiles(e)
        uploadFileData(e)
    }

    useEffect(() => {
        files.map((f) => console.log(f.path))
    },[files.length])
    

    return (
        <>  <div>Hai </div>         
            <div>                                
                <GoogleLogout clientId={clientId} buttonText="Log out" onLogoutSuccess={logOut} />                
            </div>
            <div>
            <button type='button'><input type="file" className="hidden"
                multiple={false}
                accept=".json,.csv,.txt,.text,application/json,text/csv,text/plain,.pdf,.jpeg,.jpg,.png"
                onChange={evt => this.openFile(evt)}
                download
            />
            
            </button>
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
                <button onClick={showFile}>Show Files</button>
                {/* <div>{
                    showFiles? showFiles.map((up) => {
                        <div>{up}</div>
                    }) : ''
                }</div> */}
            </div>

            <div>
                <button onClick={saveFile}>download</button>
            </div>
            

        </>
    )
}
export default FileUploadDownload;

{/* <   h1>Hai {name}</h1>
            <br />
            <br />
            <button type='button'><input type="file" className="hidden"
                multiple={false}
                accept=".json,.csv,.txt,.text,application/json,text/csv,text/plain,.pdf,.jpeg,.jpg,.png"
                onChange={evt => this.openFile(evt)}
            />
            
            </button> */}