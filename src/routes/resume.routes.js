import { Router} from "express";
import { reviewResumeController } from "../controllers/resume.controller.js"
import { upload }  from "../middlewares/multer.middleware.js"

const router = Router()

router.post("/review", upload.single("resume"), reviewResumeController)

export default router