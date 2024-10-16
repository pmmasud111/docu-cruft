import Image from "next/image";

const Logo = () => {
  return (
    <div className="hidden lg:flex">
      <a aria-label="Home" href="/">
        <Image
          src="/icons/logo.svg"
          alt="Protocol"
          className="h-6 w-auto"
          width={100}
          height={24}
          priority
        />
      </a>
    </div>
  );
};

export default Logo;
