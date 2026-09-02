import { notFound } from "next/navigation";

import InstructorPage from "@/components/instructor/layout/InstructorPage";
import EditVideoForm from "@/components/instructor/media/EditVideoForm";
import { getVideo } from "@/lib/instructor/videos";

interface EditVideoPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditVideoPage({
  params,
}: EditVideoPageProps) {
  const { id } = await params;

  const video = await getVideo(id);

  if (!video) {
    notFound();
  }

  return (
    <InstructorPage
      title="Edit Video"
      description={`Manage the content and publishing settings for "${video.title}".`}
    >
      <EditVideoForm video={video} />
    </InstructorPage>
  );
}
