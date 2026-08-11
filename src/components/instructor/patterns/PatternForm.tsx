'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import type { Pattern } from '@/types/pattern';
import { uploadImage, uploadPatternPdf } from '@/lib/upload';

interface PatternFormProps {
action: (formData: FormData) => void;
initialValues?: Partial<Pattern>;
submitLabel?: string;
}

function slugify(value: string) {
return value
.toLowerCase()
.trim()
.replace(/[^a-z0-9]+/g, '-')
.replace(/(^-|-$)+/g, '');
}

const defaultContent = `# New Pattern

Write your drafting article here.

## Tools Required

* Measuring tape
* Pattern paper

## Step 1

Explain the drafting process...

## Continue Your Fashion Journey

Ready to build professional fashion skills?

[Browse All Courses](/courses)
`;

export default function PatternForm({
action,
initialValues = {},
submitLabel = 'Save Pattern',
}: PatternFormProps) {
const router = useRouter();

const [title, setTitle] = useState(initialValues.title ?? '');
const [slug, setSlug] = useState(
initialValues.slug ?? slugify(initialValues.title ?? '')
);

const [category, setCategory] = useState<Pattern['category']>(
initialValues.category ?? 'dressmaking'
);

const [heroImage, setHeroImage] = useState(initialValues.hero_image ?? '');
const [thumbnail, setThumbnail] = useState(initialValues.thumbnail ?? '');
const [downloadUrl, setDownloadUrl] = useState(
initialValues.download_url ?? ''
);
const [content, setContent] = useState(
initialValues.content ?? defaultContent
);

const [uploadingHero, setUploadingHero] = useState(false);
const [uploadingThumb, setUploadingThumb] = useState(false);
const [uploadingPdf, setUploadingPdf] = useState(false);
const [uploadingInline, setUploadingInline] = useState(false);

const editorRef = useRef<HTMLTextAreaElement>(null);

async function handleHeroUpload(file: File) {
setUploadingHero(true);
try {
const patternSlug = slug || slugify(title);
const url = await uploadImage(file, category, patternSlug, 'hero');
setHeroImage(url);
} finally {
setUploadingHero(false);
}
}

async function handleThumbnailUpload(file: File) {
setUploadingThumb(true);
try {
const patternSlug = slug || slugify(title);
const url = await uploadImage(file, category, patternSlug, 'thumbnail');
setThumbnail(url);
} finally {
setUploadingThumb(false);
}
}

async function handlePdfUpload(file: File) {
setUploadingPdf(true);
try {
const patternSlug = slug || slugify(title);
const url = await uploadPatternPdf(file, category, patternSlug);
setDownloadUrl(url);
} finally {
setUploadingPdf(false);
}
}

async function handleInlineImage(file: File) {
setUploadingInline(true);
try {
const patternSlug = slug || slugify(title);
const url = await uploadImage(file, category, patternSlug, 'inline');


const textarea = editorRef.current;
if (!textarea) {
  setContent((current) => `${current}\n\n![](${url})\n`);
  return;
}

const start = textarea.selectionStart;
const end = textarea.selectionEnd;

const markdown = `\n\n![](${url})\n\n`;
const next =
  content.slice(0, start) +
  markdown +
  content.slice(end);

setContent(next);

requestAnimationFrame(() => {
  textarea.focus();
  const cursor = start + markdown.length;
  textarea.setSelectionRange(cursor, cursor);
});


} finally {
setUploadingInline(false);
}
}

async function handleInlinePdf(file: File) {
setUploadingPdf(true);
try {
const patternSlug = slug || slugify(title);
const url = await uploadPatternPdf(file, category, patternSlug);


const textarea = editorRef.current;
if (!textarea) {
  setContent((current) => `${current}\n\n[Download PDF](${url})\n`);
  return;
}

const start = textarea.selectionStart;
const end = textarea.selectionEnd;

const markdown = `\n\n[Download PDF](${url})\n\n`;
const next =
  content.slice(0, start) +
  markdown +
  content.slice(end);

setContent(next);

requestAnimationFrame(() => {
  textarea.focus();
  const cursor = start + markdown.length;
  textarea.setSelectionRange(cursor, cursor);
});


} finally {
setUploadingPdf(false);
}
}


return ( <form action={action} className='space-y-8'> <div className='grid gap-6 md:grid-cols-2'> <div> <label className='mb-2 block text-sm font-medium'>Title</label>
<input
name='title'
value={title}
onChange={(e) => {
const nextTitle = e.target.value;
setTitle(nextTitle);


          if (!initialValues.slug) {
            setSlug(slugify(nextTitle));
          }
        }}
        className='w-full rounded-xl border border-neutral-300 px-4 py-3'
        required
      />
    </div>

    <div>
      <label className='mb-2 block text-sm font-medium'>Slug</label>
      <input
        name='slug'
        value={slug}
        onChange={(e) => setSlug(slugify(e.target.value))}
        className='w-full rounded-xl border border-neutral-300 px-4 py-3'
        required
      />
    </div>
  </div>

  <div>
    <label className='mb-2 block text-sm font-medium'>Excerpt</label>
    <textarea
      name='excerpt'
      defaultValue={initialValues.excerpt ?? ''}
      rows={3}
      className='w-full rounded-xl border border-neutral-300 px-4 py-3'
    />
  </div>

  <div>
    <div className='mb-2 flex items-center justify-between'>
      <label className='text-sm font-medium'>Content (Markdown)</label>

      <div className='flex gap-2'>
        <label className='cursor-pointer rounded-lg border border-neutral-300 px-3 py-2 text-sm font-medium hover:bg-neutral-50'>
          {uploadingInline ? 'Uploading...' : 'Insert Image'}
          <input
            type='file'
            accept='image/*'
            className='hidden'
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleInlineImage(file);
            }}
          />
        </label>

        <label className='cursor-pointer rounded-lg border border-neutral-300 px-3 py-2 text-sm font-medium hover:bg-neutral-50'>
          {uploadingPdf ? 'Uploading...' : 'Insert PDF Link'}
          <input
            type='file'
            accept='application/pdf'
            className='hidden'
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleInlinePdf(file);
            }}
          />
        </label>
      </div>
    </div>

    <textarea
      ref={editorRef}
      name='content'
      value={content}
      onChange={(e) => setContent(e.target.value)}
      rows={18}
      className='w-full rounded-xl border border-neutral-300 px-4 py-3 font-mono text-sm'
      placeholder='# Basic Bodice Block


