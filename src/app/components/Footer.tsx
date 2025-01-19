type FooterProps = {
  onOpenModal: () => void;
};

const Footer = ({ onOpenModal }: FooterProps) => (
  <div className="fixed bottom-6 right-4 w-16 p-2 bg-yellow-dark shadow-md rounded-full flex justify-center">
    <button
      className="text-white rounded-full text-xl font-bold"
      onClick={onOpenModal}
    >
      ＋
    </button>
  </div>
);

export default Footer;
