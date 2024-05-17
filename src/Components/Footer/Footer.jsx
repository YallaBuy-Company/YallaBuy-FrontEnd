
import React from 'react';
import { FaFacebook, FaInstagram, FaGithub, FaTwitter } from 'react-icons/fa';
import './Footer.css';

const sections = [
    {
        title: 'Solutions',
        items: ['Marketing', 'Analytics', 'Commerce', 'Data', 'Cloud']
    },
    {
        title: 'Support',
        items: ['Pricing', 'Documentation', 'Guides', 'API', 'Status']
    },
    {
        title: 'Company',
        items: ['About', 'Blog', 'Jobs', 'Press', 'Partners']
    },
    {
        title: 'Legal',
        items: ['Claims', 'Privacy', 'Terms', 'Policies', 'Conditions']
    },
];

const items = [
    {
        name: 'Facebook',
        icon: FaFacebook,
        link: 'http://facebook.com/'
    },
    {
        name: 'Instagram',
        icon: FaInstagram,
        link: 'http://instagram.com/'
    },
    {
        name: 'Github',
        icon: FaGithub,
        link: 'http://github.com/'
    },
    {
        name: 'Twitter',
        icon: FaTwitter,
        link: 'http://twitter.com/'
    },
];

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                {sections.map((section, index) => (
                    <div className="section" key={index}>
                        <h6>{section.title}</h6>
                        <ul>
                            {section.items.map((item, itemIndex) => (
                                <li key={itemIndex}>{item}</li>
                            ))}
                        </ul>
                    </div>
                ))}
                <div className="social-icons">
                    {items.map((item, index) => (
                        <a key={index} href={item.link} target="_blank" rel="noopener noreferrer">
                            <item.icon />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
