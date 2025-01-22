import logo from './green-icon.png';
import './App.css';
import PDFFile from './components/PDFFile';
import { pdf } from '@react-pdf/renderer';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx'
import {  useState } from 'react';


const transformRawSheet = (rawSheet) => {

	return Object.keys(rawSheet).reduce((acc, key) => {
		const match = key.match(/([A-Z]+)|(\d+)/g);
		let column, row;
		if(match){
     column =  match[0];
		 row = match[1];

		 if(row in acc){
			acc[row] = {...acc[row], [column] : rawSheet[key]?.v }
		 } else acc[row] = {[column] : rawSheet[key]?.v}
		}

		return acc

	}, {})
}

const UploadComponent = ({transformedData = [], payDate, coveragePeriod}) => {

	const [progress, setProgress] = useState(0)


	const generateZipFile = async () => {
    const zip = new JSZip();

		const totalFiles = Object.keys(transformedData).length;
		let isIterationActive = false
		let processedFiles = 0;

		for (const key in transformedData) {
			const sheetData = transformedData[key]
			if(sheetData.A === "START") {
				isIterationActive = true
				continue;
			}
			if(!isIterationActive) continue
			if(sheetData.A === "END") break;
			if(!sheetData.A) continue
		
			const nameColumn = sheetData?.C ? Number.isInteger(sheetData?.C) ? sheetData?.C.toString().toUpperCase() : sheetData?.C.toUpperCase() : ""
			const floorNameColumn = sheetData?.B ? Number.isInteger(sheetData?.B) ? sheetData?.B.toString().toUpperCase() : sheetData?.B.toUpperCase() : ""
			const filename = `${floorNameColumn}-${nameColumn}-${payDate}`
	
      const file = await pdf(<PDFFile coveragePeriod={coveragePeriod} payDate={payDate} sheetData={sheetData} />).toBlob()
      zip.file(`${filename}-PAYSLIP.pdf`,file)
	
			processedFiles++;
			setProgress(Math.floor((processedFiles / totalFiles) * 100));
		}

    zip.generateAsync({type : "blob"}).then(blob => {saveAs(blob, `${payDate}-PAYSLIPS.zip`)})
		setProgress(0);
  }

	
	return (
		<>
		 {
			!!progress ? <div className='w-32 h-26 bg-white border-[1px] border-gray-400 rounded-2xl overflow-hidden'>
				<div style={{
					width : `${progress}%`
				}} className={` h-full bg-[#B0E1B4]`}></div>
			</div> : <button className='gap-5 text-gray-700 rounded-2xl bg-[#B0E1B4] w-32 grid place-items-center hover:bg-[#75b27a] hover:text-white' onClick={() => generateZipFile()}>Download</button> 
		 }
		</>
	)
}

