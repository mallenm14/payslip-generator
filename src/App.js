import logo from './green-icon.png';
import './App.css';
import PDFFile from './components/PDFFile';
import { pdf } from '@react-pdf/renderer';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx'
import { useState } from 'react';

const fieldColumns = {
	A : {
		columnName : "Payslip Number",
		rows : []
	},
	B : {
		columnName : "Floor Name",
		rows : []
	},
	C : {
		columnName : "Name"
	},
	DN : {
		columnName : "Department",
		rows : []
	},
	DM : {
		columnName : "BASIC SALARY",
		rows : []
	},
	W : {
		columnName : "RestDay Work",
		rows : []
	},
	X : {
		columnName : "RestDay Work AMOUNT",
		rows : []
	},
	AA : {
		columnName : "Double Holiday",
		rows : []
	},
	AB : {
		columnName : "Double Holiday AMOUNT",
		rows : []
	},
	AE : {
		columnName : "RD+Double Holiday",
		rows : []
	},
	AF : {
		columnName : "RD+Double Holiday AMOUNT",
		rows : []
	},
	AI : {
		columnName : "Reg.Holiday (Work)",
		rows : []
	},
	AJ : {
		columnName : "Reg.Holiday (Work) Amount",
		rows : []
	},
	AM : {
		columnName : "RD+Reg.Holiday",
		rows : []
	},
	AN : {
		columnName : "RD+Reg.Holiday Amount",
		rows : []
	},
	AQ : {
		columnName : "Special Holiday",
		rows : []
	},
	AR : {
		columnName : "Special Holiday Amount",
		rows : []
	},
	AU : {
		columnName : "RD+Special Holiday",
		rows : []
	},
	AV : {
		columnName : "RD+Special Holiday Amount",
		rows : []
	},
	U : {
		columnName : "Regular (OT)",
		rows : []
	},
	V : {
		columnName : "Regular (OT) Amount",
		rows : []
	},
	Y : {
		columnName : "RD-OT"
	},
	Z : {
		columnName : "RD-OT Amount",
		rows : []
	},
	AC : {
		columnName : "Double Holiday (OT)",
		rows : []
	},
	AD : {
		columnName : "Double Holiday (OT) Amount",
		rows : []
	},
	AG : {
		columnName : "Double Holiday RestDay (OT)",
		rows : []
	},	
	AH : {
		columnName : "Double Holiday RestDay (OT) Amount",
		rows : []
	},
	AK : {
		columnName : "Reg.Holiday (OT)",
		rows : []
	}, 	
	AL : {
		columnName : "Reg.Holiday (OT) Amount",
		rows : []
	},
	AO :{
		columnName :  "RD+Reg.Holiday (OT)",
		rows : []
	},	
	AP : {
		columnName : "RD+Reg.Holiday (OT) Amount",
		rows : []
	},
	AS : {
		columnName : "Special Holiday (OT)",
		rows : []
	},	
	AT : {
		columnName : "Special Holiday (OT) Amount",
		rows : []
	},
	AW : {
		columnName : "RD/Spec'l Holiday(OT)	",
		rows : []
	},	
	AX : {
		columnName : "RD/Spec'l Holiday(OT)	Amount",
		rows : []
	},
	AY : {
		columnName : "Night Diff",
		rows : []
	}, 	
	AZ : {
		columnName : "Night Diff Amount",
		rows : []
	},
	BE : {
		columnName : "ND Reg Holiday",
		rows : []
	}, 	
	BF : {
		columnName : "ND Reg Holiday Amount",
		rows : []
	},
	BK : {
		columnName : "ND Reg Holiday OT",
		rows : []
	},	
	BL : {
		columnName : "ND Reg Holiday OT Amount",
		rows : []
	},
	BG : {
		columnName : "ND Special Holiday",
		rows : []
	}, 	
	BH : {
		columnName : "ND Special Holiday Amount",
		rows : []
	},
	BM : {
		columnName : "ND Special Holiday OT	",
		rows : []
	}, 	
	BN : {
		columnName : "ND Special Holiday OT	Amount",
		rows : []
	},
	noAssign : {
		columnName : "ND Regular+Special Holiday",
		rows : []
	},
	BO : {
		columnName : "ND Rest Day",
		rows : []
	},	
	BP : {
		columnName : "ND Rest Day Amount",
		rows : []
	},
	BW : {
		columnName : "ND Rest Day (OT)",
		rows : []
	},	
	BX : {
		columnName : "ND Rest Day (OT) Amount",
		rows : []
	},
	BS : {
		columnName : "ND Regular+Rest Day",
		rows : []
	},	
	BT : {
		columnName : "ND Regular+Rest Day Amount",
		rows : []
	},
	CA : {
		columnName : "ND Regular+Rest Day (OT)",
		rows : []
	},	
	CB : {
		columnName : "ND Regular+Rest Day (OT) Amount",
		rows : []
	},
	BA : {
		columnName : "ND Overtime",
		rows : []
	},	
	BB : {
		columnName : "ND Overtime Amount",
		rows : []
	},
	BU : {
		columnName : "ND Special/Rest Day",
		rows : []
	},	
	BV : {
		columnName : "ND Special/Rest Day Amount",
		rows : []
	},
	BC : {
		columnName : "ND Double Holiday",
		rows : []
	},	
	BD : {
		columnName : "ND Double Holiday Amount",
		rows : []
	},
	CI : {
		columnName : "KPI/Qualifying Incentive/6-work day",
		rows : []
	},
	CK : {
		columnName : "Perfect Attendance",
		rows : []
	},
	CJ : {
		columnName : "Special Allowance	",
		rows : []
	},
	CL : {
		columnName : "Referral Fees",
		rows : []
	},
	CM : {
		columnName : "Training Fees	",
		rows : []
	},
	CH : {
		columnName : "Deminimis	",
		rows : []
	},
	CN : {
		columnName : "Food",
		rows : []
	},
	CO : {
		columnName : "Transpo.",
		rows : []
	},
	CP : {
		columnName : "Make-Up	",
		rows : []
	}, 
	HE : {
		columnName : "Salary Adjustment	",
		rows : []
	},
	HC : {
		columnName : "Salary Adjustment (NDOT 2022)",
		rows : []
	},
	HD	 : {
		columnName : "Salary Adjustment (NDOT 2023)",
		rows : []
	},
	CG :{
		columnName :  "Unused VL 2023",
		rows : []
	},
	DI : {
		columnName : "13th Month Pay",
		rows : []
	},
	DK :{
		columnName : "Tax Refund/Payables",
		rows : []
	},
	CU : {
		columnName : "SSS Contribution",
		rows : []
	},
	CX : {
		columnName : "SSS Loan",
		rows : []
	},
	DB : {
		columnName : "Pag-ibig Contribution",
		rows : []
	},
	DE : {
		columnName : "Pag-ibig Loan",
		rows : []
	},
	CY : {
		columnName : "Philhealth Contribution",
		rows : []
	},
	DF : {
		columnName : "Witholding Tax",
		rows : []
	},
	I : {
		columnName : "Absent",
		rows : []
	},	
	J : {
		columnName : "Absent Amount",
		rows : []
	},
	N : {
		columnName : "Tardiness",
		rows : []
	},	
	O : {
		columnName : "Tardiness Amount",
		rows : []
	},
	CT : {
		columnName : "Missed Class",
		rows : []
	}, 
	CR :{
		columnName :  "Cash Advance",
		rows : []
	},
	CS : {
		columnName : "CBS",
		rows : []
	}
}

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
	const [transformedData, setTransformedData] = useState(null)
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
			const transformed = transformRawSheet(workbook.Sheets["Sheet1"])
      const employees = XLSX.utils.sheet_to_json(workbook.Sheets["Sheet1"])
			setTransformedData(transformed)
      setData(employees)
    };

    reader.readAsArrayBuffer(file);
		
  };

  const generateZipFile = async () => {
    const zip = new JSZip();
          
    // for (const key in data) {
    //   const sheetData = getRelevantProperties(data[key])
    //   const filename = data[key]?.Name?.toUpperCase()
    //   const file = await pdf(<PDFFile coveragePeriod={coveragePeriod} payDate={payDate} sheetData={sheetData} transformedData={transformedData}/>).toBlob()
    //   zip.file(`${filename}-PAYSLIP.pdf`,file)
    // }

		for (const key in transformedData) {
		
			const sheetData = transformedData[key]
			if(!sheetData.A) continue
		
			const filename = sheetData?.C?.toUpperCase();
	
      const file = await pdf(<PDFFile coveragePeriod={coveragePeriod} payDate={payDate} sheetData={sheetData} />).toBlob()
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
