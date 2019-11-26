import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useDropzone } from "react-dropzone";

async function myCustomFileGetter(event) {
	const files = [];
	const fileList = event.dataTransfer ? event.dataTransfer.files : event.target.files;

	for (var i = 0; i < fileList.length; i++) {
		const file = fileList.item(i);

		Object.defineProperty(file, "myProp", {
			value: true
		});

		files.push(file);
	}

	return files;
}

const DropZone = props => {
	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		getFilesFromEvent: event => myCustomFileGetter(event)
	});

	const files = acceptedFiles.map(f => (
		<li key={f.name}>
			{f.name} has <strong>myProps</strong>: {f.myProp === true ? "YES" : ""}
		</li>
	));

	return (
		<section className="container">
			<div {...getRootProps({ className: "dropzone" })}>
				<input {...getInputProps()} />
				<p>Drag 'n' drop some files here, or click to select files</p>
			</div>
			<aside>
				<h4>Files</h4>
				<ul>{files}</ul>
			</aside>
		</section>
	);
};

function App() {
	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<DropZone />
				<a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
