import { createRequire } from "module"
const require = createRequire(import.meta.url)
const { GoogleGenerativeAI } = require("@google/generative-ai")

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

const reviewResume = async (resumeText) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" })

        const prompt = `
        You are an expert resume reviewer with years of experience in HR and recruitment.
        
        Review the following resume and provide feedback in this exact structure:

        1. OVERALL SCORE: Give a score out of 10
        
        2. STRENGTHS: List 3-4 strong points of this resume
        
        3. WEAKNESSES: List 3-4 areas that need improvement
        
        4. SUGGESTIONS: Give 3-4 specific actionable suggestions to improve this resume
        
        5. ATS SCORE: Rate how ATS (Applicant Tracking System) friendly this resume is out of 10 and why
        
        6. FINAL VERDICT: 2-3 lines summary

        Here is the resume:
        ${resumeText}
        `

        const result = await model.generateContent(prompt)
        const response = await result.response
        return response.text()

    } catch (error) {
        console.log("Full Gemini error:", error)
        throw new Error("AI review failed: " + error.message)
    }
}

export { reviewResume }