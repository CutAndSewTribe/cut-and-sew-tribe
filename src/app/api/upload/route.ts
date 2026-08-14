import { NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { supabaseAdmin } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  const formData = await request.formData();

  const file = formData.get('file');
  const bucket = String(formData.get('bucket') ?? 'pattern-images');
  const folder = String(formData.get('folder') ?? '').trim();
  const slug = String(formData.get('slug') ?? '').trim();
  const kind = String(formData.get('kind') ?? '').trim();

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: 'No file uploaded' },
      { status: 400 }
    );
  }

  const extension = file.name.split('.').pop() ?? '';

  let filename: string;

  if (kind) {
    filename = extension ? `${kind}.${extension}` : kind;
  } else {
    filename = extension
      ? `${randomUUID()}.${extension}`
      : randomUUID();
  }

  const parts = [folder, slug, filename].filter(Boolean);
  const path = parts.join('/');

  const arrayBuffer = await file.arrayBuffer();

  const { error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(path, arrayBuffer, {
      contentType: file.type,
      upsert: true,
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