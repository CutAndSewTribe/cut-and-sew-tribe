import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  const formData = await request.formData();

  const file = formData.get('file');
  const bucket = String(formData.get('bucket') ?? 'pattern-images');
  const folder = String(formData.get('folder') ?? '').trim();

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: 'No file uploaded' },
      { status: 400 }
    );
  }

  // Keep the original extension
  const extension = file.name.split('.').pop() ?? '';

  // Safe filename
  const filename = extension
    ? `${randomUUID()}.${extension}`
    : randomUUID();

  // Optional folder organization
  const path = folder ? `${folder}/${filename}` : filename;

  const arrayBuffer = await file.arrayBuffer();

  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(path, arrayBuffer, {
      contentType: file.type,
      upsert: true, // Replace existing file automatically
    });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  const {
    data: { publicUrl },
  } = supabaseAdmin.storage
    .from(bucket)
    .getPublicUrl(path);

  return NextResponse.json({
    url: publicUrl,
    path,
  });
}