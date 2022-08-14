import React from 'react';
import { useState } from 'react';


const UploadFile = () => {
	const [fileName, setFileName] = useState({
		file : '',
		msg : ''
	})
	
	
	
	const onFileChange = (event) => {
		setFileName({
			file: event.target.files[0]
		});
	}
	
	const uploadFileData = (event) => {
		event.preventDefault();
		setFileName({msg: ''});

		let data = new FormData();
		data.append('file', fileName);

		fetch('http://localhost:3000/upload', {
			method: 'POST',
			body: data
		}).then(response => {
			setFileName({msg: "File successfully uploaded"});
		}).catch(err => {
			setFileName({error: err});
		});

	}
	
	
		return (
			<div id="container">
				<h1>File Upload Example using React</h1>
				<h3>Upload a File</h3>
				<h4>{this.state.msg}</h4>
				<input onChange={onFileChange} type="file"></input>
				<button disabled={!fileName} onClick={uploadFileData}>Upload</button>
			</div>
		)
	

}

export default UploadFile;