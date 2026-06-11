/**
 * Reproductor responsivo 16:9. Soporta MP4 directo (Supabase Storage)
 * o URLs de YouTube/Vimeo embebidas vía iframe.
 */
const isEmbed = (url) => /youtube\.com|youtu\.be|vimeo\.com/.test(url ?? '');

export default function VideoPlayer({ src, title, onEnded }) {
  return (
    <div className="overflow-hidden rounded-ur-md bg-ur-navy-dark shadow-ur-md">
      <div className="relative aspect-video">
        {isEmbed(src) ? (
          <iframe
            src={src}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        ) : (
          <video
            key={src}
            src={src}
            controls
            preload="metadata"
            controlsList="nodownload"
            onEnded={onEnded}
            className="absolute inset-0 h-full w-full bg-black"
          >
            <p className="p-4 text-white">
              Tu navegador no soporta la reproducción de video. Descarga la lección desde
              los recursos.
            </p>
          </video>
        )}
      </div>
    </div>
  );
}