Write your full pattern drafting tutorial in Markdown...'
/>


    <p className='mt-2 text-xs text-neutral-500'>
      Images and downloadable PDF links can be inserted directly into the
      article body.
    </p>
  </div>

  <div className='grid gap-6 md:grid-cols-3'>
    <div>
      <label className='mb-2 block text-sm font-medium'>Category</label>
      <select
        name='category'
        value={category}
        onChange={(e) =>
          setCategory(e.target.value as Pattern['category'])
        }
        className='w-full rounded-xl border border-neutral-300 px-4 py-3'
      >
        <option value='dressmaking'>Dressmaking</option>
        <option value='bridal'>Bridal</option>
        <option value='menswear'>Menswear</option>
        <option value='childrenswear'>Childrenswear</option>
      </select>
    </div>

    <div>
      <label className='mb-2 block text-sm font-medium'>Level</label>
      <select
        name='level'
        defaultValue={initialValues.level ?? 'beginner'}
        className='w-full rounded-xl border border-neutral-300 px-4 py-3'
      >
        <option value='beginner'>Beginner</option>
        <option value='intermediate'>Intermediate</option>
        <option value='advanced'>Advanced</option>
      </select>
    </div>

    <div>
      <label className='mb-2 block text-sm font-medium'>Access</label>
      <select
        name='access'
        defaultValue={initialValues.access ?? 'free'}
        className='w-full rounded-xl border border-neutral-300 px-4 py-3'
      >
        <option value='free'>Free</option>
        <option value='premium'>Premium</option>
      </select>
    </div>
  </div>

  <div className='grid gap-6 md:grid-cols-2'>
    <div>
      <label className='mb-2 block text-sm font-medium'>Hero Image</label>

      <input type='hidden' name='hero_image' value={heroImage} />

      <label className='flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-neutral-300 p-6 text-sm font-medium hover:bg-neutral-50'>
        {uploadingHero ? 'Uploading hero image...' : 'Upload Hero Image'}
        <input
          type='file'
          accept='image/*'
          className='hidden'
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleHeroUpload(file);
          }}
        />
      </label>

      {heroImage && (
        <div className='mt-4 overflow-hidden rounded-xl border border-neutral-200'>
          <Image
            src={heroImage}
            alt='Hero preview'
            width={1200}
            height={675}
            className='h-48 w-full object-cover'
          />
        </div>
      )}
    </div>

    <div>
      <label className='mb-2 block text-sm font-medium'>Thumbnail</label>

      <input type='hidden' name='thumbnail' value={thumbnail} />

      <label className='flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-neutral-300 p-6 text-sm font-medium hover:bg-neutral-50'>
        {uploadingThumb ? 'Uploading thumbnail...' : 'Upload Thumbnail'}
        <input
          type='file'
          accept='image/*'
          className='hidden'
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleThumbnailUpload(file);
          }}
        />
      </label>

      {thumbnail && (
        <div className='mt-4 overflow-hidden rounded-xl border border-neutral-200'>
          <Image
            src={thumbnail}
            alt='Thumbnail preview'
            width={600}
            height={600}
            className='h-48 w-full object-cover'
          />
        </div>
      )}
    </div>
  </div>

  <div className='grid gap-6 md:grid-cols-2'>
    <div>
      <label className='mb-2 block text-sm font-medium'>Pattern PDF</label>

      <input type='hidden' name='download_url' value={downloadUrl} />

      <label className='flex cursor-pointer items-center justify-center rounded-xl border border-dashed border-neutral-300 p-6 text-sm font-medium hover:bg-neutral-50'>
        {uploadingPdf ? 'Uploading PDF...' : 'Upload Pattern PDF'}
        <input
          type='file'
          accept='application/pdf'
          className='hidden'
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handlePdfUpload(file);
          }}
        />
      </label>

      {downloadUrl && (
        <div className='mt-3 rounded-xl border border-neutral-200 bg-neutral-50 p-3 text-sm'>
          <p className='font-medium text-neutral-900'>Uploaded PDF</p>
          <a
            href={downloadUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='mt-1 inline-flex text-[#661093] hover:underline'
          >
            View uploaded pattern file
          </a>
        </div>
      )}
    </div>

    <div>
      <label className='mb-2 block text-sm font-medium'>Video URL</label>
      <input
        name='video_url'
        defaultValue={initialValues.video_url ?? ''}
        className='w-full rounded-xl border border-neutral-300 px-4 py-3'
        placeholder='https://...'
      />
    </div>
  </div>

  <div>
    <label className='mb-2 block text-sm font-medium'>
      Related Course Slug
    </label>
    <input
      name='related_course_slug'
      defaultValue={initialValues.related_course_slug ?? ''}
      className='w-full rounded-xl border border-neutral-300 px-4 py-3'
      placeholder='professional-dressmaking'
    />
  </div>

  <div className='grid gap-6 md:grid-cols-2'>
    <div>
      <label className='mb-2 block text-sm font-medium'>SEO Title</label>
      <input
        name='seo_title'
        defaultValue={initialValues.seo_title ?? ''}
        className='w-full rounded-xl border border-neutral-300 px-4 py-3'
      />
    </div>

    <div>
      <label className='mb-2 block text-sm font-medium'>
        SEO Description
      </label>
      <textarea
        name='seo_description'
        defaultValue={initialValues.seo_description ?? ''}
        rows={3}
        className='w-full rounded-xl border border-neutral-300 px-4 py-3'
      />
    </div>
  </div>

  <div className='flex flex-wrap gap-6'>
    <label className='flex items-center gap-2 text-sm font-medium'>
      <input
        type='checkbox'
        name='featured'
        defaultChecked={Boolean(initialValues.featured)}
      />
      Featured
    </label>

    <label className='flex items-center gap-2 text-sm font-medium'>
      <input
        type='checkbox'
        name='published'
        defaultChecked={Boolean(initialValues.published)}
      />
      Published
    </label>
  </div>

  <div className='flex items-center justify-end gap-3'>
    <button
      type='button'
      onClick={() => router.back()}
      className='rounded-xl border border-neutral-300 px-5 py-3 font-medium'
    >
      Cancel
    </button>

    <button
      type='submit'
      className='rounded-xl bg-[#661093] px-5 py-3 font-semibold text-white hover:bg-[#7A16AF]'
    >
      {submitLabel}
    </button>
  </div>
</form>


);
}
