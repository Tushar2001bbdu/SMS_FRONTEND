import React from "react";

interface Props {
  section: string;
  StudyMaterial: {
    title: string;
    description: string;
    subject: string;
    fileUrl: string;
    videoLink: string;
  };
}

const FacultyStudyMaterialCard: React.FC<Props> = ({ StudyMaterial }) => {
  const getThumbnailUrl = (videoLink: string) => {
    const videoIdMatch = videoLink.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^\s&]+)/
    );
    return videoIdMatch
      ? `https://img.youtube.com/vi/${videoIdMatch[1]}/hqdefault.jpg`
      : "";
  };

  const thumbnailUrl = getThumbnailUrl(StudyMaterial.videoLink);

  return (
    <div className="rounded overflow-hidden shadow-lg flex flex-col w-full sm:w-full md:w-full lg:w-full">
      <section
        className="relative p-2 h-48 bg-cover bg-center"
        style={{
          backgroundImage: `url(${thumbnailUrl})`,
        }}
      >
        <a href={StudyMaterial.videoLink} target="_blank" rel="noopener noreferrer">
          <div className="hover:bg-black hover:opacity-50 transition duration-300 absolute bottom-0 top-0 right-0 left-0"></div>
        </a>
      </section>

      <div className="px-6 py-4 mb-auto">
        <a
          href={StudyMaterial.fileUrl}
          target="_blank"
          className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2"
          rel="noopener noreferrer"
        >
          {StudyMaterial.title}
        </a>
        <p className="text-gray-500 text-sm">{StudyMaterial.subject}</p>
      </div>

      <div className="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
        <span className="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
          <a
            href={StudyMaterial.videoLink}
            target="_blank"
            className="ml-1"
            rel="noopener noreferrer"
          >
            Video Link
          </a>
        </span>
      </div>
    </div>
  );
};

export default FacultyStudyMaterialCard;
