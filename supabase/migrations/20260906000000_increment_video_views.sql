create or replace function public.increment_video_views(p_video_id uuid)
returns integer
language plpgsql
security definer
set search_path = public
as $$
declare
  new_view_count integer;
begin
  update public.videos
  set
    views = views + 1,
    updated_at = now()
  where
    id = p_video_id
    and published = true
  returning views into new_view_count;

  return new_view_count;
end;
$$;

revoke all on function public.increment_video_views(uuid) from public;

grant execute on function public.increment_video_views(uuid) to anon;
grant execute on function public.increment_video_views(uuid) to authenticated;
