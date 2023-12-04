import React from 'react';
import './Footer.css'; // Make sure the path is correct

function Footer() {
  return (
    <footer>
        <div className="footer-content">
            <h2>Qorbat Global</h2>
            <p>Motivating and empowering immigrants in the United States by showcasing the lasting impact of immigrants across all sectors of business.</p>
            <ul className="socials">
                <li><a href="https://www.linkedin.com">LinkedIn</a></li>
                <li><a href="https://www.twitter.com">Twitter</a></li>
                <li><a href="mailto:homayoon@jabin.com">Email</a></li>
            </ul>
        </div>
    </footer>
  );
}

export default Footer;
