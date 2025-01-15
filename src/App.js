import logo from './green-icon.png';
import './App.css';
import PDFFile from './components/PDFFile';
import { pdf } from '@react-pdf/renderer';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx'
import { useState } from 'react';



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

  const [data, setData] = useState(null)
  const [dataName, setDataName] = useState(null)
  const [coveragePeriod, setCoveragePeriod] = useState(defaultCoverageValue)
  const [payDate, setPayDate] = useState(null)

	const getRelevantProperties = (sheet) => {
		let store = {};
	
		for (const column in sheet) {
			let result = column.replace(/[-\s]/g, '_');
			
			if (/^\d/.test(result)) {
				result = '_' + result;
			}
	
			result = result.replace(/[^a-zA-Z0-9_]/g, '');
	
			store[result] = sheet[column];
		}
	
		return store;
	};

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

		setDataName(file.name)
    const reader = new FileReader();

    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: 'binary' });
		
      const employees = XLSX.utils.sheet_to_json(workbook.Sheets["Sheet1"])
      setData(employees)
    };

    reader.readAsArrayBuffer(file);
		
  };


  const generateZipFile = async () => {
    const zip = new JSZip();
          
    for (const key in data) {
      const sheetData = getRelevantProperties(data[key])
      const filename = data[key]?.Name?.toUpperCase()
      const file = await pdf(<PDFFile coveragePeriod={coveragePeriod} payDate={payDate} sheetData={sheetData} rawSheet={data[key]}/>).toBlob()
      zip.file(`${filename}-PAYSLIP.pdf`,file)

    }

    return zip.generateAsync({type : "blob"}).then(blob => {saveAs(blob, `${payDate}-PAYSLIPS.zip`)})
  }

  return (
<div className='w-screen h-screen overflow-auto'>
	<div className='w-full h-20 border shadow-lg bg-white flex gap-5 mb-10'>
		<img alt='GNGN' src={logo} className='h-20 absolute top-6'/>
		<div className='w-52 h-full'></div>
		<div className='flex items-end text-lg text-gray-500 h-full'>Payslip Generator</div>
	</div>
	<div className='w-full h-28 flex flex-col items-center gap-5 px-10 mb-10'>
		<p className='text-gray-400'>- Batch Generate -</p>
		<div className='flex w-full justify-evenly'>
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
			<div className='flex border-[1px] border-gray-400 gap-5 rounded-2xl overflow-hidden w-64 h-full relative items-center group'>

				<div className='w-2/5 h-full bg-[#B0E1B4] group-hover:bg-[#75b27a] group-hover:text-white text-gray-700 px-5 flex items-center'>
					Upload
				</div>
				<div className={`bg-white w-3/5 h-full flex items-center text-xs ${dataName ? "text-gray-700" : "text-gray-400 "}`}>{dataName ?? "No File Chosen"}</div>
				<input type='file' className='w-full h-full absolute opacity-0' onChange={(e) => handleFileUpload(e)}/>
			</div>
			{data && coveragePeriod && payDate && <button className=' border-[1px] border-gray-400 gap-5 text-gray-700 rounded-2xl bg-[#B0E1B4] w-32 grid place-items-center hover:bg-[#75b27a] hover:text-white' onClick={() => generateZipFile()}>Download</button>}
		</div>
	</div>
	<div className='px-28 text-gray-500'>
		<p>How to generate?</p>
		<p>1. Open the raw sheet file.</p>
		<p>2. Highlight the table rows from the table heads down to the last row that contains data. Copy the highlighted cells.</p>
		<p>3. Open a new spreadsheet. Do not change the name of the sheet. It should be named "Sheet1" by default. Paste the copied data to this sheet.</p>
		<p>4. Save the file. You can change the file name as you like. Make sure to remember the directory or location you saved it to.</p>
		<p>5. Go back here, set the pay date, and upload the file.</p>
		<p>6. A download button will appear if all the required inputs are valid. Click it to download the payslips.</p>
	</div>
</div>
  );
}

export default App;
