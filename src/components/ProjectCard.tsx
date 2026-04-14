interface Project {
  title: string;
  description: string;
  gridImage: string;
  buttonLabel: string;
  href?: string;
  comingSoon: boolean;
}

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-white border border-[var(--color-border-action)] rounded-[10px] overflow-hidden flex flex-col">
      <div className="h-[300px] p-[16px] bg-[#f4f4f2] border-b border-[#ececec]">
        <div className="relative w-full h-full rounded-[8px] overflow-hidden">
          {project.gridImage?.endsWith('.mp4') || project.gridImage?.endsWith('.webm') ? (
            <video 
              src={project.gridImage}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img 
              src={project.gridImage} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
      
      <div className="p-[18px_20px_20px] flex flex-col flex-1 bg-white">
        <h3 className="font-sans font-semibold text-[15px] text-[#111111] mb-[6px] mt-0">
          {project.title}
        </h3>
        
        <p className="font-sans font-normal text-[13px] text-[#666666] leading-[1.5] mb-[16px] flex-1 mt-0">
          {project.description}
        </p>
        
        {project.comingSoon ? (
          <button className="self-start border border-[#e0e0e0] rounded-[6px] py-[7px] px-[14px] text-[13px] text-[#999999] bg-white cursor-not-allowed">
            Coming Soon
          </button>
        ) : (
          <a 
            href={project.href || '#'}
            target={project.href?.includes('http') ? '_blank' : '_self'}
            rel={project.href?.includes('http') ? 'noopener noreferrer' : undefined}
            className="self-start inline-flex items-center gap-[6px] border border-[#d0d0d0] rounded-[6px] py-[7px] px-[14px] text-[13px] text-[#333333] bg-white hover:bg-[#f5f5f5] transition-colors duration-150 no-underline"
          >
            {project.buttonLabel}
            {project.buttonLabel.toLowerCase().includes('download source code') && (
              <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            )}
          </a>
        )}
      </div>
    </div>
  );
}
