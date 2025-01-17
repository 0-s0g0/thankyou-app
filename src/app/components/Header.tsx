import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

const Header = () => (
  <div className="fixed top-0 w-[420px] h-16 p-4 bg-yellow-dark shadow-md text-white font-bold flex justify-between items-center">
    <div className="ml-3">ThanksLink</div>
    <Link href={"/mypage"}>
      <FontAwesomeIcon
        className="text-white w-6 h-6 rounded-full"
        icon={faUserCircle}
      />
    </Link>
  </div>
);

export default Header;
