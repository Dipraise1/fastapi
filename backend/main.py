from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
from typing import List, Optional
import shutil
import os
import logging
from pathlib import Path
import asyncio
import uuid

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Video Upload API",
    description="An API for handling video uploads and processing",
    version="1.0.0"
)

# CORS middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Constants
UPLOAD_DIR = Path("uploaded_videos")
PROCESSED_DIR = Path("processed_videos")
ALLOWED_EXTENSIONS = {".mp4", ".avi", ".mov", ".mkv"}
MAX_FILE_SIZE = 100 * 1024 * 1024  # 100 MB

# Create directories
UPLOAD_DIR.mkdir(exist_ok=True)
PROCESSED_DIR.mkdir(exist_ok=True)

class VideoResponse(BaseModel):
    urls: List[str]
    processed_files: int
    failed_files: List[str] = []

async def process_video(file_path: Path) -> None:
    """
    Simulate video processing with a delay.
    In a real application, this would be where you'd implement actual video processing.
    """
    await asyncio.sleep(1)  # Simulate processing time
    logger.info(f"Processed video: {file_path}")

@app.post("/upload", response_model=VideoResponse)
async def upload_videos(files: List[UploadFile] = File(...)):
    video_urls = []
    failed_files = []
    
    try:
        tasks = []
        for file in files:
            # Generate a unique filename
            original_extension = Path(file.filename).suffix
            if original_extension.lower() not in ALLOWED_EXTENSIONS:
                failed_files.append(f"{file.filename} (invalid extension)")
                continue
            
            unique_filename = f"{uuid.uuid4()}{original_extension}"
            upload_path = UPLOAD_DIR / unique_filename
            processed_path = PROCESSED_DIR / unique_filename
            
            try:
                # Check file size
                content = await file.read()
                if len(content) > MAX_FILE_SIZE:
                    failed_files.append(f"{file.filename} (exceeds size limit)")
                    continue
                
                # Write file
                with open(upload_path, "wb") as buffer:
                    buffer.write(content)
                
                # Process video asynchronously
                tasks.append(process_video(upload_path))
                
                # Copy to processed directory
                shutil.copy(str(upload_path), str(processed_path))
                
                video_url = f"http://localhost:8000/processed/{unique_filename}"
                video_urls.append(video_url)
                
            except Exception as e:
                logger.error(f"Error processing {file.filename}: {str(e)}")
                failed_files.append(f"{file.filename} (processing error)")
                if upload_path.exists():
                    upload_path.unlink()
        
        # Wait for all processing tasks to complete
        await asyncio.gather(*tasks)
        
    except Exception as e:
        logger.error(f"Upload error: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

    return VideoResponse(
        urls=video_urls,
        processed_files=len(video_urls),
        failed_files=failed_files
    )

# Mount static files
app.mount("/processed", StaticFiles(directory=str(PROCESSED_DIR)), name="processed")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)