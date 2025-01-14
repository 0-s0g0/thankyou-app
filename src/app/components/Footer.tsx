type FooterProps = {
    onOpenModal: () => void;
  };
  
  const Footer = ({ onOpenModal }: FooterProps) => (
    <div className="fixed bottom-2 w-[380px] p-4 bg-white shadow-md rounded-full flex justify-center">
      <button
        className="bg-yellow-dark text-white rounded-full p-1 shadow-lg size-[32px]"
        onClick={onOpenModal}
      >
        ＋
      </button>
    </div>
  );
  
  export default Footer;
  