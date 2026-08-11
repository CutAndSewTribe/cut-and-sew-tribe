'use server';

import { revalidatePath } from 'next/cache';
import { supabaseAdmin } from '@/lib/supabase/admin';
import { updatePatternPositions } from '@/lib/patterns';

export async function createPatternAction(formData: FormData) {
const title = String(formData.get('title') ?? '').trim();
const slug = String(formData.get('slug') ?? '').trim();
const excerpt = String(formData.get('excerpt') ?? '').trim();
const content = String(formData.get('content') ?? '').trim();
const category = String(formData.get('category') ?? 'dressmaking');
const level = String(formData.get('level') ?? 'beginner');
const hero_image = String(formData.get('hero_image') ?? '').trim() || null;
const thumbnail = String(formData.get('thumbnail') ?? '').trim() || null;
const access = String(formData.get('access') ?? 'free');
const file_format = String(formData.get('file_format') ?? 'PDF');
const download_url = String(formData.get('download_url') ?? '').trim() || null;
const video_url = String(formData.get('video_url') ?? '').trim() || null;
const related_course_slug =
String(formData.get('related_course_slug') ?? '').trim() || null;
const seo_title = String(formData.get('seo_title') ?? '').trim() || null;
const seo_description =
String(formData.get('seo_description') ?? '').trim() || null;
const featured = formData.get('featured') === 'on';
const published = formData.get('published') === 'on';

const { error } = await supabaseAdmin.from('patterns').insert({
title,
slug,
excerpt,
content,
category,
level,
hero_image,
thumbnail,
access,
file_format,
download_url,
video_url,
related_course_slug,
seo_title,
seo_description,
featured,
published,
});

if (error) throw error;

revalidatePath('/patterns');
revalidatePath('/instructor/patterns');
}

export async function updatePatternAction(id: string, formData: FormData) {
const title = String(formData.get('title') ?? '').trim();
const slug = String(formData.get('slug') ?? '').trim();
const excerpt = String(formData.get('excerpt') ?? '').trim();
const content = String(formData.get('content') ?? '').trim();
const category = String(formData.get('category') ?? 'dressmaking');
const level = String(formData.get('level') ?? 'beginner');
const hero_image = String(formData.get('hero_image') ?? '').trim() || null;
const thumbnail = String(formData.get('thumbnail') ?? '').trim() || null;
const access = String(formData.get('access') ?? 'free');
const file_format = String(formData.get('file_format') ?? 'PDF');
const download_url = String(formData.get('download_url') ?? '').trim() || null;
const video_url = String(formData.get('video_url') ?? '').trim() || null;
const related_course_slug =
String(formData.get('related_course_slug') ?? '').trim() || null;
const seo_title = String(formData.get('seo_title') ?? '').trim() || null;
const seo_description =
String(formData.get('seo_description') ?? '').trim() || null;
const featured = formData.get('featured') === 'on';
const published = formData.get('published') === 'on';

const { error } = await supabaseAdmin
.from('patterns')
.update({
title,
slug,
excerpt,
content,
category,
level,
hero_image,
thumbnail,
access,
file_format,
download_url,
video_url,
related_course_slug,
seo_title,
seo_description,
featured,
published,
})
.eq('id', id);

if (error) throw error;

revalidatePath('/patterns');
revalidatePath(`/patterns/${slug}`);
revalidatePath('/instructor/patterns');
}

export async function publishPatternAction(id: string, published: boolean) {
const { error } = await supabaseAdmin
.from('patterns')
.update({ published })
.eq('id', id);

if (error) throw error;

revalidatePath('/patterns');
revalidatePath('/instructor/patterns');
}

export async function featurePatternAction(id: string, featured: boolean) {
const { error } = await supabaseAdmin
.from('patterns')
.update({ featured })
.eq('id', id);

if (error) throw error;

revalidatePath('/patterns');
revalidatePath('/instructor/patterns');
}

export async function deletePatternAction(id: string) {
const { error } = await supabaseAdmin.from('patterns').delete().eq('id', id);

if (error) throw error;

revalidatePath('/patterns');
revalidatePath('/instructor/patterns');
}

export async function reorderPatternsAction(
positions: { id: string; position: number }[]
) {
await updatePatternPositions(positions);

revalidatePath('/patterns');
revalidatePath('/instructor/patterns');
}
