interface Props {
  videoUrl: string;
}

export default function VideoPlayer({
  videoUrl,
}: Props) {
  return (
    <div className="aspect-video w-full overflow-hidden rounded-t-3xl bg-black">
      <video
        controls
        className="h-full w-full"
        preload="metadata"
      >
        <source
          src={videoUrl}
          type="video/mp4"
        />

        Your browser does not support the video tag.
      </video>
    </div>
  );
}