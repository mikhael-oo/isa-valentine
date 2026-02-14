import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".avif", ".gif"];

/**
 * API route that scans the gallery folder and returns image paths.
 * Add images to public/gallery/ and they will appear automatically.
 */
export async function GET() {
  try {
    const galleryDir = path.join(process.cwd(), "public", "gallery");

    if (!fs.existsSync(galleryDir)) {
      fs.mkdirSync(galleryDir, { recursive: true });
      return NextResponse.json([]);
    }

    const files = fs.readdirSync(galleryDir);

    const images = files
      .filter((file) => {
        const ext = path.extname(file).toLowerCase();
        return IMAGE_EXTENSIONS.includes(ext);
      })
      .sort()
      .map((file, index) => ({
        id: String(index + 1),
        image: `/gallery/${file}`,
      }));

    return NextResponse.json(images);
  } catch (err) {
    console.error("Gallery API error:", err);
    return NextResponse.json(
      { error: "Failed to load gallery" },
      { status: 500 }
    );
  }
}
