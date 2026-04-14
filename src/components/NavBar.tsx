import Link from 'next/link';

export default function NavBar() {
  const links = [
    { name: 'Behance', url: 'https://behance.net/idrisadeyemi' },
    { name: 'Dribble', url: 'https://dribbble.com/idrisA' },
    { name: 'Linkedin', url: 'https://linkedin.com/in/idris-adeyemi-visualdesigner' }
  ];

  return (
    <nav className="absolute top-[18px] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[32px] z-10 flex bg-white border border-[var(--color-border-action)] rounded-[8px] overflow-hidden">
      {links.map((link, i) => (
        <div key={link.name} className="flex">
          <Link
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center font-sans text-caption text-[var(--color-text-secondary)] py-[7px] px-[12px] md:px-[18px] hover:bg-[#f5f5f5] active:bg-[#ebebeb] transition-colors duration-150 ease-in-out no-underline"
            style={{ letterSpacing: '-0.42px' }}
          >
            {link.name}
          </Link>
          {i < links.length - 1 && <div className="w-[1px] bg-[var(--color-border-action)]" />}
        </div>
      ))}
    </nav>
  );
}
