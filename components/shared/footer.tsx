import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const footerNavs = [
    {
      href: "/liked",
      name: "Liked Images",
    },
    {
      href: "/saved",
      name: "Saved Images",
    },
    {
      href: "/me",
      name: "My Images",
    },
  ];
  return (
    <footer className="pt-10">
      <div className="max-w-screen-2xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="justify-between sm:flex">
          <div className="space-y-6">
            <Link className="flex items-center gap-2" href="/">
              <Image src={"/logo.svg"} width={40} height={40} alt="Logo" />
              <span className="text-lg font-semibold">Magica</span>
            </Link>
            <p className="max-w-md">
              Nulla auctor metus vitae lectus iaculis, vel euismod massa
              efficitur.
            </p>
            <ul className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
              {footerNavs.map((item, idx) => (
                <li
                  key={item.name}
                  className="text-gray-800 hover:text-gray-500 duration-150"
                >
                  <Link key={idx} href={item.href}>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 py-3 border-t md:text-center">
          <p>© 2022 All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
