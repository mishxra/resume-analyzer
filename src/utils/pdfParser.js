import fs from "fs"
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs"

const extractTextFromPDF = async (filePath) => {
    try {
        const dataBuffer = fs.readFileSync(filePath)
        const data = new Uint8Array(dataBuffer)

        const loadingTask = pdfjsLib.getDocument({ data })
        const pdf = await loadingTask.promise

        let fullText = ""

        for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i)
            const textContent = await page.getTextContent()
            const pageText = textContent.items.map(item => item.str).join(" ")
            fullText += pageText + "\n"
        }

        if (!fullText || fullText.trim() === "") {
            throw new Error("No text found in PDF. Make sure your resume is not a scanned image.")
        }

        return fullText

    } catch (error) {
        throw new Error("PDF parsing failed: " + error.message)
    }
}

export { extractTextFromPDF }