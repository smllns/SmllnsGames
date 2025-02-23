const Footer = () => {
  return (
    <footer className='fixed bottom-0 right-0 w-full p-4 pb-0 flex justify-end items-center text-white'>
      <p className='text-sm'>
        © {new Date().getFullYear()} All rights reserved by{' '}
        <a
          href='https://github.com/smllns'
          target='_blank'
          rel='noopener noreferrer'
          className='text-pink-500 no-underline font-normal transition-all duration-800 ease-in-out hover:font-bold'
        >
          smllns
        </a>
      </p>
    </footer>
  );
};

export default Footer;
