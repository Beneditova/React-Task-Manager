import React from 'react';

const styles = {
    backgroundColor: 'lightgray',
    height: '30px',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    display: 'block',

};

export function Footer() {
    return (
         <footer className="bg-light py-5">
            <div className="container"><div className="small text-center text-muted">Copyright © 2020 - Kristina Beneditova</div></div>
        </footer>
    );
}