function App() {

	const ranges = [];
	const year = new Date()

	for (let month = 0; month < 12; month++) {
		const firstStart = new Date(year.getFullYear(), month, 1); 
		const firstEnd = new Date(year.getFullYear(), month, 15); 
		const lastStart = new Date(year.getFullYear(), month, 16); 
		const lastEnd = new Date(year.getFullYear(), month + 1, 0); 
		
		const firstHalf = `${firstStart.toLocaleDateString('en-US', {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		  }).replace(/\//g, "-")} - ${firstEnd.toLocaleDateString('en-US', {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		  }).replace(/\//g, "-")}`;
		const secondHalf = `${lastStart.toLocaleDateString('en-US', {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		  }).replace(/\//g, "-")} - ${lastEnd.toLocaleDateString('en-US', {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		  }).replace(/\//g, "-")}`;
		
		ranges.push(firstHalf);
		ranges.push(secondHalf);
	}
	
	const month = year.getMonth() * 2
	const date = year.getDate()
	const defaultIndexAdded = date < 16 ? 0 : 1
	const defaultCoverageValue = ranges[month + defaultIndexAdded]


	const [transformedData, setTransformedData] = useState(null)
  const [dataName, setDataName] = useState(null)
  const [coveragePeriod, setCoveragePeriod] = useState(defaultCoverageValue)
  const [payDate, setPayDate] = useState(null)
	const [error, setError] = useState(null)

	const ErrorModal = ({message}) => {
		return (
			<>
			<div className='absolute inset-0 bg-black z-10 opacity-40'>
			</div>
			<div className='absolute w-full h-full z-20 grid place-items-center'>
				<div className='w-[400px] h-64 bg-white rounded-lg flex flex-col items-center justify-center gap-2 p-5'>
					<svg xmlns="http://www.w3.org/2000/svg" className='w-12 h-12' fill="#d62e2e" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm-8-80V80a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm20,36a12,12,0,1,1-12-12A12,12,0,0,1,140,172Z"></path></svg>
					<p>Error!</p>
					<p className='text-sm text-center'>{message}</p>
					<div className='flex gap-10 pt-3'>
					<button onClick={() => {
						setError(null);
						setTransformedData(null);
						setDataName(null)
					}} className='border px-10 py-2 rounded-md shadow-md font-bold hover:scale-110 duration-200'>Close</button>
					</div>
					
				</div>
			</div>
		</>
		)
	}

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
		const allowedExtensions = ['.xls', '.xlsx', '.csv', '.ods'];
		const fileName = file.name

		if(!allowedExtensions.includes(fileName.substring(fileName.lastIndexOf('.')).toLowerCase())){
		setError("Invalid file type. Please upload a spreadsheet (.xls, .xlsx, .csv or .ods)")
		} else {
			setDataName(fileName)
			const reader = new FileReader();
	
			reader.onload = (event) => {
				const workbook = XLSX.read(event.target.result, { type: 'binary' });
				if(!workbook.Sheets["PAYROLL REGISTER"]){
					setError("The sheet \"PAYROLL REGISTER\" cannot be found.")
	
				}
			else{
				const transformed = transformRawSheet(workbook.Sheets["PAYROLL REGISTER"])
				setTransformedData(transformed)
			}
			
			};
	
			reader.readAsArrayBuffer(file);
		}
  };

  return (
<div className='w-screen h-screen overflow-auto'>
	{error && <ErrorModal message={error}/>}
	<div className='w-full h-20 border shadow-lg bg-white flex gap-5 mb-10 px-5'>
		<img alt='GNGN' src={logo} className='h-20 absolute top-6'/>
		<div className='w-52 h-full'></div>
		<div className='flex items-end text-lg text-gray-500 h-full'>Payslip Generator</div>
	</div>
	<div className='w-full h-26 flex flex-col items-center gap-5 px-10 mb-10'>
		<p className='text-gray-400'>- Batch Generate -</p>
		<div className='flex w-full justify-evenly h-full'>
			<div className='flex border-[1px] border-gray-400 gap-5 rounded-2xl items-center overflow-hidden pr-5 group'>
				<p className='p-3 bg-[#B0E1B4] group-hover:bg-[#75b27a] group-hover:text-white text-gray-700'>Coverage Period</p>
				<select className='focus:outline-none' onChange={(e) => setCoveragePeriod(e.target.value)} value={coveragePeriod ?? undefined} >
					{ranges.map((range, index) => <option key={index}>{range}</option>)}
				</select>

			</div>
			<label htmlFor='paydate' className='flex border-[1px] border-gray-400 gap-5 rounded-2xl items-center overflow-hidden pr-5 group'>
				<p className='p-3 bg-[#B0E1B4] group-hover:bg-[#75b27a] group-hover:text-white text-gray-700'>Pay Date</p>
				<input className={"text-gray-400 focus:outline-none"} id='paydate' name='paydate' type='date' value={payDate ?? ""} onChange={(e) => setPayDate(e.target.value)}/>
			</label>
			<div className='flex border-[1px] border-gray-400 gap-5 rounded-2xl overflow-hidden w-64 h-26 relative items-center group'>

				<div className='w-2/5 h-full bg-[#B0E1B4] group-hover:bg-[#75b27a] group-hover:text-white text-gray-700 px-5 flex items-center'>
					Upload
				</div>
				<div className={`bg-white w-3/5 h-full flex items-center text-xs ${dataName ? "text-gray-700" : "text-gray-400 "}`}>{dataName ?? "No File Chosen"}</div>
				<input type='file' className='w-full h-full absolute opacity-0' onChange={(e) => handleFileUpload(e)}/>
			</div>
			{transformedData && coveragePeriod && payDate && <UploadComponent transformedData={transformedData} payDate={payDate} coveragePeriod={coveragePeriod}/>}
		</div>
	</div>
	<div className='px-28 text-gray-500'>
		<p>How to generate?</p>
		<p>1. Open the raw sheet file.</p> 
		<p>2. Ensure that the sheet named "PAYROLL REGISTER" exists. **Do not rename it**, as the program requires this exact name.</p> 
		<p>3. Locate the row containing the table headers. In column A of this row, enter the word "START." This marks where the program will begin reading data.</p> 
		<p>4. Identify the last row of data you want the program to process. In column A of the row immediately below it, type the word "END."</p> 
		<p>5. Save the file and upload it here.</p> 
		<p>6. Specify the coverage period and the pay date in the provided fields.</p> 
		<p>7. Once all required inputs are valid, a download button will appear. Click it to download the payslips.</p>
	</div>
</div>

  );
}

export default App;
