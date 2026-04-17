import fs from 'fs';
import pdfParse from 'pdf-parse/lib/pdf-parse.js';

const extractTextFromPDF = async(filePath)=>{
    try{
      const dataBuffer =fs.readFileSync(filepath)
      const data= await pdfParse(dataBuffer)
      if(!data.next || data.text.trim()===""){
        throw new Error ("No text found in PDF, make sure resume uploaded is not a scanned image")
      }
      return data.text

    } catch(error){
        throw new Error("PDF parsing failed: "+ error.message)
    }
}

export { extractTextFromPDF }