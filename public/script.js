const resumeInput = document.getElementById("resumeInput")
const submitBtn = document.getElementById("submitBtn")
const fileName = document.getElementById("fileName")
const loader = document.getElementById("loader")
const result = document.getElementById("result")
const feedbackText = document.getElementById("feedbackText")
const errorDiv = document.getElementById("error")

// Show file name when selected
resumeInput.addEventListener("change", () => {
    if (resumeInput.files.length > 0) {
        fileName.textContent = resumeInput.files[0].name
        submitBtn.disabled = false
    } else {
        fileName.textContent = ""
        submitBtn.disabled = true
    }
})

// Submit resume for review
submitBtn.addEventListener("click", async () => {
    const file = resumeInput.files[0]
    if (!file) return

    // Reset UI
    result.classList.remove("active")
    errorDiv.classList.remove("active")
    loader.classList.add("active")
    submitBtn.disabled = true

    // Prepare form data
    const formData = new FormData()
    formData.append("resume", file)

    try {
        const response = await fetch("http://localhost:8000/api/review", {
            method: "POST",
            body: formData
        })

        const data = await response.json()

        if (data.success) {
            feedbackText.textContent = data.feedback
            result.classList.add("active")
        } else {
            errorDiv.textContent = data.message
            errorDiv.classList.add("active")
        }

    } catch (error) {
        errorDiv.textContent = "Something went wrong. Make sure your server is running."
        errorDiv.classList.add("active")
    } finally {
        loader.classList.remove("active")
        submitBtn.disabled = false
    }
})