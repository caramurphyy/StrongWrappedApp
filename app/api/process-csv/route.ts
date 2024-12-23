import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { writeFile, unlink, mkdir, access } from 'fs/promises';
import path from 'path';

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
  }

  const tempDir = '/tmp';
  const tempFilePath = path.join(tempDir, file.name);
  const scriptPath = path.join(process.cwd(), 'scripts', 'process_csv.py');

  try {
    // Ensure the temp directory exists
    await mkdir(tempDir, { recursive: true });

    // Save the uploaded file temporarily
    const buffer = Buffer.from(await file.arrayBuffer());
    await writeFile(tempFilePath, new Uint8Array(buffer));

    // Check if the file was saved successfully
    try {
      await access(tempFilePath);
    } catch {
      throw new Error('File was not saved correctly.');
    }

    // Execute the Python script
    const pythonPath = 'python';
    const results = await new Promise((resolve, reject) => {
      exec(
        `${pythonPath} ${scriptPath} ${tempFilePath}`,
        (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return reject(error);
          }
          if (stderr) {
            console.error(`stderr: ${stderr}`);
          }
          try {
            resolve(JSON.parse(stdout));
          } catch (parseError) {
            console.error('Failed to parse Python script output:', parseError);
            reject(parseError);
          }
        },
      );
    });

    return NextResponse.json(results);
  } catch (error) {
    console.error('Error processing CSV:', error);
    return NextResponse.json(
      { error: 'Error processing CSV' },
      { status: 500 },
    );
  } finally {
    // Clean up the temporary file
    await unlink(tempFilePath).catch((err) =>
      console.error('Failed to delete temp file:', err),
    );
  }
}
