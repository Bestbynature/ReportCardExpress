import Link from "next/link";

const Footer = () => {
  return (
    <footer className="footer grid-rows-3 sm:grid-rows-1 p-10 bg-neutral text-neutral-content">
      <nav>
        <header className="footer-title">School</header>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Contact the school Admin</a>
        <a className="link link-hover">Careers (Vacancies)</a>
        <a className="link link-hover">Upcoming InterHouse Sports</a>
      </nav>
      <nav>
        <header className="footer-title">Legal</header>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
      <nav>
        <header className="footer-title">Social</header>
        <a className="link link-hover" href="https://twitter.com/dammybest" target="_blank">Twitter</a>
        <a className="link link-hover">Instagram</a>
        <a className="link link-hover">Facebook</a>
        <a className="link link-hover">Github</a>
      </nav>
    </footer>
  );
};

export default Footer;
