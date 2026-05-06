import { extractTextFromPDF }from "../utils/pdfParser.js"
import { reviewResume } from "../utils/aiReviewer.js"
import fs from "fs"

const reviewResumeController = async (req, res)=>{
    try{
        if(!req.file){
            return res.status(400).json({
                successs: false,
                message:"Please Upload a PDF file"
            })
        }

        const filePath= req.file.path

        const resumeText = await extractTextFromPDF(filePath)

        const aiFeedback = await reviewResume(resumeText)

        fs.unlinkSync(filePath)

        return res.status(200).json({
            success: true,
            feedback: aiFeedback
        })

    } catch(error) {
        
    if(req.file && fs.existsSync(req.file.path)){
        fs.unlinkSync(req.file.path)
    }
    return res.status(500).json({
        success:false,
        message: error.message
    })
  }
}

export { reviewResumeController }