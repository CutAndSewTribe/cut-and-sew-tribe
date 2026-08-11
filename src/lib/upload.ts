export async function uploadFile(
  file: File,
  bucket: 'pattern-images' | 'pattern-files',
  folder?: string,
  slug?: string,
  kind?: 'hero' | 'thumbnail' | 'inline' | 'pdf'
): Promise<string> {
  const formData = new FormData();

  formData.append('file', file);
  formData.append('bucket', bucket);

  if (folder) formData.append('folder', folder);
  if (slug) formData.append('slug', slug);
  if (kind) formData.append('kind', kind);

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  const data = await response.json();
  return data.url as string;
}

export async function uploadImage(
  file: File,
  category: string,
  slug: string,
  variant: 'hero' | 'thumbnail' | 'inline'
): Promise<string> {
  return uploadFile(file, 'pattern-images', category, slug, variant);
}

export async function uploadPatternPdf(
  file: File,
  category: string,
  slug: string
): Promise<string> {
  return uploadFile(file, 'pattern-files', category, slug, 'pdf');
}